require('dotenv').config()
const {tagToUrl, UrlToTag, getIssueStatus} = require('./lib/gitlab')
const {startServer} = require('./lib/server')
const {loadIcons, createImage} = require('./lib/canvas')

const baseUrl = process.env.GITLAB_API_URL
const token = process.env.GITLAB_ACCESS_KEY

const iconArray = [
  {key: 'closed', path: './check.png'},
  {key: 'opened', path: './cross.png'},
  {key: 'tool', path: './tool.png'}
]

let icons

function init () {
  return loadIcons(iconArray)
    .then(res => {
      icons = res
    })
    .then(() => startServer((issueUrl, res) => {
      const issueTag = UrlToTag(issueUrl)
      console.log(issueTag)
      const fullUrl = tagToUrl(issueTag, baseUrl)
      console.log(fullUrl)
      return getIssueStatus(fullUrl, token)
        .then(issue => {
          return createImage(issue, icons)
        })
    }))
}
init()
