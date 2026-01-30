const canvas = document.getElementById("cityCanvas");
const ctx = canvas.getContext("2d");

const groundY = 300; // adaptat a canvas 800x400

let pollutionLevel = 0; // 0 a 1

/* =========================
   FONS (CEL + CONTAMINACIÓ)
   ========================= */
function drawBackground() {
  const baseBlue = 200;

  const value = Math.max(
    120,
    baseBlue - pollutionLevel * 80
  );

  ctx.fillStyle = `rgb(${value}, ${value}, ${value})`;
  ctx.fillRect(0, 0, canvas.width, groundY);
}

/* =========================
   EDIFICIS FIXOS
   ========================= */
function drawBuildings() {
  ctx.fillStyle = "#745f5fff";

  const buildings = [
    { x: 40, w: 60, h: 120 },
    { x: 120, w: 50, h: 160 },
    { x: 190, w: 70, h: 140 },
    { x: 280, w: 60, h: 180 },
    { x: 360, w: 50, h: 130 },
    { x: 430, w: 80, h: 150 },
    { x: 560, w: 60, h: 170 },
    { x: 640, w: 50, h: 140 },
    { x: 700, w: 70, h: 160 }
  ];

  buildings.forEach(b => {
    ctx.fillRect(b.x, groundY - b.h, b.w, b.h);
  });
}

/* =========================
   SKYLINE BARCELONA
   ========================= */
function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Cel
  drawBackground();

  // Terra
  ctx.fillStyle = "#2c2c2c";
  ctx.fillRect(0, groundY, canvas.width, canvas.height);

  // Edificis
  drawBuildings();

  /* TORRE GLÒRIES */
  ctx.fillStyle = "#4a6fa5";
  ctx.beginPath();
  ctx.ellipse(610, groundY - 120, 28, 110, 0, 0, Math.PI * 2);
  ctx.fill();

  /* SAGRADA FAMÍLIA */
  ctx.fillStyle = "#6b5b3e";

  for (let i = 0; i < 4; i++) {
    ctx.fillRect(380 + i * 18, groundY - 170, 10, 170);
  }

  ctx.fillRect(360, groundY - 110, 90, 110);

  ctx.beginPath();
  ctx.moveTo(366, groundY - 170);
  ctx.lineTo(376, groundY - 190);
  ctx.lineTo(386, groundY - 170);
  ctx.fill();
}

/* =========================
   SLIDER CONTAMINACIÓ
   ========================= */
const slider = document.getElementById("pollutionSlider");

slider.addEventListener("input", (e) => {
  pollutionLevel = e.target.value / 100;
  drawScene();
});

// Dibuix inicial
drawScene();
