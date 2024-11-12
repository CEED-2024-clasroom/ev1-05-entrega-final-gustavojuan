import "./style.css";
import "./src/lib/fontawesome.js";

import { Game, WordNotFound } from "./src/lib/Game.js";
import calculateLetterPositions from "./src/lib/letter_positions.js";

import {
  appendCasillas,
  calculosGridSize,
  createLetterDiv,
  resetElement,
} from "./src/lib/utils.js";

import { handleLetterClick } from "./src/lib/mouseEvents.js";

const generateCasillas = (game) => {
  //Limpiamos Grid
  resetElement("#grid");

  //obtenemos datos que vamos utilizar
  const { despX, despY } = calculosGridSize(game.wordPositions);

  //poblamos
  game.wordPositions.forEach((value) => {
    const { direction, origin, length } = value;
    const [x, y] = origin;

    for (let i = 0; i < length; i++) {
      let letterDiv = createLetterDiv(x + despX, y + despY, i, direction);
      appendCasillas("#grid", letterDiv);
    }
  });
};

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
    letterDiv.style.left = pos.left;
    letterDiv.style.top = pos.top;

    appendCasillas("#wheel", letterDiv);

    letterDiv.addEventListener("mousedown", handleLetterClick);
  });
};

/* TODO: parametrizar new Game*/
const initializeGame = () => {
  const game = new Game(2);
  debugger;

  generateCasillas(game);
  generarWheelLetters(game);

  //Todo: refactor palabra
  marcarPalabra("cebar", game);
};

document.addEventListener("DOMContentLoaded", () => {
  initializeGame();
});

const marcarPalabra = (palabra, game) => {
  try {
    const wordPosition = game.findWord(palabra);

    const { direction, origin } = wordPosition;

    const [startX, startY] = origin;

    for (let i = 0; i < palabra.length; i++) {
      let x = startX;
      let y = startY;

      if (direction === "horizontal") {
        x += i;
      } else if (direction === "vertical") {
        y += i;
      }

      const letterElement = document.querySelector(
        `.letter[data-position="${x} / ${y}"]`
      );

      if (letterElement) {
        letterElement.textContent = palabra[i];
      }
    }
  } catch (error) {
    if (error instanceof WordNotFound) {
      console.log(`La palabra "${palabra}" no se encontró en el juego.`);
    } else {
      console.error("Error inesperado:", error);
    }
  }
};
