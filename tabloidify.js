// extends $
require("utils/browser-utils");

var Twitter = require("socialnetworks/twitter");

var base = $(":root");
var twitter = new Twitter(base, credentials);

// gets an headline from a news site
var feedsBase = base.openWindow("http://www.dn.pt", "", "width=1024,height=850");
var headlines = feedsBase.find("h2, h3").filter("[itemprop=headline]");
var headline = headlines.eq(Math.floor(Math.random() * headlines.waitForExistence().size()));

var headlineText = String(headline.waitForExistence().text().trim());

var tabloidified = headlineText
  .replace(/^(.*) (por|para|de|do|da|no|na|em|à|ao|a|antes|depois|que|quando|onde|como|só|ainda|se|este|esta|estes|aquele|aquela|aquilo|neste|nesta|naquilo|naquele|naquela) (.*)$/ig, "$1... $2 $3!");

var url = "http://www.dn.pt" + headline.parent("a").attr("href");

twitter.tweet("#tabloidify " + tabloidified + " " + url);