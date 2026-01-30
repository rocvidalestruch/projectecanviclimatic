/* -------------------------------------------------------------------------- */
/*                          POLLUTION RANKING GAME                            */
/* -------------------------------------------------------------------------- */

const rankingData = [
  { rank: 1, emoji: "🚗", text: "Moltes persones la fan servir cada dia i provoca gasos." },
  { rank: 2, emoji: "🛵", text: "Ràpides, petites, però també deixen gasos a l'aire." },
  { rank: 3, emoji: "🏗️", text: "Grans màquines construeixen edificis i generen pols." },
  { rank: 4, emoji: "❄️🔥", text: "Els edificis consumeixen molta electricitat per climatitzar-se." },
  { rank: 5, emoji: "🏬", text: "Botigues i restaurants utilitzen llum i electrodomèstics constants." },
  { rank: 6, emoji: "🍳", text: "Cuinar a casa o terrats genera fums i gasos locals." }
];

const sourceContainer = document.getElementById("sourceContainer");
const rankingMessage = document.getElementById("rankingMessage");
const resetRankingBtn = document.getElementById("resetRankingBtn");
const slots = document.querySelectorAll(".rank-slot");
let rankedCorrectlyCount = 0;

function initRankingGame() {
  sourceContainer.innerHTML = "";
  rankingMessage.textContent = "";
  rankingMessage.style.color = "black";
  resetRankingBtn.style.display = "none";
  rankedCorrectlyCount = 0;

  // Clear slots (except the number)
  slots.forEach(slot => {
    // Keep only the rank-number span
    const numberSpan = slot.querySelector(".rank-number");
    slot.innerHTML = "";
    slot.appendChild(numberSpan);
    slot.classList.remove("correct-slot", "incorrect-slot");
  });

  // Shuffle and create items
  const shuffledData = [...rankingData].sort(() => Math.random() - 0.5);

  shuffledData.forEach(item => {
    const el = document.createElement("div");
    el.classList.add("rank-item");
    el.draggable = true;
    el.dataset.rank = item.rank;
    el.innerHTML = `<span class="rank-emoji">${item.emoji}</span>${item.text}`;

    el.addEventListener("dragstart", handleRankDragStart);
    sourceContainer.appendChild(el);
  });
}

let draggedRankItem = null;

function handleRankDragStart(e) {
  draggedRankItem = e.target;
  e.dataTransfer.setData("text/plain", e.target.dataset.rank);
  e.dataTransfer.effectAllowed = "move";
}

// Slot Events
slots.forEach(slot => {
  slot.addEventListener("dragover", e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });

  slot.addEventListener("drop", e => {
    e.preventDefault();
    if (!draggedRankItem) return;

    // If slot is already full, don't allow drop (optional, but good for UI)
    if (slot.children.length > 1) return;

    const itemRank = parseInt(draggedRankItem.dataset.rank);
    const slotRank = parseInt(slot.dataset.rank);

    // Append item to slot
    slot.appendChild(draggedRankItem);

    // Feedback
    if (itemRank === slotRank) {
      slot.classList.add("correct-slot");
      slot.classList.remove("incorrect-slot");
      draggedRankItem.draggable = false; // Lock it
      rankedCorrectlyCount++;
      checkRankingWin();
    } else {
      slot.classList.add("incorrect-slot");
      slot.classList.remove("correct-slot");
      rankingMessage.textContent = "❌ Mira les pistes i torna a intentar-ho.";
      rankingMessage.style.color = "red";

      // Return item to source after a delay if wrong? Or let user drag it out?
      // Let's let user drag it out or auto-return.
      // For this specific design, "Mira les pistes" implies try again.
      // We will make it draggable out of the slot back to source or another slot.
    }
  });
});

// Allow returning items to source
sourceContainer.addEventListener("dragover", e => e.preventDefault());
sourceContainer.addEventListener("drop", e => {
  e.preventDefault();
  if (draggedRankItem && draggedRankItem.parentElement.classList.contains("rank-slot")) {
    const oldSlot = draggedRankItem.parentElement;
    sourceContainer.appendChild(draggedRankItem);
    oldSlot.classList.remove("correct-slot", "incorrect-slot");
  }
});

function checkRankingWin() {
  if (rankedCorrectlyCount === 6) {
    rankingMessage.textContent = "✅ Perfecte! Has ordenat correctament les activitats més contaminants.";
    rankingMessage.style.color = "green";
    resetRankingBtn.style.display = "inline-block";
  } else {
    rankingMessage.textContent = "";
  }
}

resetRankingBtn.addEventListener("click", initRankingGame);

// Initialize on load
initRankingGame();
