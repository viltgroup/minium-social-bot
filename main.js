var timeUnits = require("minium/timeunits"),
    // our modules
    CleverBot = require("bots/cleverbot"),
    Twitter   = require("socialnetworks/twitter"),
    later     = require("utils/later");

// extends $
require("utils/browser-utils");

browser.configure()
  .waitingPreset("fast")
  .timeout(2, timeUnits.SECONDS);

var base = $(":root");
var botBase = base.openWindow(CleverBot.URL, "", "width=930,height=1030");
var twitterBase = base;

// we'll use a bot to help us talk
var bot = new CleverBot(botBase);
var twitter = new Twitter(twitterBase, credentials);

function replyGenerator(msg) {
  return bot.reply(msg);
}

twitter.addEvent({
  name         : "Reply to Direct Message",
  triggerElems : $(".global-dm-nav.with-count"),
  handler      : function () {
    twitter.replyToDirectMessage(replyGenerator);
    base.waitTime(5, timeUnits.SECONDS);
  }
});

twitter.handleEvents();

// run this line to stop twitter event handling cycle:
// twitter.stop();