const axios = require('axios')
require('dotenv').config()
const fs = require('fs')
const {tagToUrl, UrlToTag} = require('./lib/gitlab')

const issue = 'rcs/generic/hwp-docs#5'
const baseUrl = process.env.GITLAB_API_URL
const token = process.env.GITLAB_ACCESS_KEY
const issueUrl = tagToUrl(issue, baseUrl)

function getIssueStatus (issueUrl) {
  return axios.get(issueUrl, {
    headers: {
      'PRIVATE-TOKEN': token
    }
  })
    .then(res => ({
      id: res.data.iid,
      title: res.data.title,
      state: res.data.state,
      labels: res.data.labels
    }))
}

const { createCanvas, loadImage } = require('canvas')
const path = require('path')

function getIcons () {
  const images = {}
  return Promise.all([
    './check.png',
    './cross.png',
    './tool.png'
  ].map(f => {
    loadImage(f)
      .then(data => {
        const key = path.basename(f).replace(path.extname(f), '')
        images[key] = data
      })
  }))
    .then(() => images)
}

let icons
function init () {
  return getIcons()
    .then(res => {
      icons = res
    })
    .then(() => startServer())
}
init()

function createImage (status, issueTag) {
  const canvas = createCanvas(200, 16)
  const ctx = canvas.getContext('2d')

  // Write "Awesome!"
  ctx.font = '12px Impact'
  ctx.fillText(issueTag, 20, 14)
  let icon
  switch (status.toLowerCase()) {
    case 'opened':
      icon = 'cross'
      break
    case 'closed':
      icon = 'check'
      break
    default:
      icon = 'check'
  }
  ctx.drawImage(icons[icon], 0, 0, 16, 16)
  return canvas.toBuffer()
}

const http = require('http')
const url = require('url')
const port = 8080

function startServer () {
  const server = http.createServer((req, res) => {
    const issueUrl = req.url.split('=')[1]
    if (!issueUrl || issueUrl.indexOf('://') > -1) {
      res.statusCode = 400
      res.end('only issue path, no fully URLs')
    } else {
      const issueTag = UrlToTag(issueUrl)
      console.log(issueTag)
      const fullUrl = tagToUrl(issueTag, baseUrl)
      console.log(fullUrl)
      getIssueStatus(fullUrl)
        .then(issue => {
          const buffer = createImage(issue.state, issueTag)
          res.setHeader('Content-Type', 'image/png')
          res.setHeader('Content-Length', buffer.length)
          res.end(buffer)
        })
    }
  })
  server.listen(port, err => console.log(err || `Server started on port ${port}`))
  return server
}
