const { createCanvas, loadImage } = require('canvas')

function createImage (issue, icons, opts = {}) {
  opts.width = opts.width || 250
  opts.height = opts.height || 16
  const canvas = createCanvas(opts.width, opts.height)
  const ctx = canvas.getContext('2d')

  // Write "Awesome!"
  ctx.font = '12px Impact'
  ctx.fillText(issue.tag, 20, 14)
  console.log(issue.state)
  let icon = icons[issue.state]
  if (!icon) icon = icons.error // default to error
  ctx.drawImage(icon, 0, 0, 16, 16)
  return canvas.toBuffer()
}

/**
 *
 * @param {*} iconArray
 */
function loadIcons (iconArray) {
  const images = {}
  return Promise.all(iconArray.map(i => {
    loadImage(i.path)
      .then(data => {
        images[i.key] = data
      })
  }))
    .then(() => images)
}

module.exports = {
  loadIcons,
  createImage
}
