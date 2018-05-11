const url = require('url')

function tagToUrl (issueTag, baseUrl) {
  const [issuePath, issueId] = issueTag.split('#')
  const issueUrl = new url.URL(`api/v4/projects/${encodeURIComponent(issuePath)}/issues/${issueId}`, baseUrl).href
  return issueUrl
}

module.exports = {
  tagToUrl
}
