let arrayLen = 100;
let mainarray;
let swaparray;
let refreshRate = 500;
mainarray = Array.from({ length: arrayLen }, () => Array(arrayLen).fill(false));
swaparray = Array.from({ length: arrayLen }, () => Array(arrayLen).fill(false));
const rowmoves = [1, -1, 0];
const colmoves = [1, -1, 0];
let dfrag;
let Create = () => {
    const grid = document.getElementById("grid");
    if (!grid)
        return;
    grid.style.gridTemplateColumns = `repeat(${arrayLen}, 3rem)`;
    grid.style.gridTemplateRows = `repeat(${arrayLen}, 3rem)`;
    grid.innerHTML = "";
    dfrag = document.createDocumentFragment();
    for (let i = 0; i < arrayLen; i++) {
        for (let j = 0; j < arrayLen; j++) {
            const div = document.createElement('div');
            div.setAttribute("class", "dead");
            div.setAttribute("id", (i + "_" + j));
            div.addEventListener("click", () => {
                Select(i, j);
            });
            dfrag.appendChild(div);
        }
    }
    document.getElementById("grid")?.appendChild(dfrag);
};
Create();
function Restart() {
    Stop();
    mainarray = Array.from({ length: arrayLen }, () => Array(arrayLen).fill(false));
    swaparray = Array.from({ length: arrayLen }, () => Array(arrayLen).fill(false));
    const cells = document.querySelectorAll("#grid div");
    cells.forEach(c => (c.className = "dead"));
}
function EvaluateCell(x, y, macierz) {
    let neighborSum = 0;
    for (let i = 0; i < rowmoves.length; i++) {
        for (let j = 0; j < colmoves.length; j++) {
            if (rowmoves[i] === 0 && colmoves[j] === 0)
                continue;
            const nx = x + rowmoves[i];
            const ny = y + colmoves[j];
            if (nx < 0 || ny < 0 || nx >= arrayLen || ny >= arrayLen)
                continue;
            if (macierz[nx][ny])
                neighborSum++;
        }
    }
    const alive = macierz[x][y];
    if (!alive)
        return neighborSum === 3;
    return neighborSum === 2 || neighborSum === 3;
}
function Select(x, y) {
    if (document.getElementById(x + "_" + y)?.className == "dead") {
        document.getElementById(x + "_" + y)?.setAttribute("class", "alive");
        mainarray[x][y] = true;
    }
    else {
        document.getElementById(x + "_" + y)?.setAttribute("class", "dead");
        mainarray[x][y] = false;
    }
}
function ReplaceArrays() {
    for (let i = 0; i < arrayLen; i++) {
        for (let j = 0; j < arrayLen; j++) {
            swaparray[i][j] = EvaluateCell(i, j, mainarray);
        }
    }
    let foobarray;
    foobarray = mainarray;
    mainarray = swaparray;
    swaparray = foobarray;
    for (let i = 0; i < arrayLen; i++) {
        for (let j = 0; j < arrayLen; j++) {
            if (mainarray[i][j]) {
                document.getElementById(i + "_" + j)?.setAttribute("class", "alive");
            }
            else {
                document.getElementById(i + "_" + j)?.setAttribute("class", "dead");
            }
        }
    }
}
function ResizeBoard(newSize) {
    Stop();
    arrayLen = newSize;
    mainarray = Array.from({ length: arrayLen }, () => Array(arrayLen).fill(false));
    swaparray = Array.from({ length: arrayLen }, () => Array(arrayLen).fill(false));
    Create();
}
let intervalId;
document.getElementById("timer")?.addEventListener("input", () => {
    const timer = document.getElementById("timer");
    if (!timer)
        return;
    refreshRate = parseInt(timer.value || "0");
    Swap();
});
document.getElementById("size")?.addEventListener("change", () => {
    arrayLen = parseInt(document.getElementById("size")?.value);
    console.log(refreshRate);
    Create();
});
function Swap() {
    Stop();
    intervalId = setInterval(() => {
        ReplaceArrays();
    }, refreshRate);
}
;
function Stop() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}
document.getElementById("start")?.addEventListener("click", () => {
    Swap();
});
document.getElementById("stop")?.addEventListener("click", () => {
    Stop();
});
document.getElementById("reset")?.addEventListener("click", () => {
    Stop();
    Restart();
});
export {};
//console.log(intervalId === true)
//# sourceMappingURL=gameoflife.js.map