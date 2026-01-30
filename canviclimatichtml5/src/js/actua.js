const rankingData = [
  { rank: 1, image: "../../img/cotxe_transit.jpg", text: "Moltes persones la fan servir cada dia i provoca gasos." },
  { rank: 2, image: "../../img/motos_transit.jpg", text: "Ràpides, petites, però també deixen gasos a l'aire." },
  { rank: 3, image: "../../img/maquinas_construccio.jpg", text: "Grans màquines construeixen edificis i generen pols." },
  { rank: 4, image: "../../img/climatitzacio.jpg", text: "Els edificis consumeixen molta electricitat per climatitzar-se." },
  { rank: 5, image: "../../img/restaurant.jpg", text: "Botigues i restaurants utilitzen llum i electrodomèstics constants." },
  { rank: 6, image: "../../img/cuinar.jpg", text: "Cuinar a casa o terrats genera fums i gasos locals." }
];

const contenidorPrincipal = document.getElementById("contenidorPrincipal");
const misstgeRanking = document.getElementById("misstgeRanking");
const tornar_a_jugar_boto = document.getElementById("tornar_a_jugar_boto");
const espais = document.querySelectorAll(".rank-slot");
let ContadorCorrectes = 0;

function initRankingGame() {
  contenidorPrincipal.innerHTML = "";
  misstgeRanking.textContent = "";
  misstgeRanking.style.color = "black";
  tornar_a_jugar_boto.style.display = "none";
  ContadorCorrectes = 0;

  espais.forEach(slot => {
    const numberSpan = slot.querySelector(".rank-number");
    slot.innerHTML = "";
    slot.appendChild(numberSpan);
    slot.classList.remove("correct-slot", "incorrect-slot");
  });

  const randomitzarDades = [...rankingData].sort(() => Math.random() - 0.5);

  randomitzarDades.forEach(item => {
    const el = document.createElement("div");
    el.classList.add("rank-item");
    el.draggable = true;
    el.dataset.rank = item.rank;
    el.innerHTML = `<img src="${item.image}" class="rank-img" alt="Activity">${item.text}`;

    el.addEventListener("dragstart", handleRankDragStart);
    contenidorPrincipal.appendChild(el);
  });
}

let draggedRankItem = null;

function handleRankDragStart(e) {
  draggedRankItem = e.target;
  e.dataTransfer.setData("text/plain", e.target.dataset.rank);
  e.dataTransfer.effectAllowed = "move";
}

espais.forEach(slot => {
  slot.addEventListener("dragover", e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });

  slot.addEventListener("drop", e => {
    e.preventDefault();
    if (!draggedRankItem) return;

    if (slot.children.length > 1) return;

    const itemRank = parseInt(draggedRankItem.dataset.rank);
    const slotRank = parseInt(slot.dataset.rank);

    slot.appendChild(draggedRankItem);

    if (itemRank === slotRank) {
      slot.classList.add("correct-slot");
      slot.classList.remove("incorrect-slot");
      draggedRankItem.draggable = false;
      ContadorCorrectes++;
      checkRankingWin();
    } else {
      slot.classList.add("incorrect-slot");
      slot.classList.remove("correct-slot");
      misstgeRanking.textContent = "❌ Mira les pistes i torna a intentar-ho.";
      misstgeRanking.style.color = "red";
    }
  });
});

contenidorPrincipal.addEventListener("dragover", e => e.preventDefault());
contenidorPrincipal.addEventListener("drop", e => {
  e.preventDefault();
  if (draggedRankItem && draggedRankItem.parentElement.classList.contains("rank-slot")) {
    const oldSlot = draggedRankItem.parentElement;
    contenidorPrincipal.appendChild(draggedRankItem);
    oldSlot.classList.remove("correct-slot", "incorrect-slot");
  }
});

function checkRankingWin() {
  if (ContadorCorrectes === 6) {
    misstgeRanking.textContent = "Perfecte! Has ordenat correctament les activitats més contaminants.";
    misstgeRanking.style.color = "green";
    tornar_a_jugar_boto.style.display = "inline-block";
  } else {
    misstgeRanking.textContent = "";
  }
}

tornar_a_jugar_boto.addEventListener("click", initRankingGame);

initRankingGame();
