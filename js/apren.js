const canvas = document.getElementById("iceCanvas");
const ctx = canvas.getContext("2d");
const timeRange = document.getElementById("timeRange");
const yearLabel = document.getElementById("yearLabel");

function drawScene(percentage) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Mar
  ctx.fillStyle = "#006994";
  ctx.fillRect(0, 200, 600, 100);

  // Cielo
  const skyGradient = ctx.createLinearGradient(0, 0, 0, 200);
  skyGradient.addColorStop(0, "#b3e6ff");
  skyGradient.addColorStop(1, "#ffffff");
  ctx.fillStyle = skyGradient;
  ctx.fillRect(0, 0, 600, 200);

  // Hielo (se derrite con el tiempo)
  const iceHeight = 100 - percentage;
  ctx.fillStyle = "#e0f7ff";
  ctx.beginPath();
  ctx.moveTo(100, 200);
  ctx.lineTo(100, 200 - iceHeight);
  ctx.lineTo(500, 200 - iceHeight);
  ctx.lineTo(500, 200);
  ctx.closePath();
  ctx.fill();

  // Texto informativo
  ctx.fillStyle = "#003366";
  ctx.font = "16px Arial";
  ctx.fillText(`Deshielo: ${Math.round(percentage)}%`, 250, 280);
}

timeRange.addEventListener("input", (e) => {
  const value = parseInt(e.target.value);
  drawScene(value);
  yearLabel.textContent = 2025 + Math.round(value / 2); // simula avance temporal
});

drawScene(0);
