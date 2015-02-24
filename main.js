var timeUnits = require("minium/timeunits"),
    keys      = require("minium/keys"),
    // our modules
    ChatBot   = require("bots/chatbot"),
    CleverBot = require("bots/cleverbot"),
    Facebook  = require("socialnetworks/facebook"),
    Twitter   = require("socialnetworks/twitter");

browser.$(":root").configure()
  .waitingPreset("fast")
    .timeout(2, timeUnits.SECONDS);

var botbrowser = minium.newBrowser({
  desiredCapabilities : { browserName : "chrome" }
});

botbrowser.$(":root").configure()
  .defaultTimeout(60, timeUnits.SECONDS);

// we'll use a bot to help us talk
var bot = new CleverBot(botbrowser);
  
var twitter = new Twitter(browser, bot);
twitter.login(credentials);

while (true) {
  twitter.handleEvents();
}

botbrowser.quit();

