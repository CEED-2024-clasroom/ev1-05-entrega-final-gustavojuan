// Importación de assets
import "./style.css";
import "./src/lib/fontawesome.js";

// Importación de utilidades y funcionalidades
import { Game } from "./src/lib/Game.js";
import calculateLetterPositions from "./src/lib/letter_positions.js"; // Importar la función
import {
  appendCasillas,
  calculosGridSize,
  createLetterDiv,
  resetElement,
} from "./src/lib/utils.js";

import { 
  handleLetterClick, 
  handleMouseMove, 
  handleMouseOver, 
  handleMouseUp 
} from './src/lib/mouseEvents.js'; // Importar las funciones de eventos del ratón

// Generar casillas en el grid
const generateCasillas = (game) => {
  resetElement("#grid");

  const { despX, despY } = calculosGridSize(game.wordPositions);

  game.wordPositions.forEach((value) => {
    const { direction, origin, length } = value;
    const [x, y] = origin;

    for (let i = 0; i < length; i++) {
      let letterDiv = createLetterDiv(x + despX, y + despY, i, direction);
      appendCasillas("#grid", letterDiv);
    }
  });
};

// Generar letras en la rueda
const generarWheelLetters = (game) => {
  resetElement("#wheel");

  const letters = game.letters.split("");
  const numLetters = letters.length;
  const positions = calculateLetterPositions(numLetters);

  letters.forEach((letter, index) => {
    const letterDiv = document.createElement("div");
    letterDiv.classList.add("wheel-letter");
    letterDiv.textContent = letter;

    const pos = positions[index];
    letterDiv.style.left = pos.left; // Asignar left
    letterDiv.style.top = pos.top; // Asignar top

    appendCasillas("#wheel", letterDiv);
    
    // Agregar eventos a cada letra
    letterDiv.addEventListener('mousedown', handleLetterClick);
    letterDiv.addEventListener('mouseover', handleMouseOver);
  });
};

// Iniciar el juego
const initializeGame = () => {
  const game = new Game();
  generateCasillas(game);
  generarWheelLetters(game);
};

document.addEventListener("DOMContentLoaded", () => {
  initializeGame();
  document.addEventListener('mouseup', handleMouseUp); // Manejar el mouseup en el documento
});
