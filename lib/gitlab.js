const axios = require('axios')
const url = require('url')

function tagToUrl (issueTag, baseUrl) {
  const [issuePath, issueId] = issueTag.split('#')
  const issueUrl = new url.URL(`projects/${encodeURIComponent(issuePath)}/issues/${issueId}`, baseUrl).href
  return issueUrl
}

function UrlToTag (issueUrl) {
  const p = url.parse(issueUrl).pathname
  return p.replace('/issues/', '#').slice(1).replace('api/v4/', '').replace('projects/', '').replace(/%2F/gi, '/')
}

function getIssue (issueUrl, apiToken) {
  return axios.get(issueUrl, {
    headers: {
      'PRIVATE-TOKEN': apiToken
    }
  })
    .then(res => ({
      id: res.data.iid,
      title: res.data.title,
      state: res.data.state,
      labels: res.data.labels,
      tag: UrlToTag(res.data.web_url)
    }))
    .catch(err => {
      console.error(`Error while fetching issue status at ${err.config.url}: ${err.response.status} - ${err.response.statusText}`)
      return {
        id: 0,
        title: '',
        state: 'opened',
        labels: [],
        tag: UrlToTag(issueUrl)
      }
    })
}

module.exports = {
  tagToUrl,
  UrlToTag,
  getIssue
}
