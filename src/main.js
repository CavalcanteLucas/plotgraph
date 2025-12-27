import './style.css'

import * as d3 from "d3";

import { TreeNode } from './tree.js';
import { Draw } from './draw.js';

document.querySelector('#app').innerHTML = `
  <div id="wrapper">
    <div id="input-container">
      <div id="build-container">
        <input type="text" id="input-number-list"/>
        <button id="build-button">Build</button>
      </div>
      <div id="add-container">
        <input type="number" id="input-number-item"/>
        <button id="add-button">Add</button>
      </div>
      <button id="clear-button">Clear</button>
    </div>
    <div id="output-container"></div>
  </div>
`

const inputNumber = document.getElementById("input-number-list");

inputNumber.type = "text";
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



const svg = d3.select("#output-container")
  .append("svg")
  .attr("id", "draw-group");

svg.append("g").attr("id", "draw-group-inner");

svg.append("defs")
  .append("marker")
  .attr("id", "arrow")
  .attr("viewBox", "0 0 10 10")
  .attr("refX", 10)
  .attr("refY", 5)
  .attr("markerWidth", 6)
  .attr("markerHeight", 6)
  .attr("orient", "auto")
  .append("path")
  .attr("d", "M 0 0 L 10 5 L 0 10 z")
  .attr("fill", "black");

const draw = new Draw(svg);

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
  // console.log("Tree by Levels:", levels);

});

buildButton.addEventListener("click", () => {
  console.log("HELLO");

  clearButtonHandler();
  const inputValue = inputNumber.value
    .split(/[, \s]+/)
    .filter(n => n !== "");

  inputValue.forEach((num, index) => {
    console.log("HI");

    theTree.insert(num);

    // const size = 50;
    // const pad = 15;

    // const cy = size + index * size * 2;
    // const ry = size - pad;
    // const rx = Math.max(size - pad, num.length * 6);

    // drawGroupInner.append("ellipse")
    //   .attr("cx", 0)
    //   .attr("cy", cy)
    //   .attr("rx", rx)
    //   .attr("ry", ry)
    //   .attr("stroke", "black")
    //   .attr("fill", "orange")

    // drawGroupInner.append("text")
    //   .attr("x", 0)
    //   .attr("y", cy)
    //   .attr("text-anchor", "middle")
    //   .attr("dominant-baseline", "middle")
    //   .text(num);

    // if (index > 0) {
    //   drawGroupInner.append("line")
    //     .attr("x1", 0)
    //     .attr("y1", size + (index - 1) * size * 2 + ry)
    //     .attr("x2", 0)
    //     .attr("y2", cy - ry)
    //     .attr("stroke", "black")
    //     .attr("marker-end", "url(#arrow)");
    // }
  });

  // console.log(theTree);
  // const treeByLevel = theTree.printByLevel();
  const treeByLevel2 = theTree.printByLevel2();
  console.log(treeByLevel2)
  // console.log("treeByLevel:");
  // console.log(JSON.stringify(treeByLevel));
  // localStorage.setItem('treeByLevel', JSON.stringify(treeByLevel));

  draw.drawByLevel(treeByLevel2);

});
