const canvas = document.getElementById("ciutat");
const ctx = canvas.getContext("2d");

const amplada = 1000;
const altura = 400;
const terraY = 320;

let nivellContaminacio = 0;

let pollutionStarted = false;
let pollutionTimer = null;

const pollutionInterval = 100;
const pollutionStep = 0.07;

function dibuixarFons() {
    const baseR = 155; 
    const baseG = 206;
    const baseB = 225; 

    const r = baseR + nivellContaminacio * (200 - baseR);
    const g = baseG + nivellContaminacio * (200 - baseG);
    const b = baseB + nivellContaminacio * (220 - baseB);

    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(0, 0, amplada, terraY);
}

function dibuixarEdificis() {
    ctx.fillStyle = "#3a3a3a";

    const edificis = [
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

    edificis.forEach(b => {
        ctx.fillRect(b.x, terraY - b.h, b.w, b.h);
    });
}

function dibuixarEscena() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scaleX = canvas.width / amplada;
    const scaleY = canvas.height / altura;
    const scale = Math.min(scaleX, scaleY);

    ctx.save();
    ctx.scale(scale, scale);

    dibuixarFons();

    ctx.fillStyle = "#2c2c2c";
    ctx.fillRect(0, terraY, amplada, altura);

    dibuixarEdificis();

    ctx.fillStyle = "#4a6fa5";
    ctx.beginPath();
    ctx.ellipse(700, terraY - 110, 30, 110, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#6b5b3e";

    for (let i = 0; i < 4; i++) {
        ctx.fillRect(450 + i * 20, terraY - 160, 12, 160);
    }

    ctx.fillRect(440, terraY - 100, 100, 100);

    ctx.beginPath();
    ctx.moveTo(446, terraY - 160);
    ctx.lineTo(456, terraY - 180);
    ctx.lineTo(466, terraY - 160);
    ctx.fill();

    ctx.restore();
}

document.getElementById("pollutionBtn").addEventListener("click", () => {
    if (pollutionStarted) return;

    pollutionStarted = true;

    pollutionTimer = setInterval(() => {
        if (nivellContaminacio < 1) {
            nivellContaminacio += pollutionStep;
            dibuixarEscena();
        } else {
            clearInterval(pollutionTimer);
        }
    }, pollutionInterval);
});

dibuixarEscena();
