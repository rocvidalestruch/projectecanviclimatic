// API 5: Web Worker
// Propòsit: calcular l'impacte energètic d'un fitxer sense bloquejar la UI.

function calcularEnergia(bytes) {
  const gigabytes = bytes / (1024 * 1024 * 1024);
  const minKWh = gigabytes * 0.015;
  const maxKWh = gigabytes * 0.03;
  return { minKWh, maxKWh };
}

self.onmessage = (e) => {
  const bytes = Number(e.data.bytes || 0);
  const poblacio = Number(e.data.poblacio || 0);

  // "Carregueta" per notar que el worker treballa (simulació).
  // No és necessari per al càlcul, però serveix per justificar el Worker.
  let dummy = 0;
  for (let i = 0; i < 1500000; i++) {
    dummy += (i % 3);
  }

  const energia = calcularEnergia(bytes);
  const min = energia.minKWh;
  const max = energia.maxKWh;

  const resposta = {
    min: min.toFixed(6),
    max: max.toFixed(6),
    bcnMin: (min * poblacio).toFixed(2),
    bcnMax: (max * poblacio).toFixed(2),
    // Només per debug (no es mostra)
    _dummy: dummy
  };

  self.postMessage(resposta);
};
