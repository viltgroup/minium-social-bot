// ChatBot (http://nlp-addiction.com/chatbot/eliza/)
function ChatBot(browser) {
  var $          = browser.$;

  this.browser   = browser;
  this.input     = $(":text").withName("e_input");
  this.submit    = $(":submit");
  this.lastEntry = $("textarea").withName("e_display");
}

ChatBot.prototype.ensurePage = function() {
  if (this.browser.getCurrentUrl() != "http://nlp-addiction.com/chatbot/eliza/") {
    this.browser.get("http://nlp-addiction.com/chatbot/eliza/");
  }
};

ChatBot.prototype.lastMessage = function() {
  this.ensurePage();
  var extractLastMessage = function () {
    var lines = $(this).val().split('\n').filter(function (i) { return i }); 
    var lastLine = lines && lines.length > 0 ? lines[lines.length - 1] : null;
    return lastLine ? /Eliza: (.*)/.exec(lastLine)[1] : null;
  };
  return this.lastEntry.apply(extractLastMessage);
};

ChatBot.prototype.start = function() {
  this.ensurePage();
  this.submit.click();
  return this.lastMessage();
};

ChatBot.prototype.reply = function(msg) {
  this.ensurePage();
  this.input.fill(msg);
  this.submit.click();
  this.input.waitTime(2, timeUnits.SECONDS);
  return this.lastMessage();
};

if (typeof module !== 'undefined') module.exports = ChatBot;