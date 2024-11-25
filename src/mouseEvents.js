import { getElementCenter, lengthAndAngle } from "./lib/line_position.js";
import { getGame } from "./game.js";
import { marcarPalabra } from "./utils.js";

let currentLine = null;
let selectedLetter = null;
let connectedLetters = [];
let lines = [];

const getFormedWord = () => {
  return connectedLetters.map((letter) => letter.textContent).join("");
};

const removeAllLines = () => {
  lines.forEach((line) => line.remove());
  lines = [];
};

// Actualiza la posición de la línea
const updateLinePosition = (start, end) => {
  const origin = [start.x, start.y];
  const destination = [end.x, end.y];

  const { length, angle } = lengthAndAngle(origin, destination);

  if (currentLine) {
    currentLine.style.width = `${length}px`;
    currentLine.style.transform = `rotate(${angle}deg)`;

    // Si la línea no tiene posición aún, se coloca en la posición inicial
    if (!currentLine.style.left && !currentLine.style.top) {
      currentLine.style.left = `${start.x}px`;
      currentLine.style.top = `${start.y}px`;
    }
  }
};

const createLine = (event) => {
  if (!selectedLetter) return;

  const letterCenter = getElementCenter(selectedLetter);
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  currentLine = document.createElement("div");
  currentLine.classList.add("line");
  updateLinePosition(letterCenter, { x: mouseX, y: mouseY });

  document.body.appendChild(currentLine);
  lines.push(currentLine);
  connectedLetters.push(selectedLetter);

  selectedLetter.classList.add("selected");
};

const isValidLetterUnderCursor = (letterUnderCursor) => {
  return (
    letterUnderCursor &&
    letterUnderCursor !== selectedLetter &&
    letterUnderCursor.classList.contains("wheel-letter") &&
    !letterUnderCursor.classList.contains("selected") &&
    !connectedLetters.includes(letterUnderCursor)
  );
};

const handleMouseMove = (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const letterCenter = getElementCenter(selectedLetter);

  updateLinePosition(letterCenter, { x: mouseX, y: mouseY });

  const letterUnderCursor = document.elementFromPoint(mouseX, mouseY);

  if (isValidLetterUnderCursor(letterUnderCursor)) {
    letterUnderCursor.classList.add("selected");
    selectedLetter = letterUnderCursor;
    createLine(event);
  }
};

const handleMouseUp = () => {
  connectedLetters.forEach((letter) => letter.classList.remove("selected"));

  if (selectedLetter) {
    selectedLetter.classList.remove("selected");
    selectedLetter = null;
  }

  if (currentLine) {
    currentLine.remove();
    currentLine = null;
  }

  const game = getGame();
  marcarPalabra(getFormedWord(), game);

  connectedLetters = [];
  removeAllLines();

  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
};

export const handleLetterClick = (event) => {
  if (selectedLetter) return;

  selectedLetter = event.currentTarget;
  selectedLetter.classList.add("selected");
  createLine(event);
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
};
