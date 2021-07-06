function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

let grid;
let cols;
let rows;
let resolution = 20;
let height = 800;
let width = 800;

function setup() {
    createCanvas(width, height)
    cols = width / resolution;
    rows = height / resolution;

    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = Math.round(Math.random(2));
        }
    }
}

function draw() {       
    background(0);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;

            if (grid[i][j] == 1) {
                fill(255);
                stroke(0)
                rect(x, y, resolution, resolution)
            }
        }
    }
    let next = make2DArray(cols, rows)

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j]

            let neighbourds = countNeighbourds(grid, i, j);
            
            if (state == 0 && neighbourds == 3) {
                    next[i][j] = 1
            } else if (state == 1 && (neighbourds < 2 || neighbourds > 3)) {
                next[i][j] = 0
            } else {
                next[i][j] = state;
            }
        }
    }
    grid = next;    
    sleep(20); 
}


function countNeighbourds(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j =  -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row]
        }
    }
    sum -= grid[x][y];
    return sum;
}
