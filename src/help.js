import { getLetterAt, getLetterCoordinates } from "./userActions";
import { rellenarLetra } from "./utils";

/* Aquí he usado funciones anonimas porque me daba problemas de qué era antes si la gallina o el huevo */

let helpMode = false;

const helpers = {
  handleLetterClick: (letterDiv) => {
    if (letterDiv.textContent !== "") return;
    const { x, y } = getLetterCoordinates(letterDiv);
    const letter = getLetterAt(x, y);
    rellenarLetra(x, y, letter);
  },

  handleDocumentClick: (event) => {
    const target = event.target;

    if (!target.classList.contains("letter")) {
      helpers.endHelp();
    } else {
      helpers.handleLetterClick(event.target);
    }
  },

  endHelp: () => {
    if (!helpMode) return;
    helpMode = false;

    const blackDiv = document.querySelector("#black");
    const letters = document.querySelectorAll(".letter");

    if (blackDiv) {
      blackDiv.classList.add("hidden");
    }

    letters.forEach((letter) => {
      letter.classList.remove("on-top");
    });

    document.removeEventListener("click", helpers.handleDocumentClick);
  },

  help: () => {
    if (helpMode) return;
    helpMode = true;

    const blackDiv = document.querySelector("#black");
    const letters = document.querySelectorAll(".letter");

    if (blackDiv) {
      blackDiv.classList.remove("hidden");
    }

    letters.forEach((letter) => {
      letter.classList.add("on-top");
    });

    document.addEventListener("click", helpers.handleDocumentClick);
  },
};

export const { help, endHelp } = helpers;
