// API 2: Geolocation
// Propòsit: obtenir la ubicació de l'usuari i calcular la distància fins a alguns punts verds.

const btnUbicacio = document.getElementById("btnUbicacio");
const btnStop = document.getElementById("btnStopWatch");
const txtUbicacio = document.getElementById("txtUbicacio");
const llistaPunts = document.getElementById("llistaPunts");

// Punts d'exemple (coordenades aproximades de Barcelona)
const puntsVerds = [
  { nom: "Parc de la Ciutadella", lat: 41.3882, lon: 2.1862 },
  { nom: "Plaça Catalunya", lat: 41.3870, lon: 2.1701 },
  { nom: "Sants Estació", lat: 41.3790, lon: 2.1402 },
  { nom: "Camp Nou", lat: 41.3809, lon: 2.1228 }
];

let watchId = null;

function toRad(x) {
  return x * Math.PI / 180;
}

// Distància Haversine (km)
function distanciaKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function pintarPunts(lat, lon) {
  if (!llistaPunts) return;

  llistaPunts.innerHTML = "";

  // Ordenem punts per distància
  const ordenats = puntsVerds
    .map(p => ({
      ...p,
      dist: distanciaKm(lat, lon, p.lat, p.lon)
    }))
    .sort((a, b) => a.dist - b.dist);

  ordenats.forEach(p => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span>${p.nom}</span>
      <span class="badge text-bg-success">${p.dist.toFixed(2)} km</span>
    `;
    llistaPunts.appendChild(li);
  });
}

function mostrarUbicacio(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  if (txtUbicacio) {
    txtUbicacio.textContent = `Lat: ${lat.toFixed(5)} | Lon: ${lon.toFixed(5)}`;
  }

  pintarPunts(lat, lon);
}

function mostrarError(err) {
  if (!txtUbicacio) return;

  // Gestió d'errors bàsica (permís denegat, timeout, etc.)
  switch (err.code) {
    case err.PERMISSION_DENIED:
      txtUbicacio.textContent = "Permís denegat. Activa la ubicació per provar l'API.";
      break;
    case err.POSITION_UNAVAILABLE:
      txtUbicacio.textContent = "No es pot obtenir la ubicació ara mateix.";
      break;
    case err.TIMEOUT:
      txtUbicacio.textContent = "Temps d'espera superat. Torna-ho a intentar.";
      break;
    default:
      txtUbicacio.textContent = "Error desconegut de geolocalització.";
  }
}

function obtenirUbicacioUnaVegada() {
  if (!navigator.geolocation) {
    if (txtUbicacio) txtUbicacio.textContent = "Aquest navegador no suporta geolocalització.";
    return;
  }

  if (txtUbicacio) txtUbicacio.textContent = "Demanant ubicació...";

  navigator.geolocation.getCurrentPosition(
    mostrarUbicacio,
    mostrarError,
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}

function iniciarWatch() {
  if (!navigator.geolocation) return;
  if (watchId !== null) return;

  if (txtUbicacio) txtUbicacio.textContent = "Vigilant ubicació (watchPosition)...";

  watchId = navigator.geolocation.watchPosition(
    mostrarUbicacio,
    mostrarError,
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );

  if (btnStop) btnStop.style.display = "inline-block";
}

function pararWatch() {
  if (watchId === null) return;
  navigator.geolocation.clearWatch(watchId);
  watchId = null;
  if (btnStop) btnStop.style.display = "none";
}

if (btnUbicacio) {
  btnUbicacio.addEventListener("click", () => {
    obtenirUbicacioUnaVegada();
    // També activem watch per mostrar que ho sabem fer (rubrica)
    iniciarWatch();
  });
}

if (btnStop) {
  btnStop.addEventListener("click", pararWatch);
}
