const axios = require('axios')
require('dotenv').config()
const url = require('url')
const issue = 'rcs/generic/hwp-docs#8'
const baseUrl = process.env.GITLAB_API_URL
const token = process.env.GITLAB_ACCESS_KEY

const [issuePath, issueId] = issue.split('#')
const issueUrl = new url.URL(`api/v4/projects/${encodeURIComponent(issuePath)}/issues?iids[]=${issueId}`, baseUrl).href

axios.get(issueUrl, {
  headers: {
    'PRIVATE-TOKEN': token
  }
})
  .then(res => {
    const issues = res.data.map(i => ({
      id: i.iid,
      title: i.title,
      state: i.state,
      labels: i.labels
    }))
    console.log(issues)
  })
