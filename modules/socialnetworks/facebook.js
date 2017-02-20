function Facebook(base) {
  this.base = base;
  base.browser().get("https://www.facebook.com");
}

Facebook.prototype.login = function (opts) {
  var base = this.base;
  
  var emailFld     = base.find("#email");
  var passwordFld  = base.find("#pass");
  var keepLoginFld = base.find("#persist_box");
  var loginBtn     = base.find("#loginbutton");
  
  emailFld.fill(opts.email);
  passwordFld.fill(opts.password);
  loginBtn.click();
};

if (typeof module !== 'undefined') module.exports = Facebook;