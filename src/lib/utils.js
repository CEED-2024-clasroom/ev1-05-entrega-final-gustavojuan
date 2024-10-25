export const resetElement = (element) => {
  const target = document.querySelector(element);

  if (target) {
    target.innerHTML = "";
  } else {
    console.warn(`Elemento no encontrado: ${element}`);
  }
};

export const appendCasillas = (gridSelector, casillas) => {
  const grid = document.querySelector(gridSelector);

  if (!grid) {
    console.warn(`Elemento no encontrado: ${grid}`);
  }

  grid.appendChild(casillas);
};

export const createLetterDiv = (x, y, i, direction) => {
  const letterDiv = document.createElement("div");
  letterDiv.classList.add("letter");

  if (direction === "horizontal") {
    // Si es horizonal, cambiamos la columna
    letterDiv.style.gridArea =
      y + 1 + " / " + (x + i + 1) + " / " + (y + 1) + " / " + (x + i + 2);
  } else if (direction === "vertical") {
    // Si es horizonal, cambiamos la fila
    letterDiv.style.gridArea =
      y + i + 1 + " / " + (x + 1) + " / " + (y + i + 2) + " / " + (x + 1);
  }

  return letterDiv;
};
