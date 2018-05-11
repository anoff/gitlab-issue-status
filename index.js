const axios = require('axios')
require('dotenv').config()
const fs = require('fs')
const {tagToUrl} = require('./lib/gitlab')

const issue = 'rcs/generic/hwp-docs#5'
const baseUrl = process.env.GITLAB_API_URL
const token = process.env.GITLAB_ACCESS_KEY
const issueUrl = tagToUrl(issue, baseUrl)

axios.get(issueUrl, {
  headers: {
    'PRIVATE-TOKEN': token
  }
})
  .then(res => {
    const issue = {
      id: res.data.iid,
      title: res.data.title,
      state: res.data.state,
      labels: res.data.labels
    }
    console.log(issue)
  })

const http = require('http')
const port = 8080

const requestHandler = (request, response) => {
  const blob = fs.readFile('./check.png', (err, data) => {
    if (err) console.error(err)
    else {
      response.setHeader('Content-Type', 'image/png')
      response.setHeader('Content-Length', data.length)
      response.end(data)
    }
  })
  console.log(blob)
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
