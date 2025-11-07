const items = document.querySelectorAll(".item");
const bins = document.querySelectorAll(".bin");
const message = document.getElementById("message");
let correctCount = 0;

items.forEach(item => {
  item.addEventListener("dragstart", e => {
    e.dataTransfer.setData("type", e.target.dataset.type);
  });
});

bins.forEach(bin => {
  bin.addEventListener("dragover", e => e.preventDefault());
  bin.addEventListener("drop", e => {
    const type = e.dataTransfer.getData("type");
    if (e.target.id === type) {
      e.target.classList.add("success");
      correctCount++;
      message.textContent = "¡Correcto!";
      message.style.color = "green";
      document.querySelector(`.item[data-type='${type}']`).remove();
    } else {
      message.textContent = "Ups, ese no es el contenedor correcto.";
      message.style.color = "red";
    }

    if (correctCount === 5) {
      message.textContent = "🎉 ¡Has reciclado todo correctamente!";
      message.style.color = "green";
    }
  });
});
