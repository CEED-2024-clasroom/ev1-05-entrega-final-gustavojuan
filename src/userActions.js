import { getGame } from "./game";
import { rellenarLetra } from "./utils";
// Devuelve la letra en la posición (x, y) del tablero
export const getLetterAt = (x, y) => {
  const game = getGame();  // Obtener el objeto de juego
  
  // Asegurarnos de que las coordenadas (x, y) están dentro del tablero
  if (x >= 0 && x < game.board.length) {
    const row = game.board[x];
    if (Array.isArray(row) && y >= 0 && y < row.length) {
      return game.letterAt(x, y);  // Asumiendo que game.letterAt(x, y) devuelve la letra
    }
  }
  
  
  return null;  // Si no se encuentra la letra, se devuelve null
};



export  const getLetterCoordinates = (letterDiv) => {
  // Asegúrate de que el div tiene el atributo 'data-position'
  const position = letterDiv.getAttribute('data-position');

  if (!position) {
    console.error("El div no tiene el atributo 'data-position'.");
    return null;  // Si no tiene el atributo, devolvemos null
  }

  // Asumimos que la posición está en formato "x / y"
  const [x, y] = position.split('/').map(coord => parseInt(coord.trim()));

  if (isNaN(x) || isNaN(y)) {
    console.error("Las coordenadas extraídas no son válidas.");
    return null;  // Si las coordenadas no son válidas, devolvemos null
  }

  return { x, y };
};



export const  shuffleWheelLetters = ()  =>{
  
    const letters = Array.from(document.querySelectorAll('.wheel-letter'));    
    
    const positions = letters.map(letter => ({
      left: letter.style.left,
      top: letter.style.top,
    }));
  
    
    //sacado de intenet
    positions.sort(() => Math.random() - 0.5);  
    
    letters.forEach((letter, index) => {
      letter.style.left = positions[index].left;
      letter.style.top = positions[index].top;
      letter.classList.add('mix-animation');
    });  
    
    window.setTimeout(() => {
      letters.forEach(letter => letter.classList.remove('mix-animation'));
    }, 500);  
  }
  


  

//Obtiene las posiciones de las letras


const getAllLettersPositions = (game) => {
  const allLettersPositions = [];

  for (let x = 0; x < game.board.length; x++) {
    const row = game.board[x];

    if (!Array.isArray(row)) {
      console.error(`La fila ${x} no está correctamente definida.`);
      continue;
    }

    row.forEach((_, y) => {
      const letter = game.letterAt(x, y);
      if (letter) {
        allLettersPositions.push([x, y, letter]);
      }
    });
  }

  return allLettersPositions;
};



  /* TODO: unir getRandomLetter y getRandomLetters */

  /* TODO:  getRandomLetter */
  // DEvuelve una posoiton de una letra randmom 
  const getRandomLetter = (allLettersPositions) => {
    const randomIndex = Math.floor(Math.random() * allLettersPositions.length);
    return allLettersPositions[randomIndex];
  };
  

  
  const getRandomLetters = (positions, numToReveal) => {
    const revealedLetters = [];
    /* Copiamos el aarray*/
    const availablePositions = [...positions]; 

    /* Mientras tengamos algo que revelar pusheamos*/  
    while (revealedLetters.length < numToReveal && availablePositions.length > 0) {

      const randomIndex = Math.floor(Math.random() * availablePositions.length);
      const [x, y, letter] = availablePositions.splice(randomIndex, 1)[0]; 
      revealedLetters.push([x, y, letter]);
    }
  
    return revealedLetters;
  };
  

  //Muestra una letra en dado su div y la letra
  const revealLetterInDiv = (x, y, letter) => {
    const letterDiv = document.querySelector(`[data-position='${x} / ${y}']`);
    if (letterDiv) {
      letterDiv.textContent = letter;
    }
  };
  
  // Funció principal
  export const revealSmall = (game) => {

    //Obtenemos todas las posiciones de las letras
    const allLettersPositions = getAllLettersPositions(game);  

    //Cogemos una letra al azar
    const [x, y, letter] = getRandomLetter(allLettersPositions);  

    //Rvelamos la letra en su casilla
    revealLetterInDiv(x, y, letter);

  };
  
  
  


  const revealLettersOnBoard = (revealedLetters) => {
    revealedLetters.forEach(([x, y, letter]) => {
      rellenarLetra(x, y, letter)
    });
  };
  
  
  
  export const revealBig = (game) => {
    const allLettersPositions = getAllLettersPositions(game);

    if (allLettersPositions.length === 0) {
      console.error("No hay letras para revelar");
      return;
    }
  

    /* TODO: REFACTOR numero magico */
    const numToReveal = Math.min(5, allLettersPositions.length);


    const revealedLetters = getRandomLetters(allLettersPositions, numToReveal);
  
    revealLettersOnBoard(revealedLetters);
  };
  