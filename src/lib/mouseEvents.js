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
    
    
    const { length, angle } = lengthAndAngle(origin, destination);

    console.log("length and angle:", length);
    



    if (currentLine) {
        currentLine.style.width = `${length}px`;
        currentLine.style.lefto = `${start.x}px`;
        currentLine.style.top = `${start.y}px`;
        currentLine.style.transform = `rotate(${angle}deg)`;
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

    document.getElementById("wheel").appendChild(currentLine);
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


    
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    markPoint(mouseX,mouseY,'green')

    createInitialLine(event);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
};


