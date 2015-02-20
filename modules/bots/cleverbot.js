// CleverBot (http://www.cleverbot.com/)
function CleverBot(browser) {
  var $          = browser.$;
  this.input     = $("#stimulus");
  this.submit    = $("#sayit");
  this.lastEntry = $("#typArea").has("#snipTextIcon").find("> span");
  
  browser.get("http://www.cleverbot.com/");
}

CleverBot.prototype.lastMessage = function() {
  this.lastEntry.waitForExistence();
  return this.lastEntry.text();
};

CleverBot.prototype.start = function() {
  this.submit.click();
  return this.lastMessage();
};

CleverBot.prototype.reply = function(message) {
  this.input.fill(msg);
  this.submit.click();
  return this.lastMessage();
};

module.exports = CleverBot;