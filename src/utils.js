import center from "./lib/center.js";

const calculateMaxColumn = (wordPositions) => {
  let maxColumn = 0;

  for (let i = 0; i < wordPositions.length; i++) {
    const pos = wordPositions[i];

    if (pos.direction === "horizontal") {
      const finalColumn = pos.origin[0] + pos.length - 1;
      if (finalColumn > maxColumn) {
        maxColumn = finalColumn;
      }
    } else {
      const originColumn = pos.origin[0];
      if (originColumn > maxColumn) {
        maxColumn = originColumn;
      }
    }
  }

  return maxColumn;
};

const calculateMaxRow = (wordPositions) => {
  let maxRow = 0; 


  for (let i = 0; i < wordPositions.length; i++) {
    const pos = wordPositions[i];

    if (pos.direction === "vertical") {
      const finalRow = pos.origin[1] + pos.length - 1;
      if (finalRow > maxRow) {
        maxRow = finalRow;
      }
    } else {
     
      const originRow = pos.origin[1];
      if (originRow > maxRow) {
        maxRow = originRow;
      }
    }
  }

  return maxRow; 
};

export const resetElement = (element) => {
  const target = document.querySelector(element);

  if (target) {
    target.innerHTML = "";
  } else {
    console.warn(`Elemento no encontrado: ${element}`);
  }
};

export const appendCasillas = (gridSelector, letterDiv) => {
  const grid = document.querySelector(gridSelector);

  if (!grid) {
    console.warn(`Elemento no encontrado: ${grid}`);
  }

  grid.appendChild(letterDiv);
};

export const createLetterDiv = (x, y, i, direction, letter) => {
  const letterDiv = document.createElement("div");
  letterDiv.classList.add("letter");

  if (direction === "horizontal") {
    // Si es horizonal, cambiamos la columna
    letterDiv.style.gridArea =
      y + 1 + " / " + (x + i + 1) + " / " + (y + 1) + " / " + (x + i + 2);
    letterDiv.setAttribute('data-position', `${x + i} / ${y}`);  // Guardamos la posición en data-attribute
  } else if (direction === "vertical") {
    // Si es horizonal, cambiamos la fila
    letterDiv.style.gridArea =
      y + i + 1 + " / " + (x + 1) + " / " + (y + i + 2) + " / " + (x + 1);
    letterDiv.setAttribute('data-position', `${x} / ${y + i}`);  // Guardamos la posición en data-attribute
  }
  letterDiv.textContent = letter;

  return letterDiv;
};

export const calculosGridSize = (wordPositions) => {


    
  const maxColumn = calculateMaxColumn(wordPositions);
  const maxRow = calculateMaxRow(wordPositions);

  //Ajustamos la position del array
  const gridWidth = maxColumn + 1;
  const gridHeight = maxRow + 1;
  
  const [despX, despY] = center(maxColumn, maxRow, gridWidth, gridHeight);

  return { maxColumn, maxRow, gridWidth, gridHeight, despX, despY };
};


export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}



export const rellenarLetra = (x, y, letra) => {
  
  const letraElems  = document.querySelectorAll(`.letter[data-position="${x} / ${y}"]`);

  
  letraElems.forEach(letraElem => {
    letraElem.textContent = letra;
  });
};
