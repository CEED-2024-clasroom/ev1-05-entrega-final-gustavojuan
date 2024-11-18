
export const  shuffleWheelLetters = ()  =>{
  
    const letters = Array.from(document.querySelectorAll('.wheel-letter'));    
    
    const positions = letters.map(letter => ({
      left: letter.style.left,
      top: letter.style.top,
    }));
  
    
    positions.sort(() => Math.random() - 0.5);  
    
    letters.forEach((letter, index) => {
      letter.style.left = positions[index].left;
      letter.style.top = positions[index].top;
      letter.classList.add('mix-animation');
    });  
    
    window.setTimeout(() => {
      letters.forEach(letter => letter.classList.remove('mix-animation'));
    }, 500);   }
  


  

//Obtiene las posiciones de las letras


const getAllLettersPositions = (game) => {
    const allLettersPositions = [];
  
    for (let x = 0; x < game.board.length; x++) {
      for (let y = 0; y < game.board[x].length; y++) {
        const letter = game.letterAt(x, y);
        
        if (letter && letter !== '') {
          allLettersPositions.push([x, y, letter]);
        }
      }
    }
  
    return allLettersPositions;
  };
  
  // DEvuelve una posoiton de una letra randmom
  const getRandomLetter = (allLettersPositions) => {
    const randomIndex = Math.floor(Math.random() * allLettersPositions.length);
    return allLettersPositions[randomIndex];
  };
  

  // Obtener letras aleatorias de 5
const getRandomLetters = (positions, numToReveal) => {
    const revealedLetters = [];
  
    while (revealedLetters.length < numToReveal) {
      const randomIndex = Math.floor(Math.random() * positions.length);
      const [x, y, letter] = positions[randomIndex];
  
      // Evitar revelar letras repetidas
      if (!revealedLetters.some(([rx, ry]) => rx === x && ry === y)) {
        revealedLetters.push([x, y, letter]);
      }
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
  
  // Función principal
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
      const letterDiv = document.querySelector(`[data-position='${x} / ${y}']`);
      if (letterDiv) {
        letterDiv.textContent = letter;
      }
    });
  };
  
  
  
  export const revealBig = (game) => {
    const allLettersPositions = getAllLettersPositions(game);

    if (allLettersPositions.length === 0) {
      console.log("No hay letras para revelar");
      return;
    }
  
    const numToReveal = Math.min(5, allLettersPositions.length);
    const revealedLetters = getRandomLetters(allLettersPositions, numToReveal);
  
    revealLettersOnBoard(revealedLetters);
  };
  