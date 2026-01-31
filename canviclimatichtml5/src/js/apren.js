
const canvas = document.getElementById("ciutat");
const ctx = canvas.getContext("2d");
const terraY = 180;
let nivellContaminacio = 0;

function dibuixarFons() {
  const baseBlue = 200;
  const value = Math.max(120, baseBlue - nivellContaminacio * 80);
  ctx.fillStyle = `rgb(${value}, ${value}, ${value})`;
  ctx.fillRect(0, 0, canvas.width, terraY);
}

function dibuixarEdificis() {
  ctx.fillStyle = "#745f5fff";
  const edificis = [
    { x: 40, w: 40, h: 80 }, { x: 100, w: 30, h: 110 },
    { x: 150, w: 50, h: 90 }, { x: 220, w: 40, h: 120 }
  ];
  edificis.forEach(b => ctx.fillRect(b.x, terraY - b.h, b.w, b.h));
}

function dibuixarEscena() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibuixarFons();
  ctx.fillStyle = "#2c2c2c"; // Terra
  ctx.fillRect(0, terraY, canvas.width, canvas.height);
  dibuixarEdificis();
  
  ctx.fillStyle = "#6b5b3e";
  ctx.fillRect(350, terraY - 100, 60, 100);
}

const btnPollution = document.getElementById("pollutionBtn");
if (btnPollution) {
  btnPollution.addEventListener("click", () => {
    nivellContaminacio = (nivellContaminacio + 0.2) % 1.2;
    dibuixarEscena();
  });
}
dibuixarEscena();