const itemsContainer = document.querySelector(".items");
const itemsList = Array.from(itemsContainer.children);

// Aleatoritzar l'ordre dels elements (Fisher-Yates shuffle)
for (let i = itemsList.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [itemsList[i], itemsList[j]] = [itemsList[j], itemsList[i]];
}

// Reordenar al DOM
itemsList.forEach(item => itemsContainer.appendChild(item));

const items = document.querySelectorAll(".item");
const bins = document.querySelectorAll(".bin");
const message = document.getElementById("message");
let correctCount = 0;

let draggedItem = null;

items.forEach(item => {
  item.addEventListener("dragstart", e => {
    draggedItem = item;
    e.dataTransfer.setData("type", e.target.dataset.type);
  });

  item.addEventListener("dragend", () => {
    draggedItem = null;
  });
});

// Check for previous game completion
if (localStorage.getItem("gameCompleted") === "true") {
  const completionMsg = document.createElement("p");
  completionMsg.textContent = "🏆 Ja has completat el joc anteriorment! Segueix així!";
  completionMsg.style.color = "gold";
  completionMsg.style.fontWeight = "bold";
  message.parentNode.insertBefore(completionMsg, message);
}

// Restore game state from sessionStorage
const savedState = JSON.parse(sessionStorage.getItem("gameState"));
if (savedState) {
  correctCount = savedState.correctCount || 0;
  if (savedState.recycledItems) {
    savedState.recycledItems.forEach(type => {
      // Find the first item of this type that hasn't been recycled yet
      const itemToRemove = Array.from(items).find(i => i.dataset.type === type && document.body.contains(i));
      if (itemToRemove) itemToRemove.remove();
    });
  }
}

bins.forEach(bin => {
  bin.addEventListener("dragover", e => e.preventDefault());


  bin.addEventListener("drop", e => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    if (e.currentTarget.id === type) {
      e.currentTarget.classList.add("success");
      correctCount++;
      message.textContent = "Correcte!";
      message.style.color = "green";

      if (draggedItem) {
        draggedItem.remove();
      }

      // Save state to sessionStorage
      const currentRecycled = JSON.parse(sessionStorage.getItem("gameState") || '{"recycledItems":[]}').recycledItems || [];
      currentRecycled.push(type);
      sessionStorage.setItem("gameState", JSON.stringify({
        correctCount: correctCount,
        recycledItems: currentRecycled
      }));

    } else {
      message.textContent = "Ups, aquest no és el contenidor correcte.";
      message.style.color = "red";
    }

    if (correctCount === 5) {
      message.textContent = "🎉 Has reciclat tot correctament!";
      message.style.color = "green";

      // Save completion to localStorage
      localStorage.setItem("gameCompleted", "true");
      // Clear session progress as game is done
      sessionStorage.removeItem("gameState");
    }
  });
});
