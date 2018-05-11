require('dotenv').config()
const {tagToUrl, UrlToTag, getIssue} = require('.').gitlab
const {startServer} = require('.').server
const {loadIcons, createImage} = require('.').canvas

const baseUrl = process.env.GITLAB_API_URL
const token = process.env.GITLAB_ACCESS_KEY

const port = process.env.PORT || 8080

const iconArray = [
  {key: 'closed', path: './assets/check.png'},
  {key: 'opened', path: './assets/cross.png'},
  {key: 'tool', path: './assets/tool.png'}
]

let icons

function init () {
  return loadIcons(iconArray)
    .then(res => {
      icons = res
    })
    .then(() => startServer(port, (issueUrl, res) => {
      const issueTag = UrlToTag(issueUrl)
      const fullUrl = tagToUrl(issueTag, baseUrl)
      console.log(`Creating issue for ${issueTag} at URL: ${fullUrl}`)
      return getIssue(fullUrl, token)
        .then(issue => {
          return createImage(issue, icons)
        })
    }))
    .then(server => {
      console.log(`Server started on port ${port}`)
    })
}

module.exports = init
