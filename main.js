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
import { revealBig, revealSmall, shuffleWheelLetters } from "./src/lib/userActions.js";

const shuffleButton = document.querySelector('[data-action="shuffle"]');
const revealSmallButton = document.querySelector('[data-action="revealSmall"]');
const revealBigButton = document.querySelector('[data-action="revealBig"]'); // Cambia el selector según corresponda



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

const getCoords = (iniX, iniY, direction, index) => {


  let x = iniX;
  let y = iniY;

  if (direction == "horizontal") {
    x += index;
  } else if (direction == "vertical") {
    y += index;
  }

  return [x, y];

};

const rellenarLetra = (x, y, letra) => {
  const letraElem = document.querySelector(`.letter[data-position="${x} / ${y}"]`);
  if (letraElem) {
    letraElem.textContent = letra;
  }
};

const marcarPalabra = (palabra, game) => {

  try {

    const { direction, origin } = game.findWord(palabra);
    const [startX, startY] = origin;

    for (let i = 0; i < palabra.length; i++) {
      const [x, y] = getCoords(startX, startY, direction, i);
      rellenarLetra(x, y, palabra[i]);
    }


  } catch (error) {

    if (error instanceof WordNotFound) {
      console.log(`No existe la palabra: "${palabra}"`);
    } else {
      console.log("Error:", error);
    }
  }
};


let game
/* TODO: parametrizar new Game*/
const initializeGame = () => {
  game = new Game(2);  
  

  generateCasillas(game);
  generarWheelLetters(game);

  //Todo: refactor palabra
  marcarPalabra("cebar", game);
};

document.addEventListener("DOMContentLoaded", () => {
  initializeGame();
});




/* USER ACTION */
shuffleButton.addEventListener('click', shuffleWheelLetters);
revealSmallButton.addEventListener('click', () => {
  revealSmall(game); 
});

revealBigButton.addEventListener('click', () => {
  revealBig(game); 
});