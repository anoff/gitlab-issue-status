const http = require('http')

/**
 * @param  {Function} cb Promise callback resolving to png image buffer
 */
function startServer (port, cb) {
  return new Promise((resolve, reject) => {
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
    server.listen(port, err => {
      if (err) reject(err)
      else resolve(server)
    })
  })
}

module.exports = {
  startServer
}
