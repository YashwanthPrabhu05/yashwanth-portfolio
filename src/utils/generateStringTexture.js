export function generateStringTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  // SECTION 1: LANYARD STRAP FABRIC TEXTURE (#0D0D0D)
  ctx.fillStyle = "#0d0d0d";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Fine woven cloth texture lines
  ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
  ctx.lineWidth = 1;
  for (let i = 0; i < canvas.width; i += 4) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 20, canvas.height);
    ctx.stroke();
  }

  for (let j = 0; j < canvas.height; j += 4) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(canvas.width, j);
    ctx.stroke();
  }

  // STRAP TEXT: "UIUX DESIGNER"
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 32px 'Courier New', Monaco, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
  ctx.shadowBlur = 4;

  // Repeat text across strap
  ctx.fillText("UIUX DESIGNER", canvas.width * 0.25, canvas.height / 2);
  ctx.fillText("UIUX DESIGNER", canvas.width * 0.75, canvas.height / 2);
  ctx.restore();

  return canvas.toDataURL("image/png");
}
