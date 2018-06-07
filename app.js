require('dotenv').config()
const {tagToUrl, UrlToTag, getIssue} = require('./lib/gitlab')
const {startServer} = require('./lib/server')
const {loadIcons, createImage} = require('./lib/canvas')

const iconArray = [
  {key: 'closed', path: './assets/check.png'},
  {key: 'opened', path: './assets/cross.png'},
  {key: 'tool', path: './assets/tool.png'},
  {key: 'error', path: './assets/fire.png'}
]

let icons

function init (opts = {}) {
  opts.iconArray = opts.iconArray || iconArray
  opts.baseUrl = process.env.GITLAB_API_URL || opts.baseUrl
  opts.token = process.env.GITLAB_ACCESS_KEY || opts.token
  opts.port = process.env.PORT || opts.port || 8080
  return loadIcons(opts.iconArray)
    .then(res => {
      icons = res
    })
    .then(() => startServer(opts.port, (issueUrl, res) => {
      const issueTag = UrlToTag(issueUrl)
      const fullUrl = tagToUrl(issueTag, opts.baseUrl)
      console.log(`Creating issue for ${issueTag} at URL: ${fullUrl}`)
      return getIssue(fullUrl, opts.token)
        .then(issue => {
          return createImage(issue, icons, opts)
        })
    }))
    .then(server => {
      console.log(`Server started on port ${opts.port}`)
    })
}

module.exports = init
