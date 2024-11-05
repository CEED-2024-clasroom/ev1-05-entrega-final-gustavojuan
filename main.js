//importacion de assets
import "./style.css";
import "./src/lib/fontawesome.js";

//importacion de utiles y funcionalidades
import { Game } from "./src/lib/Game.js";
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

const  generarWheelLetters = (game) => {
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

    letterDiv.addEventListener('mousedown', handleLetterClick);
    
  });
}





/* TODO: parametrizar new Game*/
const initializeGame = () => {
  const game = new Game(1);
  generateCasillas(game);
  generarWheelLetters(game);
};

document.addEventListener("DOMContentLoaded", () => {
  initializeGame();
});
