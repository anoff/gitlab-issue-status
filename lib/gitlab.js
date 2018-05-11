const axios = require('axios')
const url = require('url')

function tagToUrl (issueTag, baseUrl) {
  const [issuePath, issueId] = issueTag.split('#')
  const issueUrl = new url.URL(`api/v4/projects/${encodeURIComponent(issuePath)}/issues/${issueId}`, baseUrl).href
  return issueUrl
}

function UrlToTag (issueUrl) {
  const p = url.parse(issueUrl).pathname
  return p.replace('/issues/', '#').slice(1)
}

function getIssueStatus (issueUrl, token) {
  return axios.get(issueUrl, {
    headers: {
      'PRIVATE-TOKEN': token
    }
  })
    .then(res => ({
      id: res.data.iid,
      title: res.data.title,
      state: res.data.state,
      labels: res.data.labels,
      tag: UrlToTag(res.data.web_url)
    }))
}

module.exports = {
  tagToUrl,
  UrlToTag,
  getIssueStatus
}
