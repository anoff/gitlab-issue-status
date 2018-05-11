const { createCanvas, loadImage } = require('canvas')

function createImage (issue, icons) {
  const canvas = createCanvas(200, 16)
  const ctx = canvas.getContext('2d')

  // Write "Awesome!"
  ctx.font = '12px Impact'
  ctx.fillText(issue.tag, 20, 14)
  let icon = icons[issue.state]
  if (!icon) icon = icons[Object.keys(icons)[0]] // default to first if no match is found
  console.log(icon)
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
