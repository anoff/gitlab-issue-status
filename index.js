const axios = require('axios')
require('dotenv').config()
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

const { createCanvas } = require('canvas')
const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d')

// Write "Awesome!"
ctx.rotate(0.1)
ctx.fillText('a😀s✅df', 50, 100)

// Draw line under text
var text = ctx.measureText('Awesome!')
ctx.strokeStyle = 'rgba(0,0,0,0.5)'
ctx.beginPath()
ctx.lineTo(50, 102)
ctx.lineTo(50 + text.width, 102)
ctx.stroke()

console.log(canvas.toDataURL())
