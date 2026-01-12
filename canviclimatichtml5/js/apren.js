const yearInput = document.getElementById("yearInput");
const heatOverlay = document.getElementById("heatOverlay");
const mapContainer = document.querySelector(".map-container");

const startYear = 2025;
const endYear = 2075;

function updateHeatEffect(year) {
  // Limita el año dentro del rango
  year = Math.min(Math.max(year, startYear), endYear);

  // Calcula progreso (0 a 1)
  const progress = (year - startYear) / (endYear - startYear);

  // Escala de intensitat (més vermell a mesura que augmenta el temps)
  const redIntensity = Math.min(1, progress * 1.2); // fins a 120%
  const saturationBoost = 1 + progress * 1.5; // augment real de saturació
  const warmth = progress * 30; // rotació càlida del to

  // Aplica filtre CSS potent
  mapContainer.style.filter = `
    brightness(${1 - progress * 0.15})
    saturate(${saturationBoost})
    sepia(${redIntensity})
    hue-rotate(${warmth}deg)
    contrast(${1 + progress * 0.3})
  `;

  // Afegeix una capa vermellosa visible a sobre (augmentant opacitat)
  heatOverlay.style.background = `rgba(255, 80, 0, ${0.2 + progress * 0.4})`;

  // Petit efecte de zoom (com escalfament físic)
  const scale = 1 + progress * 0.25;
  mapContainer.style.transform = `scale(${scale})`;
}

// Actualitza quan s'introdueix un nou any
yearInput.addEventListener("input", (e) => {
  const year = parseInt(e.target.value);
  updateHeatEffect(year);
});

// Estat inicial
updateHeatEffect(2025);
