// API 8: Video/Audio
// Propòsit: controlar <video> i <audio> amb JavaScript (play/pause, volum, progrés).

function formatTime(seconds) {
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  const m = Math.floor((seconds / 60) % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function setupPlayer(media, btnPlay, btnPause, rangeProgress, rangeVol, txtTime, btnSubs) {
  if (!media) return;
  // Subtítols (només per vídeo)
  if (btnSubs && media.tagName === 'VIDEO') {
    const tracks = media.textTracks;
    if (tracks && tracks.length > 0) {
      // Per defecte: mostrar subtítols
      tracks[0].mode = 'showing';
      btnSubs.textContent = 'Subtítols: ON';

      btnSubs.addEventListener('click', () => {
        const isOn = tracks[0].mode === 'showing';
        tracks[0].mode = isOn ? 'hidden' : 'showing';
        btnSubs.textContent = isOn ? 'Subtítols: OFF' : 'Subtítols: ON';
      });
    } else {
      btnSubs.disabled = true;
      btnSubs.textContent = 'Subtítols: N/A';
    }
  }


  if (btnPlay) btnPlay.addEventListener('click', () => media.play());
  if (btnPause) btnPause.addEventListener('click', () => media.pause());

  // Volum
  if (rangeVol) {
    rangeVol.addEventListener('input', () => {
      media.volume = Number(rangeVol.value);
    });
  }

  // Progrés (timeline)
  if (rangeProgress) {
    rangeProgress.addEventListener('input', () => {
      if (!isFinite(media.duration) || media.duration === 0) return;
      const percent = Number(rangeProgress.value) / 100;
      media.currentTime = media.duration * percent;
    });
  }

  // Actualitzem barra + temps
  media.addEventListener('timeupdate', () => {
    if (rangeProgress && isFinite(media.duration) && media.duration > 0) {
      rangeProgress.value = ((media.currentTime / media.duration) * 100).toFixed(0);
    }

    if (txtTime) {
      const cur = formatTime(media.currentTime || 0);
      const dur = isFinite(media.duration) ? formatTime(media.duration) : '00:00';
      txtTime.textContent = `${cur} / ${dur}`;
    }
  });
}

// VIDEO
setupPlayer(
  document.getElementById('climateVideo'),
  document.getElementById('vidPlay'),
  document.getElementById('vidPause'),
  document.getElementById('vidProgress'),
  document.getElementById('vidVol'),
  document.getElementById('vidTime'),
  document.getElementById('vidSubs')
);

