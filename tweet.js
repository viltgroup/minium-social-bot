// extends $
require("utils/browser-utils");

var Twitter = require("socialnetworks/twitter");

var base = $(":root");
var twitter = new Twitter(base, credentials);

twitter.tweet("Minium can! http://minium.vilt.io");