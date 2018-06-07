const { createCanvas, loadImage } = require('canvas')

function createImage (issue, icons, opts = {}) {
  opts.fontsize = opts.fontsize || 14
  opts.showTitle = opts.showTitle !== undefined ? opts.showTitle : true
  opts.width = opts.width || Math.max(issue.tag.length * opts.fontsize * 0.8, opts.showTitle ? issue.title.length * opts.fontsize : 0)
  opts.height = opts.height || opts.fontsize * (opts.showTitle ? 2.5 : 1.3)
  const canvas = createCanvas(opts.width, opts.height)
  const ctx = canvas.getContext('2d')
  const iconSize = 16 // square pixel side

  if (opts.showTitle) {
    ctx.font = `${opts.fontsize}px Impact`
    ctx.fillText(issue.title, iconSize * 1.5, opts.fontsize * 1.1)
    ctx.font = `${opts.fontsize * 0.8}px Impact`
    ctx.fillText(issue.tag, iconSize * 1.5, opts.fontsize * 2.2)
  } else {
    ctx.font = `${opts.fontsize}px Impact`
    ctx.fillText(issue.tag, iconSize * 1.5, opts.fontsize * 1.1)
  }
  let icon = icons[issue.state]
  if (!icon) icon = icons.error // default to error
  ctx.drawImage(icon, 0, (opts.height - iconSize) / 2, iconSize, iconSize)
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
