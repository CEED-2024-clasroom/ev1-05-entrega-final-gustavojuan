import "./style.css";
import "./src/lib/fontawesome.js";

import { Game } from "./src/lib/Game.js";
import calculateLetterPositions from "./src/lib/letter_positions.js";

import {
  appendCasillas,
  calculosGridSize,
  createLetterDiv,
  resetElement,
} from "./src/utils.js";

import { handleLetterClick } from "./src/mouseEvents.js";
import { revealBig, revealSmall, shuffleWheelLetters } from "./src/userActions.js";
import { setGame } from "./src/game.js";
import { help } from "./src/help.js";

const shuffleButton = document.querySelector('[data-action="shuffle"]');
const revealSmallButton = document.querySelector('[data-action="revealSmall"]');
const revealBigButton = document.querySelector('[data-action="revealBig"]'); // Cambia el selector según corresponda

const helpButton = document.querySelector('[data-action="help"]'); // Cambia el selector según corresponda


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



let game
/* TODO: parametrizar new Game*/
const initializeGame = () => {
  game = new Game(1);  
  setGame(game) 
  generateCasillas(game);
  generarWheelLetters(game); 

};

document.addEventListener("DOMContentLoaded", () => {
  initializeGame();
});




/* USER ACTIONS */
shuffleButton.addEventListener('click', shuffleWheelLetters);
revealSmallButton.addEventListener('click', () => {
  revealSmall(game); 
});
revealBigButton.addEventListener('click', () => {
  revealBig(game); 
});

helpButton.addEventListener('click', (event) => {
  event.stopPropagation();
  help();
});