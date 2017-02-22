var timeUnits = require("minium/timeunits");

// CleverBot (http://www.cleverbot.com/)
function CleverBot(base) {
  this.base = base;
  
  this.input = base.find(".stimulus");
  this.submit = base.find(".sayitbutton");
  this.lastEntry = base.find("#conversationcontainer p").has("#snipTextIcon").find("> .bot");
}

CleverBot.URL = "http://www.cleverbot.com/";

CleverBot.prototype.ensurePage = function() {
  var browser = this.base.browser();
  if (browser.getCurrentUrl() != CleverBot.URL) {
    browser.get("http://www.cleverbot.com/");
  }
};

CleverBot.prototype.lastMessage = function() {
  this.ensurePage();
  this.lastEntry.waitForExistence();
  return this.lastEntry.text();
};

CleverBot.prototype.start = function() {
  this.ensurePage();
  this.submit.click();
  return this.lastMessage();
};

CleverBot.prototype.reply = function(message) {
  this.ensurePage();
  this.input.fill(message);
  this.submit.click();
  return this.lastMessage();
};

if (typeof module !== 'undefined') module.exports = CleverBot;