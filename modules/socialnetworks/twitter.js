var timeUnits = require("minium/timeunits");
var later = require("utils/later");

function Twitter (base, credentials) {
  this.base = base;
  
  this.events = [
    {
      name         : "Check Health",
      cron         : later.parse.text('every 5 seconds'),
      handler      : this.checkHealth.bind(this)
    }
  ];
  // timers for scheduling ops
  this.timers = [];

  this.login(credentials);
}

Twitter.prototype.login = function (credentials) {
  var base = this.base;
  
  base.browser().get("https://twitter.com/?lang=en");
  
  var emailFld     = base.find("#signin-email");
  var passwordFld  = base.find("#signin-password");
  var keepLoginFld = base.find(".remember input");
  var loginBtn     = base.find(".js-submit:visible").stabilize();
  var usernameLbl  = base.find(".u-linkComplex-target");
  
  if (!usernameLbl.checkForExistence()) {
    emailFld.fill(credentials.email);
    passwordFld.fill(credentials.password);
    loginBtn.click();
  }
  
  this.username = usernameLbl.waitForExistence().text();
};

Twitter.prototype.addEvent = function (event) {
  this.events.push(event);
};

Twitter.prototype.tweet = function (msg) {
  var base = this.base;

  var msgboxContainer = base.find("#tweet-box-home-timeline div");
  var msgbox          = base.find("#tweet-box-home-timeline");
  var tweetBtn        = base.find(".js-tweet-btn:visible");
  
  msgboxContainer.click();
  msgbox.fill(msg);
  tweetBtn.click();
};

Twitter.prototype.replyToDirectMessage = function (msgGenerator) {
  var base = this.base;
  
  var dmNav           = base.find(".global-dm-nav.with-count");
  var unreadEntry     = base.find(".is-unread");
  var directMsgDialog = base.find("#dm_dialog");
  var lastReceivedMsg = directMsgDialog.find(".tweet-text").last();
  var replyFld        = directMsgDialog.find(".tweet-box");
  var sendBtn         = directMsgDialog.find(".tweet-btn");
  var backLink        = directMsgDialog.find(".DMActivity-back .Icon:visible");
  var dmWndCloseBtn   = directMsgDialog.find(".DMActivity-close ");
  
  dmNav.click();
  
  while (unreadEntry.checkForExistence()) {
    unreadEntry.click();
    
    // we get the last message and use the bot to reply to it
    var lastReceivedMsgText = lastReceivedMsg.waitForExistence().text().trim();
    var replyMsgText        = msgGenerator(lastReceivedMsgText);
    
    replyFld.fill(replyMsgText);
    sendBtn.click();
    backLink.click();
  }

  dmWndCloseBtn.click();
};

Twitter.prototype.replyToTweet = function (msgGenerator) {
  var base = this.base;
  
  var notificationsNav  = base.find(".notifications").has(".count");
  var notifications     = base.find(".js-original-tweet");
  var homeNav           = base.find("#global-nav-home");
  
  notificationsNav.click();
  
  for (var i = 0; notifications.eq(i).checkForExistence() && i < 5; i++) {
    var notification      = notifications.eq(i);
    
    notification.click();
    
    var lastEntry         = notification.has(".js-has-navigable-stream.open").add(notification.find(".descendant")).last();
    var unrepliedEntry    = lastEntry.not(lastEntry.has($(".js-action-profile-name b").withText(this.username)));
    var unrepliedEntryMsg = unrepliedEntry.find(".tweet-text");
    var replyBtn          = unrepliedEntry.find(".Icon--reply");
    var replyFld          = base.find("#tweet-box-template").below(replyBtn).unless("#tweet-box-global").add("#tweet-box-global");
    var tweetBtn          = base.find(".js-tweet-btn").below(replyFld);
    
    if (unrepliedEntry.checkForExistence("fast")) {
      // we get the last message and use the bot to reply to it
      var lastReceivedMsgText = unrepliedEntryMsg.waitForExistence().text().trim();
      var replyMsgText        = msgGenerator(lastReceivedMsgText);
      
      replyBtn.click();
      replyFld.type(replyMsgText);
      tweetBtn.click();
    }
  }
  
  homeNav.click();
};

Twitter.prototype.logout = function () {
  var base = this.base;

  var profileBtn = base.find("#user-dropdown-toggle");
  var logoutItem = base.find("#signout-button .dropdown-link");

  profileBtn.click();
  logoutItem.click();
  
  this.username = undefined;
};

Twitter.prototype.handleEvents = function () {
  var elemsCheckingSched = later.parse.text('every 10 seconds');
  var trigerElemsEvents = this.events
    .filter(function (e) { return e.triggerElems });
  var allTrigerElems = trigerElemsEvents
    .reduce(function(acc, e) {
      return acc.add(e.triggerElems);
    }, $());
  
  var checkElemsAndTrigger = function () {
    if (allTrigerElems.checkForExistence("immediate")) {
      // some event occur, let's find out which one
      for (var i = 0; i < trigerElemsEvents.length; i++) {
        var e = trigerElemsEvents[i];
        if (e.triggerElems.checkForExistence("immediate")) {
          console.log("Event being handled:", e.name);
          e.handler();
        }
      }
    } else {
      console.log("No event found");
    }
  };
  
  var timers = this.timers;
  
  timers.push(later.setInterval(checkElemsAndTrigger, elemsCheckingSched));
  this.events
    .filter(function (e) { return !e.triggerElems && e.cron })
    .forEach(function (e) {
      console.log("Registering cron event:", e.name);
      var handleEvent = function() {
        console.log("Event being handled:", e.name);
        e.handler();
      };
      timers.push(later.setInterval(handleEvent, e.cron));
    });
};

Twitter.prototype.checkHealth = function () {
  var healthy = false;
  try {
    healthy = this.base.checkForExistence("immediate");
  } catch (e) { }
  
  if (!healthy) {
    console.log("Twitter is not ok");
    this.stop();
  }
};

Twitter.prototype.stop = function () {
  console.log("Stopping twitter event handlers");
  this.timers.forEach(function (timer) {
    timer.clear();
  });
  this.timers = [];
};

if (typeof module !== 'undefined') module.exports = Twitter;