const axios = require('axios')
const url = require('url')

function tagToUrl (issueTag, baseUrl) {
  const [issuePath, issueId] = issueTag.split('#')
  let u = `${baseUrl}/projects/${encodeURIComponent(issuePath)}/issues/${issueId}`
  u = u.replace(/([^:]\/)\/+/g, '$1')
  return u
}

function UrlToTag (issueUrl) {
  const p = url.parse(issueUrl).pathname.replace(/%2F/gi, '/')
  const m = p.match(/(\/?api\/v4\/)?\/?([^#?\s]+)\/issues\/([0-9]+)/)
  return `${m[2]}#${m[3]}`
}

function getIssue (issueUrl, apiToken) {
  return axios.get(issueUrl, {
    headers: {
      'PRIVATE-TOKEN': apiToken
    }
  })
    .then(res => Object.assign(res.data, {tag: UrlToTag(res.data.web_url)}))
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
