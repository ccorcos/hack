'use strict'

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const shell = require('shelljs')
const npm = require('../package.json')

shell.config.silent = true

const key = npm.config.key

const app = express()

app.use(morgan('dev'))

app.set('port', (process.env.PORT || 5000))

const root_url = (
  process.env.NODE_ENV === 'production' ?
  npm.config.root_url :
  'http://localhost:' + app.get('port')
)

app.use(express.static(__dirname + '/../public'))

app.use(bodyParser.text({type: '*/*'}))

app.get('/hack', function(req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.send(
    shell
      .cat(__dirname + '/../scripts/hack')
      .sed(new RegExp(key, 'g'), root_url)
      .toString()
  )
})

app.get('/env/:env', function(req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.send(
    shell
      .cat(__dirname + '/../scripts/env/' + req.params.env)
      .sed(new RegExp(key, 'g'), root_url)
      .toString()
  )
})

app.post('/dump', function(req, res) {
  const time = (new Date()).toISOString()
  console.log("BEGIN DUMP -- " + time)
  console.log(req.body)
  console.log("END DUMP -- " + time)
  res.end()
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'))
})
