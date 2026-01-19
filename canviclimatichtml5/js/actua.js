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
    } else {
      message.textContent = "Ups, aquest no és el contenidor correcte.";
      message.style.color = "red";
    }

    if (correctCount === 5) {
      message.textContent = "🎉 Has reciclat tot correctament!";
      message.style.color = "green";
    }
  });
});
