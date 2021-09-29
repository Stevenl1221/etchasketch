const DEFAULT_COLOR = '#707070';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    currentMode = newMode;
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}

colorPicker.onchange = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
clearBtn.onclick = () => reloadGrid();

sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

function reloadGrid() {
    const grid = document.getElementById("grid-container");
    grid.innerHTML = ' ';
    generateGrid(currentSize);
}

function generateGrid(size) 
{
    const game = document.getElementById("grid-container");

    game.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    game.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i=0; i<size*size; i++) {
        const div = document.createElement('div');

        div.addEventListener('mouseover', changeColor);
        game.appendChild(div);
    }
    
}

function changeColor(e) {
    if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);

        e.target.style.backgroundColor = `rgb(${randomR},${randomG},${randomB})`;
    }

}

function updateSizeValue(value) {
    const sizetext = document.getElementById("sizeValue");
    sizetext.textContent = `${value} x ${value}`;

    const sizehead = document.getElementById("header");
    sizehead.style.width = `${839-(20*(32-value))}px`;

    const sizecontrols = document.getElementById("controls");
    sizecontrols.style.width = `${839-(20*(32-value))}px`;
   
    // const sizedot = document.getElementById("dot");
    // sizedot.style.marginRight = `${19(16-value)}px`;

    // const sizedot1 = document.getElementById("dot1");
    // sizedot1.style.marginLeft = `${19(16-value)}px`;

}
function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}


generateGrid(DEFAULT_SIZE);
changeColor(DEFAULT_COLOR);
