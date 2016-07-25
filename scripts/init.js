'use strict'

const shell = require('shelljs')
const npm = require('../package.json')

shell.config.silent = true

shell.cd(__dirname + '/..')

npm.config.root_url = shell.exec('heroku info -s | grep web-url | cut -d= -f2').toString().replace(/\n$/, '').replace(/\/$/, '')

shell.exec('echo ' + JSON.stringify(JSON.stringify(npm, undefined, 2)) + ' > package.json')
