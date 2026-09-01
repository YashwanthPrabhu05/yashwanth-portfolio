import { drawYpPattern } from "./ypPattern";

let logoImagePromise = null;
function getLogoImage() {
  if (!logoImagePromise) {
    logoImagePromise = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (err) => {
        console.warn("Failed to load /Yp_logo.svg:", err);
        reject(err);
      };
      img.src = "/Yp_logo.svg";
    });
  }
  return logoImagePromise;
}

// Start fetching immediately, and keep the resolved image so the *first*
// synchronous render can already include it. The GLTF card model takes longer
// to load than this SVG, so in practice the texture is drawn complete the first
// time and never has to be swapped — swapping it mid-flight flashed a blank card.
let resolvedLogo = null;
getLogoImage()
  .then((img) => {
    resolvedLogo = img;
  })
  .catch(() => {});

// The card front face occupies the left half of the 1024 texture (U 0 - 0.5),
// at roughly a 0.70 portrait ratio.
const FACE_WIDTH = 512;
const FACE_HEIGHT = 731;

// Resolves once the logo has landed, so the returned texture is final and never
// needs to be swapped underneath a live material.
export function generateCardTextureAsync(options = {}) {
  return getLogoImage()
    .catch(() => null)
    .then(() => generateCardTexture(options));
}

export function generateCardTexture({
  firstName = "Yashwanth",
  lastName = "Prabhu",
  title = "UIUX DESIGNER",
  date = "AUG 16 2025",
  quoteLine1 = "Design is not just what it looks like.",
  quoteLine2 = "Design is how it works.",
  keywords = "RESEARCH  |  EMPATHY  |  DESIGN  |  IMPACT",
  bgColor = "#08080a",
  textColor = "#ffffff",
  patternOpacity = 0.05,
  patternScale = 1,
  patternRotation = 0,
  onUpdate = null,
} = {}) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  const render = (img) => {
    // 1. BASE CHARCOAL GRADIENT FILL (#050505 to #0F0F0F)
    const baseGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    baseGrad.addColorStop(0, "#050505");
    baseGrad.addColorStop(0.5, "#0b0b0e");
    baseGrad.addColorStop(1, "#0f0f13");
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. YP MONOGRAM BACKGROUND PATTERN LAYER
    drawYpPattern(ctx, {
      faceWidth: FACE_WIDTH,
      faceHeight: FACE_HEIGHT,
      logoImage: img,
      opacity: patternOpacity,
      scale: patternScale,
      rotation: patternRotation,
    });

    // 3. CARD SURFACE LIGHTING OVERLAY (SOFT DIAGONAL WHITE STUDIO LIGHT STREAK)
    const lightGrad = ctx.createLinearGradient(0, 0, 512, 680);
    lightGrad.addColorStop(0, "rgba(255, 255, 255, 0.22)");
    lightGrad.addColorStop(0.25, "rgba(255, 255, 255, 0.08)");
    lightGrad.addColorStop(0.6, "rgba(0, 0, 0, 0)");
    lightGrad.addColorStop(1, "rgba(0, 0, 0, 0.4)");
    ctx.fillStyle = lightGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 4. EDGE VIGNETTE SHADOW
    const vignette = ctx.createRadialGradient(
      256,
      canvas.height / 2,
      200,
      256,
      canvas.height / 2,
      500
    );
    vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
    vignette.addColorStop(1, "rgba(0, 0, 0, 0.65)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // FRONT FACE BOUNDS: X = 0 to 512px (U = 0.0 to 0.5)
    const contentLeft = 35;
    const contentRight = 475;

    // 5. TOP-LEFT LOGO ASSET (X = 35, Y = 40)
    ctx.save();
    if (img) {
      ctx.shadowColor = "rgba(0, 0, 0, 0.85)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 3;
      ctx.drawImage(img, contentLeft, 40, 68, 68);
    } else {
      const logoGrad = ctx.createLinearGradient(contentLeft, 40, contentLeft, 108);
      logoGrad.addColorStop(0, "#ffffff");
      logoGrad.addColorStop(1, "#999999");
      ctx.fillStyle = logoGrad;
      ctx.font = "italic bold 52px 'Playfair Display', Georgia, serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("Yp", contentLeft, 40);
    }
    ctx.restore();

    // 6. TOP-RIGHT DATE ("AUG 16 2025") - ALIGNED TOP-RIGHT OF FRONT FACE (X = 475, Y = 62)
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 16px 'Courier New', Monaco, monospace";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = "2px";
    ctx.fillText(date, contentRight, 62);
    ctx.restore();

    // 7. MAIN NAME ("Yashwanth Prabhu" - Y = 320 for firstName, Y = 380 for lastName)
    ctx.save();
    ctx.fillStyle = textColor;
    ctx.font = "700 54px Inter, 'Helvetica Neue', Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.shadowColor = "rgba(0, 0, 0, 0.85)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 3;

    ctx.fillText(firstName, contentLeft, 320);
    ctx.fillText(lastName, contentLeft, 380);
    ctx.restore();

    // 8. JOB TITLE ("UIUX DESIGNER" - Y = 460)
    ctx.save();
    ctx.fillStyle = "#cccccc";
    ctx.font = "600 17px 'Courier New', Monaco, monospace";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = "2.5px";
    ctx.fillText(title, contentLeft, 460);
    ctx.restore();

    // 9. PHILOSOPHY ICON (4-POINT SPARKLE STAR) - CENTER AT (starX = 48, starY = 550)
    ctx.save();
    const starX = contentLeft + 13;
    const starY = 550;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.8;
    ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
    ctx.shadowBlur = 5;

    ctx.beginPath();
    ctx.moveTo(starX, starY - 11);
    ctx.quadraticCurveTo(starX, starY, starX + 11, starY);
    ctx.quadraticCurveTo(starX, starY, starX, starY + 11);
    ctx.quadraticCurveTo(starX, starY, starX - 11, starY);
    ctx.quadraticCurveTo(starX, starY, starX, starY - 11);
    ctx.stroke();

    ctx.lineWidth = 0.9;
    ctx.beginPath();
    ctx.moveTo(starX - 4, starY - 4);
    ctx.lineTo(starX + 4, starY + 4);
    ctx.moveTo(starX + 4, starY - 4);
    ctx.lineTo(starX - 4, starY + 4);
    ctx.stroke();
    ctx.restore();

    // 10. PHILOSOPHY TEXT (2 LINES: Y = 538 and Y = 558)
    ctx.save();
    ctx.fillStyle = "#e0e0e0";
    ctx.font = "400 13px Inter, 'Helvetica Neue', Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(quoteLine1, contentLeft + 36, 538);
    ctx.fillText(quoteLine2, contentLeft + 36, 558);
    ctx.restore();

    // 11. BOTTOM KEYWORD ROW ("RESEARCH  |  EMPATHY  |  DESIGN  |  IMPACT" - Y = 675)
    ctx.save();
    ctx.fillStyle = "#888888";
    ctx.font = "600 11px 'Courier New', Monaco, monospace";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = "1.5px";
    ctx.fillText(keywords, contentLeft, 675);
    ctx.restore();
  };

  render(resolvedLogo);

  // Only needed when the logo hasn't landed yet; otherwise the render above is
  // already final.
  if (!resolvedLogo) {
    getLogoImage()
      .then((img) => {
        render(img);
        if (onUpdate) onUpdate(canvas.toDataURL("image/png"));
      })
      .catch(() => {});
  }

  return canvas.toDataURL("image/png");
}
