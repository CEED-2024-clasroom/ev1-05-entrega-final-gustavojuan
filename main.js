//importacion de assets
import "./style.css";
import "./src/lib/fontawesome.js";

//importacion de utiles y funcionalidads
import { Game } from "./src/lib/Game.js";

import {
  appendCasillas,
  calculosGridSize,
  createLetterDiv,
  resetElement,
} from "./src/lib/utils.js";

const  generateCasillas = (game) => {

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
}

// Iniciar el juego
const initializeGame = () => {
  const game = new Game(3);
  generateCasillas(game);
}

document.addEventListener("DOMContentLoaded", () => {
  initializeGame();
});
