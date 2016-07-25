'use strict'

const express = require('express')
const morgan = require('morgan')
const shell = require('shelljs')

shell.config.silent = true
const key = require('../package.json').config.key

const app = express()

app.use(morgan('dev'))

app.set('port', (process.env.PORT || 5000))

const root_url = (
  process.env.NODE_ENV === 'production' ?
  process.env.ROOT_URL.replace(/\/$/, '') :
  'http://localhost:' + app.get('port')
)

app.use(express.static(__dirname + '/../public'))

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

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'))
})
