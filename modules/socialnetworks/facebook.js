function Facebook(browser) {
  var $          = browser.$;
  browser.get("https://www.facebook.com");
}

Facebook.prototype.login = function (opts) {
  var emailFld     = $("#email");
  var passwordFld  = $("#pass");
  var keepLoginFld = $("#persist_box");
  var loginBtn     = $("#loginbutton");
  
  emailFld.fill(opts.email);
  passwordFld.fill(opts.password);
  loginBtn.click();
};

if (typeof module !== 'undefined') module.exports = Facebook;