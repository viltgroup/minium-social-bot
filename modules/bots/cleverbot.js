var timeUnits = require("minium/timeunits");

// CleverBot (http://www.cleverbot.com/)
function CleverBot(browser) {
  var $          = browser.$;
  
  this.browser   = browser;
  this.input     = $("#stimulus");
  this.submit    = $("#sayit");
  this.lastEntry = $("#typArea").has("#snipTextIcon").find("> span");
}

CleverBot.prototype.ensurePage = function() {
  if (this.browser.getCurrentUrl() != "http://www.cleverbot.com/") {
    this.browser.get("http://www.cleverbot.com/");
  }
}

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