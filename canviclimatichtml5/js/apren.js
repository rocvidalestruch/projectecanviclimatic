const yearInput = document.getElementById("yearInput");
const mapContainer = document.querySelector(".map-container");
const img = document.getElementById("worldMap");
const canvas = document.getElementById("heatCanvas");
const ctx = canvas.getContext("2d");

const startYear = 2025;
const endYear = 2075;

// Wait for image to load before initializing canvas
img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;
  updateHeatEffect(parseInt(yearInput.value));
};

function updateHeatEffect(year) {
  // Limita l'any
  year = Math.min(Math.max(year, startYear), endYear);
  const progress = (year - startYear) / (endYear - startYear);

  // Dibuixa la imatge base
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  try {
    // Obté les dades dels píxels (bitmap)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Manipulació directa del canal R (RGB)
    // Com més progressió, més es suma al canal vermell
    const addedRed = progress * 100; // Sumar fins a 100 punts de vermell

    for (let i = 0; i < data.length; i += 4) {
      // data[i] és Vermell (Red)
      // data[i+1] és Verd (Green)
      // data[i+2] és Blau (Blue)

      // Augmentem el vermell directament
      data[i] = Math.min(255, data[i] + addedRed);

      // Opcionalment reduïm una mica els altres per fer el vermell més evident
      // però mantenint la imatge recognoscible
      if (progress > 0) {
        data[i + 1] = Math.max(0, data[i + 1] - (progress * 30));
        data[i + 2] = Math.max(0, data[i + 2] - (progress * 30));
      }
    }

    // Posa les dades modificades de nou al canvas
    ctx.putImageData(imageData, 0, 0);

    // Assegura que el canvas es veu i la imatge no
    canvas.style.display = "block";
    img.style.display = "none";

    // Petit efecte de zoom al canvas
    const scale = 1 + progress * 0.1;
    canvas.style.transform = `scale(${scale})`;
    canvas.style.transition = "transform 0.3s ease";

  } catch (e) {
    // Fallback: Si falla per CORS (file://), fem servir filtres CSS a la imatge original
    console.warn("No s'ha pogut accedir al Bitmap (CORS). Usant fallback CSS.");
    console.error(e);
    alert("Nota: Si estàs obrint això com a arxiu local, el navegador bloqueja la manipulació de píxels per seguretat (CORS). S'aplicarà un filtre visual alternatiu.");

    canvas.style.display = "none";
    img.style.display = "block";

    const redIntensity = Math.min(1, progress * 1.2);
    const saturationBoost = 1 + progress * 1.5;
    const warmth = progress * 30;

    mapContainer.style.filter = `
      brightness(${1 - progress * 0.15})
      saturate(${saturationBoost})
      sepia(${redIntensity})
      hue-rotate(${warmth}deg)
      contrast(${1 + progress * 0.3})
    `;

    const scale = 1 + progress * 0.25;
    mapContainer.style.transform = `scale(${scale})`;
  }
}

yearInput.addEventListener("input", (e) => {
  updateHeatEffect(parseInt(e.target.value));
});

// Força càrrega si la imatge ja està a la cache
if (img.complete) {
  canvas.width = img.width;
  canvas.height = img.height;
  updateHeatEffect(2025);
}
