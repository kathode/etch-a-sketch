let isMouseDown = false;
let isMouseInsideGrid = false;

function setIsInsideContainer(event) {
  if (event.type === "mouseenter") {
    isMouseInsideGrid = true;
  }

  if (event.type === "mouseleave") {
    isMouseInsideGrid = false;
    isMouseDown = false;
  }
}

function createGrid(rows, columns, size = 1) {
  for (let i = 0; i < columns; i++) {
    let row = document.createElement("div");
    row.className = "row";

    for (let j = 0; j < rows; j++) {
      let cell = document.createElement("div");
      let cellBackground = document.createElement("div");

      cell.className = "cell";
      cell.style.height = `${size}rem`;
      cell.style.width = `${size}rem`;

      cellBackground.className = "cell-background";
      cellBackground.style.background = randomRGB();
      cellBackground.style.opacity = 0;
      cellBackground.style.height = "100%";
      cellBackground.style.width = "100%";

      cell.appendChild(cellBackground);
      row.appendChild(cell);
    }

    document.querySelector(".container").appendChild(row);
  }

  const button = document.querySelector("button");
  const container = document.querySelector(".container");

  button.addEventListener("click", resetGridSize);
  container.addEventListener("mouseenter", setIsInsideContainer);
  container.addEventListener("mouseleave", setIsInsideContainer);

  addCellListener();
}

function removeGrid() {
  document.querySelector(".container").textContent = "";

  const button = document.querySelector("button");
  const container = document.querySelector(".container");

  button.removeEventListener("click", resetGridSize);
  container.removeEventListener("mouseenter", setIsInsideContainer);
  container.removeEventListener("mouseleave", setIsInsideContainer);

  removeCellListener();
}

function resetGridSize() {
  const size = Number(prompt("Enter the size of the grid"));

  if (size > 0 || size <= 100) {
    removeGrid();
    createGrid(size, size, 1);
  } else {
    resetGridSize();
  }
}

const randomBetween = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

const randomRGB = () => {
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);

  return `rgb(${r},${g},${b})`;
};

const addCellListener = () => {
  [...document.querySelectorAll(".cell-background")].forEach((cell) => {
    cell.addEventListener("mousedown", colourCell);
    cell.addEventListener("mouseup", colourCell);
    cell.addEventListener("mouseover", colourCell);
  });
};

const removeCellListener = () => {
  [...document.querySelectorAll(".cell-background")].forEach((cell) => {
    cell.removeEventListener("mousedown", colourCell);
    cell.removeEventListener("mouseup", colourCell);
    cell.removeEventListener("mouseover", colourCell);
  });
};

function colourCell(event) {
  if (event.type === "mousedown") {
    isMouseDown = true;
  }

  if (event.type === "mouseup") {
    isMouseDown = false;
  }

  if (isMouseDown && isMouseInsideGrid) {
    event.target.style.opacity = parseFloat(event.target.style.opacity) + 0.1;
  }
}

createGrid(16, 16, 3);
