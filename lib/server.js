const http = require('http')
const port = process.env.PORT || 8080

/**
 * @param  {Function} cb Promise callback resolving to png image buffer
 */
function startServer (cb) {
  const server = http.createServer((req, res) => {
    const issueUrl = req.url.split('=')[1]
    if (!issueUrl || issueUrl.indexOf('://') > -1) {
      res.statusCode = 400
      res.end('only issue path, no fully URLs')
    } else {
      cb(issueUrl)
        .then(buffer => {
          res.setHeader('Content-Type', 'image/png')
          res.setHeader('Content-Length', buffer.length)
          res.setHeader('Cache-Control', 'max-age=30')
          res.end(buffer)
        })
    }
  })
  server.listen(port, err => console.log(err || `Server started on port ${port}`))
  return server
}

module.exports = {
  startServer
}
