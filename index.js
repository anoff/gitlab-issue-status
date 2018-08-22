const canvas = require('./lib/canvas')
const gitlab = require('./lib/gitlab')
const server = require('./lib/server')
const app = require('./app')({gitlab, canvas, server})

module.exports = {
  canvas,
  gitlab,
  server,
  app
}
