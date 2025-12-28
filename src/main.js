import './style.css'

import { TreeNode } from './tree.js';
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

var theTree = new TreeNode();

function clearButtonHandler() {
  draw.clear();
  theTree = new TreeNode();
}

addButton.addEventListener("click", () => {
  const inputValue = document.getElementById("input-number-item").value;
  if (inputValue === "") return;
  theTree.insert(inputValue);
  const levels = theTree.printByLevel();
  console.log(levels);
  draw.drawByLevel(levels);
});

buildButton.addEventListener("click", () => {
  const inputValue = inputNumber.value
    .split(/[, \s]+/)
    .filter(n => n !== "");
  inputValue.forEach((num, index) => {
    theTree.insert(num);
  });
  const levels = theTree.printByLevel();
  draw.drawByLevel(levels);
});
