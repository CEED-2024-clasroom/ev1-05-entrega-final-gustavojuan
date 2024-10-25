import "./style.css";
import { Game } from "./src/lib/Game.js";
import "./src/lib/fontawesome.js";
import {
  appendCasillas,
  createLetterDiv,
  resetElement,
} from "./src/lib/utils.js";

function generateCasillas(game) {
  resetElement("#grid");

  //Iterar para cada una de las posiciones

  game.wordPositions.forEach((value) => {
    const { direction, origin, length } = value;
    const [x, y] = origin;

    for (let i = 0; i < length; i++) {
      let letterDiv = createLetterDiv(x, y, i, direction);
      appendCasillas("#grid", letterDiv);
    }
  });
}

// Inicializar el juego
function initializeGame() {
  const game = new Game(4);
  generateCasillas(game);
}

// Espera a que el DOM esté listo antes de inicializar el juego
document.addEventListener("DOMContentLoaded", () => {
  initializeGame(); // Cambia el ID según sea necesario
});
