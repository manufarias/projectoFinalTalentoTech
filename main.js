const decreaseButtons = document.querySelectorAll(".decrease.Qty");
const increaseButtons = document.querySelectorAll(".increase.Qty");
const actualQtySpans = document.querySelectorAll(".actual.Qty");
const carritoItems = document.getElementById("carrito-items");
const carritoTotal = document.getElementById("carrito-total");
const confirmarCompraButton = document.getElementById("confirmar-compra");
const vaciarCarritoButton = document.querySelector(".vaciar");

// Inicializar carrito desde localStorage o crear uno vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || {};

// Función para actualizar el pedido
function actualizarCarrito() {
  carritoItems.innerHTML = "";
  let totalItems = 0;

  for (const item in carrito) {
    if (carrito[item] > 0) {
      const listaItem = document.createElement("li");
      listaItem.textContent = `${item} x ${carrito[item]}`;
      carritoItems.appendChild(listaItem);
      totalItems += carrito[item];
    }
  }

  carritoTotal.textContent = totalItems;
  confirmarCompraButton.textContent = `Confirmar Compra de ${totalItems} cafés`;

  // Visibilidad del carrito solo cuando posee al menos un item en el pedido
  const carritoDiv = document.querySelector(".carrito");
  const wrapperDiv = document.querySelector(".wrapper");

  carritoDiv.classList.toggle("visible", totalItems > 0);
  wrapperDiv.classList.toggle("visible", totalItems > 0);

  // Guardar el pedido en el localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Botones para añadir o quitar cafés del pedido
decreaseButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const coffeeName = button
      .closest(".producto")
      .querySelector(".producto__nombre")
      .textContent.trim();
    if (carrito[coffeeName] > 0) {
      carrito[coffeeName]--;
      actualQtySpans[index].textContent = carrito[coffeeName];
      actualizarCarrito();
    }
  });
});

increaseButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const coffeeName = button
      .closest(".producto")
      .querySelector(".producto__nombre")
      .textContent.trim();
    carrito[coffeeName] = (carrito[coffeeName] || 0) + 1;
    actualQtySpans[index].textContent = carrito[coffeeName];
    actualizarCarrito();
  });
});

// Elimina el pedido actual y el carrito
vaciarCarritoButton.addEventListener("click", () => {
  carrito = {};
  actualQtySpans.forEach((span) => {
    span.textContent = 0;
  });
  actualizarCarrito();
});

actualizarCarrito();
