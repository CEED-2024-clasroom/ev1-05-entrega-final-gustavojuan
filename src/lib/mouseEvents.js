import { getElementCenter, lengthAndAngle } from './line_position.js';

let currentLine = null;
let selectedLetter = null;


const updateLinePosition = (start, end) => {
 

  
    const origin = [start.x, start.y];
    const destination = [end.x, end.y];
    
    
    const { length, angle } = lengthAndAngle(origin, destination);

    console.log("length and angle:", length);
    



    if (currentLine) {
        currentLine.style.width = `${length}px`;
        currentLine.style.lefto = `${start.x}px`;
        currentLine.style.top = `${start.y}px`;
        currentLine.style.transform = `rotate(${angle}deg)`;
    }
};

// Maneja el movimiento del ratón para actualizar la línea
const handleMouseMove = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const letterCenter = getElementCenter(selectedLetter);
  
    updateLinePosition(letterCenter, { x: mouseX, y: mouseY });
};

// Crea la línea inicial desde el centro de la letra hasta el ratón
const createInitialLine = (event) => {
    const letterCenter = getElementCenter(selectedLetter);


    
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    currentLine = document.createElement('div');
    currentLine.classList.add('line');



    updateLinePosition(letterCenter, { x: mouseX, y: mouseY });

    document.getElementById("wheel").appendChild(currentLine);
};

// Limpiar selección y eliminar la línea cuando se suelta el ratón
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

// Manejar clic en una letra
export const handleLetterClick = (event) => {
    if (selectedLetter) return;

    selectedLetter = event.currentTarget;
    selectedLetter.classList.add('selected');


    
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    markPoint(mouseX,mouseY,'green')

    createInitialLine(event);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
};


function markPoint(x, y, color = 'red') {
    // Crear un elemento div para el punto
    const point = document.createElement('div');
    point.classList.add('marker');

    // Establecer el color del punto
    point.style.backgroundColor = color;

    // Establecer la posición del punto
    point.style.left = `${x}px`;
    point.style.top = `${y}px`;

    // Añadir el punto al documento
    document.body.appendChild(point);
}
