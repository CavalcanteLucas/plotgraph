import './style.css'

import { Draw } from './draw.js';

import appHtml from './app.html?raw';

document.querySelector('#app').innerHTML = appHtml;

const inputNumber = document.getElementById("input-number-list");

inputNumber.addEventListener("keydown", (e) => {
  const allowedKeys = [
    "Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab", "Home", "End"
  ];
  if (
    allowedKeys.includes(e.key) ||
    /^[0-9 ]$/.test(e.key)
  ) {
    return;
  }
  e.preventDefault();
});
inputNumber.addEventListener("input", () => {
  inputNumber.value = inputNumber.value.replace(/[^0-9 ]+/g, "");
});

const buildButton = document.getElementById("build-button");
const addButton = document.getElementById("add-button");

const draw = new Draw();

const clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", clearButtonHandler);

function clearButtonHandler() {
  draw.clear();
}

addButton.addEventListener("click", () => {
  const inputValue = document.getElementById("input-number-item").value;
  if (inputValue === "") return;
  draw.insert(inputValue);
  draw.drawByLevel();
});

buildButton.addEventListener("click", () => {
  draw.clear();
  const inputValue = inputNumber.value
    .split(/[, \s]+/)
    .filter(n => n !== "");
  inputValue.forEach((num, index) => {
    draw.insert(num);
  });
  draw.drawByLevel();
});
