export function generateStringTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  // SECTION 1: LANYARD STRAP FABRIC TEXTURE (#0A0A0C)
  ctx.fillStyle = "#0a0a0c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Woven strap border stitching lines (top and bottom edges)
  ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 8);
  ctx.lineTo(canvas.width, 8);
  ctx.moveTo(0, canvas.height - 8);
  ctx.lineTo(canvas.width, canvas.height - 8);
  ctx.stroke();

  // Subtle inner accent border lines
  ctx.strokeStyle = "rgba(255, 255, 255, 0.10)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 16);
  ctx.lineTo(canvas.width, 16);
  ctx.moveTo(0, canvas.height - 16);
  ctx.lineTo(canvas.width, canvas.height - 16);
  ctx.stroke();

  // Fine woven cloth diagonal cross-hatch texture
  ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
  ctx.lineWidth = 1;
  for (let i = -canvas.height; i < canvas.width; i += 6) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + canvas.height, canvas.height);
    ctx.stroke();
  }

  // STRAP TEXT: "UIUX DESIGNER" (Transformed so MeshLine UV mapping displays text 100% upright & readable)
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(-1, -1);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 60px 'Courier New', Monaco, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0, 0, 0, 0.95)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 2;
  if (ctx.letterSpacing !== undefined) ctx.letterSpacing = "4px";

  const count = 2;
  for (let k = 0; k < count; k++) {
    const x = (canvas.width / count) * (k + 0.5);
    ctx.fillText("UIUX DESIGNER", x, canvas.height / 2);
  }
  ctx.restore();

  return canvas.toDataURL("image/png");
}
