// ChatBot (http://nlp-addiction.com/chatbot/eliza/)
function ChatBot(browser) {
  var $          = browser.$;
  this.input     = $(":text").withName("e_input");
  this.submit    = $(":submit");
  this.lastEntry = $("textarea").withName("e_display");
  
  browser.get("http://nlp-addiction.com/chatbot/eliza/");
}

ChatBot.prototype.lastMessage = function() {
  var extractLastMessage = function () {
    var lines = $(this).val().split('\n').filter(function (i) { return i }); 
    var lastLine = lines && lines.length > 0 ? lines[lines.length - 1] : null;
    return lastLine ? /Eliza: (.*)/.exec(lastLine)[1] : null;
  };
  return this.lastEntry.apply(extractLastMessage);
};

ChatBot.prototype.start = function() {
  this.submit.click();
  return this.lastMessage();
};

ChatBot.prototype.reply = function(message) {
  this.input.fill(message);
  this.submit.click();
  return this.lastMessage();
};

module.exports = ChatBot;