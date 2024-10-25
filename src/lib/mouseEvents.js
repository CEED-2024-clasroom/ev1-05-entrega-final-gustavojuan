import { getElementCenter, lengthAndAngle } from './line_position.js'; // Asegúrate de que la ruta sea correcta

let currentLine = null; // Línea actual
let selectedLetter = null; // Letra seleccionada


// Manejar el movimiento del ratón
export const handleMouseMove = (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Actualizar la posición final de la línea
  if (currentLine) {
    // Obtener el centro de la letra seleccionada
    const center = getElementCenter(selectedLetter);
    const origin = [center.x, center.y];
    const end = [mouseX, mouseY];

    const { length, angle } = lengthAndAngle(origin, end);

    // Asignar valores de longitud y ángulo a la línea
    currentLine.style.width = `${length}px`;
    currentLine.style.transform = `rotate(${angle}deg)`;
  }
};

// Manejar la liberación del botón del ratón
export const handleMouseUp = () => {
  if (selectedLetter) {
    selectedLetter.classList.remove('selected'); // Limpiar selección
    selectedLetter = null; // Reiniciar letra seleccionada
  }

  // Eliminar la línea actual
  if (currentLine) {
    currentLine.remove();
    currentLine = null;
  }

  // Eliminar el evento de movimiento del ratón
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
};


// Manejar clic en una letra
export const handleLetterClick = (event) => {
  // Si ya hay una letra seleccionada, no hacemos nada
  if (selectedLetter) return;

  // Seleccionar la letra y añadir clase 'selected'
  selectedLetter = event.currentTarget;
  selectedLetter.classList.add('selected');

  // Obtener el centro de la letra seleccionada
  const center = getElementCenter(selectedLetter);

  // Crear línea inicial
  currentLine = document.createElement('div');
  currentLine.classList.add('line');
  currentLine.style.left = `${center.x}px`;
  currentLine.style.top = `${center.y}px`;

  // Añadir la línea al contenedor
  document.getElementById("wheel").appendChild(currentLine);

  // Mover la línea con el ratón
  document.addEventListener('mousemove', handleMouseMove);

  // Añadir evento para soltar el ratón
  document.addEventListener('mouseup', handleMouseUp);
};

