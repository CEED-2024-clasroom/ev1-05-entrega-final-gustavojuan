
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
  


  

export const revealSmall = (game) => {
    
    const allLettersPositions = [];
  
    
    game.board.forEach((row, x) => {
      row.forEach((letter, y) => {
        
        if (letter && letter !== '') {
          allLettersPositions.push([x, y, letter]);
        }
      });
    }); 

  
    
    const randomIndex = Math.floor(Math.random() * allLettersPositions.length);
    const [x, y, letter] = allLettersPositions[randomIndex];      
    const letterDiv = document.querySelector(`[data-position='${x} / ${y}']`);

    if (letterDiv) {
      letterDiv.textContent = letter;
    }
  };