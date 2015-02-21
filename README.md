<a href="url"><img src="http://viltgroup.github.io/minium/images/banner_minium.png" align="left" height="100" ></a>
<a href="url"><img src="http://seium.org/sei_15_webpage/img/mascote.png" height="100" ></a>

Minium wants to have a social live!

So you’ll have to teach him how to manage his social network, for instance, Facebook or Twitter.

Examples of what you can program Minium to do:

 * Reply to posts (you can use any online chat bot for the task), even in other languages than english (you can use google translator)
 * Add contents to its wall (news, memes, videos, you decide)
 * Accept friend requests
 * Congratulate friends for a new achievement or birthday
 * Pass Turing Test
 * In the best case scenario you can drive a "Social Media Manager" out of work !

**Submission:** Submit your code, some screenshots or video of Minium in action is also a plus to the email minium@vilt-group.com with SEIUM as the subject. Don't forget to adde your details: name, student number and contact.

**Reward:** The reward for the most creative solution is a **Google Chromecast !**

## Getting Started

*For more information take a look in http://minium.vilt.io.*

 * Download your platform [minium-tools-bundle-1.0.0-SNAPSHOT](http://sourceforge.net/projects/minium/files/minium-tools-1.0.0.SNAPSHOT/)
 * Uncompress it into some directory (lets refer to it as `MINIUM_HOME`)

```bash
git clone https://github.com/viltgroup/minium-social-bot
```

 * If you want to open **Minium Developer** and start editing scripts, run the following commands:

```bash
cd minium-social-bot
$MINIUM_HOME/bin/minium-developer
```
 * Or if you just want to run it, use **Minium Automator** instead

```bash
cd minium-social-bot

# Change to your values
TWITTER_EMAIL=youremail@yourdomain.com
TWITTER_PASSWORD=yourpassword
$MINIUM_HOME/bin/minium-automator -d . "credentials = { email : '$TWITTER_EMAIL', password : '$TWITTER_PASSWORD' }"
```

This will open your Twitter account and use a Chat Bot to generate a message that Minium will use to send a tweet for you, so watch out :)
