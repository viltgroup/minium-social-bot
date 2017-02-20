<a href="url"><img src="https://viltgroup.github.io/assets/images/minium_logo.png" align="left" height="100" ></a>
<a href="url"><img src="https://www.sinfo.org/static/logo.png" height="100" ></a>

Minium wants to have a social live!

So you’ll have to teach him how to manage his social network, for instance, Facebook or Twitter.

Examples of what you can program Minium to do:

 * Reply to posts (you can use any online chat bot for the task), even in other languages than english (you can use google translator)
 * Add contents to its wall (news, memes, videos, you decide)
 * Accept friend requests
 * Congratulate friends for a new achievement or birthday
 * Pass Turing Test
 * In the best case scenario you can drive a "Social Media Manager" out of work !

**Submission:** Submit your code, some screenshots or video of Minium in action is also a plus to the email minium@vilt-group.com with `SINFO2017` as the subject. Don't forget to add your details: name, student number and contact.

**Reward:** The reward for the most creative solution is a **Google Chromecast !**

## Getting Started

*For more information take a look in http://minium.vilt.io.*

First you need to run Minium Developer:

 * Download your platform [minium-developer](https://github.com/viltgroup/minium-developer/releases)
 * Uncompress it into some directory (lets refer to it as `MINIUM_HOME`)
 * Start minium-developer by running `$MINIUM_HOME/minium-developer.exe` (windows) or `$MINIUM_HOME/minium-developer` (linux / mac)

Then clone `minium-social-bot` to use as base for your bot:

```bash
git clone https://github.com/viltgroup/minium-social-bot
```

Now open that project in Minium Developer:

* Go to **Project > Open Project**
* Set your `minium-social-bot` directory in **Project Directory** (e.g, `/home/me/my-projects/minium-social-bot`)

You can now play with it:

* First, evaluate the following code to declare a `credentials` variable (change `YOUR_TWITTER_EMAIL` and `YOUR_PASS` to reflect your twitter account details):

```javascript
credentials = { email: 'YOUR_TWITTER_EMAIL', password: 'YOUR_PASS' };
```

* **Optional**: delete that line, it's better not to have your password visible
* Copy and paste the following code, and evaluate it to create a tweet:

```javascript
// extends $
require("utils/browser-utils");

var Twitter = require("socialnetworks/twitter");

var base = $(":root");
var twitter = new Twitter(base, credentials);

twitter.tweet("Minium can! http://minium.vilt.io");
```

