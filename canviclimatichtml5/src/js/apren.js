const canvas = document.getElementById("cityCanvas");
const ctx = canvas.getContext("2d");

const terraY = 300;

let nivellContaminacio = 0;

/* =========================
   FONS (CEL + CONTAMINACIÓ)
   ========================= */
function dibuixarFons() {
  const baseBlue = 200;

  const value = Math.max(
    120,
    baseBlue - nivellContaminacio * 80
  );

  ctx.fillStyle = `rgb(${value}, ${value}, ${value})`;
  ctx.fillRect(0, 0, canvas.width, terraY);
}

/* =========================
   EDIFICIS FIXOS
   ========================= */
function dibuixarEdificis() {
  ctx.fillStyle = "#745f5fff";

  const edificis = [
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

  edificis.forEach(b => {
    ctx.fillRect(b.x, terraY - b.h, b.w, b.h);
  });
}

/* =========================
   ciutat BARCELONA
   ========================= */
function dibuixarEscena() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Cel
  dibuixarFons();

  // Terra
  ctx.fillStyle = "#2c2c2c";
  ctx.fillRect(0, terraY, canvas.width, canvas.height);

  // Edificis
  dibuixarEdificis();

  /* TORRE GLÒRIES */
  ctx.fillStyle = "#4a6fa5";
  ctx.beginPath();
  ctx.ellipse(610, terraY - 120, 28, 110, 0, 0, Math.PI * 2);
  ctx.fill();

  /* SAGRADA FAMÍLIA */
  ctx.fillStyle = "#6b5b3e";

  for (let i = 0; i < 4; i++) {
    ctx.fillRect(380 + i * 18, terraY - 170, 10, 170);
  }

  ctx.fillRect(360, terraY - 110, 90, 110);

  ctx.beginPath();
  ctx.moveTo(366, terraY - 170);
  ctx.lineTo(376, terraY - 190);
  ctx.lineTo(386, terraY - 170);
  ctx.fill();
}

/* =========================
   SLIDER CONTAMINACIÓ
   ========================= */
const slider = document.getElementById("pollutionSlider");

slider.addEventListener("input", (e) => {
  nivellContaminacio = e.target.value / 200;
  dibuixarEscena();
});


dibuixarEscena();
