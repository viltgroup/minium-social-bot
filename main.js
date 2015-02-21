var timeUnits = require("minium/timeunits"),
    keys      = require("minium/keys"),
    // our modules
    ChatBot   = require("bots/chatbot"),
    CleverBot = require("bots/cleverbot"),
    Facebook  = require("socialnetworks/facebook"),
    Twitter   = require("socialnetworks/twitter");

credentials = { email : 'minium_vilt', password : 'liberty09' }

var botbrowser = minium.newBrowser({
  desiredCapabilities : { browserName : "chrome" }
});

botbrowser.$(":root").configure()
  .defaultTimeout(20, timeUnits.SECONDS);

var twitter = new Twitter(browser);
twitter.login(credentials);

// we'll use a bot to our first post message
var bot = new CleverBot(botbrowser);
var msg = bot.start();

// and we tweet that message (pray for it to be harmless)
twitter.tweet(msg);

$(":root").waitTime(5, timeUnits.SECONDS);
browser.quit();