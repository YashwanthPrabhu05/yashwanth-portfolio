let logoImageCache = null;
let logoLoaded = false;

// GENERATE DENSE TIGHTLY-STAGGERED YP MONOGRAM GRID (~55 ELEMENTS)
const DENSE_STAGGERED_YPS = [];
const rows = 10;
const cols = 6;
const rowStep = 1.02 / rows; // ~10% vertical step
const colStep = 1.20 / (cols - 1); // ~24% horizontal step

for (let r = -1; r <= rows; r++) {
  const py = r * rowStep;
  const xOffset = (r % 2 === 0) ? 0 : colStep * 0.5;
  for (let c = -1; c <= cols; c++) {
    const px = -0.15 + c * colStep + xOffset;
    DENSE_STAGGERED_YPS.push({
      px,
      py,
      scale: 0.98 + (( (r * 3 + c * 7) % 5 ) * 0.02),
      rot: (( (r * 5 + c * 11) % 7 ) - 3) * 0.8,
      op: 0.07 + (( (r * 2 + c * 3) % 4 ) * 0.005)
    });
  }
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
  onUpdate = null,
} = {}) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  const render = (img) => {
    // 1. BASE CHARCOAL GRADIENT FILL (#050505 to #0F0F0F) - UNTOUCHED
    const baseGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    baseGrad.addColorStop(0, "#050505");
    baseGrad.addColorStop(0.5, "#0b0b0e");
    baseGrad.addColorStop(1, "#0f0f13");
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. STAGGERED YP MONOGRAM BACKGROUND PATTERN LAYER - UNTOUCHED
    DENSE_STAGGERED_YPS.forEach((item) => {
      ctx.save();
      const posX = item.px * canvas.width;
      const posY = item.py * canvas.height;

      ctx.translate(posX, posY);
      if (item.rot) ctx.rotate((item.rot * Math.PI) / 180);

      if (img && logoLoaded) {
        ctx.globalAlpha = item.op * 1.5;
        const w = 145 * item.scale;
        const h = 100 * item.scale;
        ctx.drawImage(img, -w / 2, -h / 2, w, h);
      } else {
        ctx.fillStyle = "rgba(42, 42, 46, 0.9)";
        ctx.globalAlpha = item.op * 2.0;
        ctx.font = `italic ${Math.round(85 * item.scale)}px 'Playfair Display', Didot, 'Times New Roman', serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Yp", 0, 0);
      }
      ctx.restore();
    });

    // 3. CARD SURFACE LIGHTING OVERLAY (SOFT DIAGONAL WHITE STUDIO LIGHT STREAK) - UNTOUCHED
    const lightGrad = ctx.createLinearGradient(0, 0, 680, 680);
    lightGrad.addColorStop(0, "rgba(255, 255, 255, 0.22)");
    lightGrad.addColorStop(0.25, "rgba(255, 255, 255, 0.08)");
    lightGrad.addColorStop(0.6, "rgba(0, 0, 0, 0)");
    lightGrad.addColorStop(1, "rgba(0, 0, 0, 0.4)");
    ctx.fillStyle = lightGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 4. EDGE VIGNETTE SHADOW - UNTOUCHED
    const vignette = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      360,
      canvas.width / 2,
      canvas.height / 2,
      720
    );
    vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
    vignette.addColorStop(1, "rgba(0, 0, 0, 0.65)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // SHARED CONTENT LEFT ALIGNMENT CORNER MARGIN (45px = TOP-MOST LEFT CORNER)
    const contentLeft = 45;

    // 5. TOP-LEFT LOGO ASSET (RESTORED TO TOP-MOST LEFT CORNER: X = 45, Y = 35)
    ctx.save();
    if (img && logoLoaded) {
      ctx.shadowColor = "rgba(0, 0, 0, 0.85)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 3;
      ctx.drawImage(img, contentLeft, 35, 75, 75);
    } else {
      const logoGrad = ctx.createLinearGradient(contentLeft, 35, contentLeft, 95);
      logoGrad.addColorStop(0, "#ffffff");
      logoGrad.addColorStop(1, "#999999");
      ctx.fillStyle = logoGrad;
      ctx.font = "italic bold 52px 'Playfair Display', Georgia, serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("Yp", contentLeft, 35);
    }
    ctx.restore();

    // 6. TOP-RIGHT DATE ("AUG 16 2025") - ALIGNED TOP-RIGHT (X = canvas.width - 45, Y = 48)
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 20px 'Courier New', Monaco, monospace";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.letterSpacing = "2px";
    ctx.fillText(date, canvas.width - contentLeft, 48);
    ctx.restore();

    // 7. MAIN NAME ("Yashwanth Prabhu" - SHARED LEFT MARGIN X = 45)
    ctx.save();
    ctx.fillStyle = textColor;
    ctx.font = "700 68px Inter, 'Helvetica Neue', Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.shadowColor = "rgba(0, 0, 0, 0.85)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 3;

    ctx.fillText(firstName, contentLeft, 520);
    ctx.fillText(lastName, contentLeft, 595);
    ctx.restore();

    // 8. JOB TITLE ("UIUX DESIGNER" - IMMEDIATELY BELOW NAME: X = 45, Y = 680)
    ctx.save();
    ctx.fillStyle = "#cccccc";
    ctx.font = "600 20px 'Courier New', Monaco, monospace";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(title, contentLeft, 680);
    ctx.restore();

    // 9. PHILOSOPHY ICON (SMALLER ELEGANT 4-POINT SPARKLE STAR)
    ctx.save();
    const starX = contentLeft + 10;
    const starY = 765;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.6;
    ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
    ctx.shadowBlur = 4;

    ctx.beginPath();
    ctx.moveTo(starX, starY - 10);
    ctx.quadraticCurveTo(starX, starY, starX + 10, starY);
    ctx.quadraticCurveTo(starX, starY, starX, starY + 10);
    ctx.quadraticCurveTo(starX, starY, starX - 10, starY);
    ctx.quadraticCurveTo(starX, starY, starX, starY - 10);
    ctx.stroke();

    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(starX - 4, starY - 4);
    ctx.lineTo(starX + 4, starY + 4);
    ctx.moveTo(starX + 4, starY - 4);
    ctx.lineTo(starX - 4, starY + 4);
    ctx.stroke();
    ctx.restore();

    // 10. PHILOSOPHY TEXT (SMALLER CAPTION FONT SIZE: 13px)
    ctx.save();
    ctx.fillStyle = "#dddddd";
    ctx.font = "400 13px Inter, 'Helvetica Neue', Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(quoteLine1, contentLeft + 30, 755);
    ctx.fillText(quoteLine2, contentLeft + 30, 773);
    ctx.restore();

    // 11. BOTTOM KEYWORD ROW ("RESEARCH | EMPATHY | DESIGN | IMPACT")
    // TYPOGRAPHY DECREASED TO 9.5px AT BOTTOM-LEFT CORNER (X = 45, Y = 945)
    ctx.save();
    ctx.fillStyle = "#999999";
    ctx.font = "500 9.5px 'Courier New', Monaco, monospace";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.letterSpacing = "1.2px";
    ctx.fillText(keywords, contentLeft, 945);
    ctx.restore();
  };

  if (!logoImageCache) {
    logoImageCache = new Image();
    logoImageCache.src = "/Yp_logo.svg";
    logoImageCache.onload = () => {
      logoLoaded = true;
      render(logoImageCache);
      if (onUpdate) onUpdate(canvas.toDataURL("image/png"));
    };
  }

  render(logoImageCache);
  return canvas.toDataURL("image/png");
}
