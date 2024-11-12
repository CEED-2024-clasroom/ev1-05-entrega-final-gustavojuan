import { getElementCenter, lengthAndAngle } from './line_position.js';

let currentLine = null;
let selectedLetter = null;




const  markPoint = (x, y, color = 'red')=> {
    
    const point = document.createElement('div');
    point.classList.add('marker');    
    point.style.backgroundColor = color;    
    point.style.left = `${x}px`;
    point.style.top = `${y}px`;    
    document.body.appendChild(point);
}



const updateLinePosition = (start, end) => {
    const origin = [start.x, start.y];
    const destination = [end.x, end.y];

    // marcarPunto(end.x, end.y); 

    const { length, angle } = lengthAndAngle(origin, destination);

    if (currentLine) {
        currentLine.style.width = `${length}px`;
        currentLine.style.transform = `rotate(${angle}deg)`;

        
        if (!currentLine.style.left && !currentLine.style.top) {
            currentLine.style.left = `${start.x}px`;
            currentLine.style.top = `${start.y}px`;
        }
    }
};



const handleMouseMove = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const letterCenter = getElementCenter(selectedLetter);
  
    updateLinePosition(letterCenter, { x: mouseX, y: mouseY });
};


const createInitialLine = (event) => {

    const letterCenter = getElementCenter(selectedLetter);
    

    
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    currentLine = document.createElement('div');
    currentLine.classList.add('line');
    

 
    updateLinePosition(letterCenter, { x: mouseX, y: mouseY });

    document.body.appendChild(currentLine);
};


const handleMouseUp = () => {



    if (selectedLetter) {
        selectedLetter.classList.remove('selected');
        selectedLetter = null;
    }
    if (currentLine) {
        currentLine.remove();
        currentLine = null;
    }
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
};



export const handleLetterClick = (event) => {

    if (selectedLetter) return;

    selectedLetter = event.currentTarget;
    selectedLetter.classList.add('selected');  
   

    createInitialLine(event);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
};




/* Esta es una funcion segun gpt  mara debugear el punto ya que me daba problemas */

function marcarPunto(x, y) {
    // Crear un elemento div que representará el punto
    const punto = document.createElement("div");

    punto.classList.add('punti');

    // Aplicar estilos para que el punto sea visible
    punto.style.width = "10px";
    punto.style.height = "10px";
    punto.style.backgroundColor = "red";
    punto.style.position = "absolute";
    punto.style.borderRadius = "50%";
    punto.style.left = `${x}px`;
    punto.style.top = `${y}px`;
    punto.style.zIndex= 99999;

    // Añadir el punto al cuerpo del documento
    document.body.appendChild(punto);
}


