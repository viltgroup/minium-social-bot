var timeUnits = require("minium/timeunits");

function Twitter (browser, bot) {
  var $ = browser.$;

  this.browser = browser;
  
  this.events = [
    {
      name         : "Direct message",
      triggerElems : $(".global-dm-nav.with-count"),
      handler      : this.replyToDirectMessage
    }
    // ,
    // {
    //   name         : "Reply to tweet",
    //   triggerElems : $(".notifications").has(".count"),
    //   handler      : this.replyToTweet
    // },
  ];
}

Twitter.prototype.login = function (opts) {
  var $ = this.browser.$;
  
  this.browser.get("https://twitter.com/");
  
  var emailFld     = $("#signin-email");
  var passwordFld  = $("#signin-password");
  var keepLoginFld = $(".remember input");
  var loginBtn     = $(".js-submit");
  var usernameLbl  = $(".u-linkComplex-target");
  
  if (!this.username && usernameLbl.checkForExistence()) {
    var twitterIcon = $(".Icon--birdBlue");
    // we need to logout and go to the landing page
    this.logout();
    twitterIcon.click();
  }
  
  if (!this.username || !usernameLbl.withText(this.username).checkForExistence()) {
    emailFld.fill(opts.email);
    passwordFld.fill(opts.password);
    loginBtn.click();
    
    this.username = usernameLbl.waitForExistence().text();
  }
};

Twitter.prototype.tweet = function (msg) {
  var $ = this.browser.$;
  
  var msgboxContainer = $("#tweet-box-mini-home-profile div");
  var msgbox          = $("#tweet-box-mini-home-profile");
  var tweetBtn        = $(".js-tweet-btn");
  
  msgboxContainer.click();
  msgbox.fill(msg);
  tweetBtn.click();
};

Twitter.prototype.replyToDirectMessage = function () {
  var dmNav           = $(".global-dm-nav.with-count");
  var unreadEntry     = $(".is-unread");
  var lastReceivedMsg = $(".received .dm-with-text").last();
  var replyFld        = $("#tweet-box-dm-conversation");
  var sendBtn         = $(".tweet-btn").below(replyFld);
  var backLink        = $(".js-dm-header-title").withText("Direct Messages");
  var dmWndCloseBtn   = $("#dm_dialog-dialog .js-close");
  
  dmNav.click();
  
  while (unreadEntry.checkForExistence()) {
    unreadEntry.click();
    
    // we get the last message and use the bot to reply to it
    var lastReceivedMsgText = lastReceivedMsg.waitForExistence().text().trim();
    var replyMsgText        = bot.reply(lastReceivedMsgText);
    
    replyFld.fill(replyMsgText);
    sendBtn.click();
    backLink.click();
  }

  dmWndCloseBtn.click();
};

Twitter.prototype.replyToTweet = function () {
  var notificationsNav  = $(".notifications").has(".count");
  var notifications     = $(".js-original-tweet");
  
  notificationsNav.click();
  
  for (var i = 0; notifications.eq(i).checkForExistence() && i < 5; i++) {
    var notification      = notifications.eq(i);
    
    notification.click();
    
    var lastEntry         = notification.has(".js-has-navigable-stream.open").add(notification.find(".descendant")).last();
    var unrepliedEntry    = lastEntry.not(lastEntryMsg.has($(".js-action-profile-name b").withText(this.username)));
    var unrepliedEntryMsg = unrepliedEntry.find(".tweet-text");
    var replyBtn          = unrepliedEntry.find(".Icon--reply");
    var replyFld          = $("#tweet-box-template").below(replyBtn).unless("#tweet-box-global").add("#tweet-box-global");
    var tweetBtn          = $(".js-tweet-btn").below(replyFld);
    var homeNav           = $("#global-nav-home");
    
    if (unrepliedEntry.checkForExistence("fast")) {
      // we get the last message and use the bot to reply to it
      var lastReceivedMsgText = unrepliedEntryMsg.waitForExistence().text().trim();
      var replyMsgText        = bot.reply(lastReceivedMsgText);
      
      replyBtn.click();
      replyFld.type(replyMsgText);
      tweetBtn.click();
    }
  }
  
  homeNav.click();
};

Twitter.prototype.logout = function () {
  var $ = this.browser.$;
  
  var profileBtn = $("#user-dropdown-toggle");
  var logoutItem = $("#signout-button .dropdown-link");

  profileBtn.click();
  logoutItem.click();
  
  this.username = undefined;
};

Twitter.prototype.handleEvents = function () {
  var allTrigerElems;
  this.events.forEach(function (e) {
    allTrigerElems = allTrigerElems ? allTrigerElems.add(e.triggerElems) : e.triggerElems;
  });
  
  if (allTrigerElems.checkForExistence()) {
    // some event occur, let's find out which one
    this.events.forEach(function (e) {
      if (e.triggerElems.checkForExistence("immediate")) {
        console.log("Event being handled:", e.name);
        e.handler();
      }
    });
  } else {
    console.log("No event found");
  }
};

if (typeof module !== 'undefined') module.exports = Twitter;