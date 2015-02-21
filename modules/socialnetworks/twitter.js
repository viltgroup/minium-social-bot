function Twitter(browser) {
  var $          = browser.$;
  browser.get("https://twitter.com/");
}

Twitter.prototype.login = function (opts) {
  var emailFld     = $("#signin-email:focus");
  var passwordFld  = $("#signin-password");
  var keepLoginFld = $(".remember input");
  var loginBtn     = $(".js-submit");
  
  emailFld.fill(opts.email);
  passwordFld.fill(opts.password);
  loginBtn.click();
};

Twitter.prototype.tweet = function (msg) {
  var msgboxContainer = $("#tweet-box-mini-home-profile div");
  var msgbox          = $("#tweet-box-mini-home-profile");
  var tweetBtn        = $(".js-tweet-btn");
  
  msgboxContainer.click();
  msgbox.fill(msg);
  tweetBtn.click();
};

module.exports = Twitter;