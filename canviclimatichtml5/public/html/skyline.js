const canvas = document.getElementById("skyline");
const ctx = canvas.getContext("2d");

// Mida original del disseny del skyline
const DESIGN_WIDTH = 1000;
const DESIGN_HEIGHT = 400;
const groundY = 320;

// Contaminació (0 = net, 1 = molt contaminat)
let pollutionLevel = 0;

// Control d'estat
let pollutionStarted = false;
let pollutionTimer = null;

// Velocitat de contaminació
const pollutionInterval = 100; // ms
const pollutionStep = 0.07;

/* =========================
   FONS (CEL + CONTAMINACIÓ)
   ========================= */
function drawBackground() {
    // Color inicial del cel (realista)
    const baseR = 155; // cel clar: més blau que vermell
    const baseG = 206;
    const baseB = 225; // cel blau clar

    // A mesura que puja la contaminació, s'apropa al gris
    // gris final aproximat: 150, 150, 150
    const r = baseR + pollutionLevel * (200 - baseR);
    const g = baseG + pollutionLevel * (200 - baseG);
    const b = baseB + pollutionLevel * (220 - baseB);

    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(0, 0, DESIGN_WIDTH, groundY);
}

/* =========================
   EDIFICIS FIXOS
   ========================= */
function drawBuildings() {
    ctx.fillStyle = "#3a3a3a";

    const buildings = [
        { x: 0, w: 60, h: 100 },
        { x: 80, w: 50, h: 140 },
        { x: 150, w: 70, h: 120 },
        { x: 240, w: 60, h: 160 },
        { x: 320, w: 50, h: 110 },
        { x: 390, w: 80, h: 130 },
        { x: 520, w: 60, h: 150 },
        { x: 600, w: 50, h: 120 },
        { x: 660, w: 70, h: 140 },
        { x: 760, w: 60, h: 110 },
        { x: 840, w: 80, h: 150 }
    ];

    buildings.forEach(b => {
        ctx.fillRect(b.x, groundY - b.h, b.w, b.h);
    });
}

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Escalar per adaptar tot dins del canvas petit
    const scaleX = canvas.width / DESIGN_WIDTH;
    const scaleY = canvas.height / DESIGN_HEIGHT;
    const scale = Math.min(scaleX, scaleY);

    ctx.save();
    ctx.scale(scale, scale);

    drawBackground();

    // Terra
    ctx.fillStyle = "#2c2c2c";
    ctx.fillRect(0, groundY, DESIGN_WIDTH, DESIGN_HEIGHT);

    drawBuildings();

    /* TORRE GLÒRIES */
    ctx.fillStyle = "#4a6fa5";
    ctx.beginPath();
    ctx.ellipse(700, groundY - 110, 30, 110, 0, 0, Math.PI * 2);
    ctx.fill();

    /* SAGRADA FAMÍLIA */
    ctx.fillStyle = "#6b5b3e";

    for (let i = 0; i < 4; i++) {
        ctx.fillRect(450 + i * 20, groundY - 160, 12, 160);
    }

    ctx.fillRect(440, groundY - 100, 100, 100);

    ctx.beginPath();
    ctx.moveTo(446, groundY - 160);
    ctx.lineTo(456, groundY - 180);
    ctx.lineTo(466, groundY - 160);
    ctx.fill();

    ctx.restore();
}

/* =========================
   INICI CONTAMINACIÓ (BOTÓ)
   ========================= */
document.getElementById("pollutionBtn").addEventListener("click", () => {
    if (pollutionStarted) return; // ja està en marxa

    pollutionStarted = true;

    pollutionTimer = setInterval(() => {
        if (pollutionLevel < 1) {
            pollutionLevel += pollutionStep;
            drawScene();
        } else {
            clearInterval(pollutionTimer);
        }
    }, pollutionInterval);
});

// Dibuix inicial (aire net)
drawScene();
