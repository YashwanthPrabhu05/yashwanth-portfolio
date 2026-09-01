// Background YP monogram layer for the ID card face.
//
// The card face is a canvas texture on a 3D mesh (not DOM), so this is the
// texture-space equivalent of an SVG layer: marks are laid out in
// face-relative fractions, so the pattern scales with the card.
// Drawn after the base fill and before the lighting/vignette, so the card's
// lighting partially hides and reveals it.
//
// Layout matches the reference card: a regular staggered brick grid — even row
// spacing with every other row offset by half a column. Uniform size and no
// rotation; all the visual variation comes from the lighting layer above it.

const COL_STEP = 1 / 3  // horizontal spacing: three marks per row
const ROW_STEP = 0.20   // vertical spacing, fraction of face height
const MARK_WIDTH = 0.24 // mark width, fraction of face width
// Yp_logo.svg has a 59x60 viewBox, so the mark is essentially square. The old
// 0.69 ratio squashed the monogram horizontally.
const MARK_ASPECT = 0.98 // height / width of the monogram

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {object} opts
 * @param {number} opts.faceWidth   width of the card face in texture px
 * @param {number} opts.faceHeight  height of the card face in texture px
 * @param {HTMLImageElement|null} opts.logoImage  brand mark; falls back to serif text
 * @param {number} [opts.opacity=0.05]  a whisper of texture, never competing with the name
 * @param {number} [opts.scale=1]       multiplier on the mark size
 * @param {number} [opts.rotation=0]    rotation in degrees applied to every mark
 * @param {string} [opts.color='#2b2b2b']  used only by the serif-text fallback
 */
export function drawYpPattern(ctx, {
  faceWidth,
  faceHeight,
  logoImage = null,
  opacity = 0.05,
  scale = 1,
  rotation = 0,
  color = '#2b2b2b',
} = {}) {
  const w = faceWidth * MARK_WIDTH * scale
  const h = w * MARK_ASPECT

  const colStep = faceWidth * COL_STEP
  const rowStep = faceHeight * ROW_STEP

  // Overscan by a row/column on each side so marks crop at the card edges
  // instead of stopping short of them.
  const cols = Math.ceil(faceWidth / colStep) + 2
  const rows = Math.ceil(faceHeight / rowStep) + 2

  ctx.save()
  // Clip to the face so marks near the edges are cropped rather than bleeding
  // onto the rest of the texture (the card's back/sides).
  ctx.beginPath()
  ctx.rect(0, 0, faceWidth, faceHeight)
  ctx.clip()
  ctx.globalAlpha = opacity

  for (let r = -1; r < rows; r++) {
    const y = r * rowStep
    const xOffset = r % 2 === 0 ? 0 : colStep * 0.5

    for (let c = -1; c < cols; c++) {
      const x = c * colStep + xOffset

      ctx.save()
      ctx.translate(x, y)
      if (rotation) ctx.rotate((rotation * Math.PI) / 180)

      if (logoImage) {
        ctx.drawImage(logoImage, -w / 2, -h / 2, w, h)
      } else {
        ctx.fillStyle = color
        ctx.font = `italic ${h}px 'Playfair Display', Didot, 'Times New Roman', serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('Yp', 0, 0)
      }

      ctx.restore()
    }
  }

  ctx.restore()
}
