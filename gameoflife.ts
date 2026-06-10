const arrayLen: number = 100;

let mainarray: boolean[][];
let swaparray: boolean[][];

let emptyarray: boolean[][];

mainarray = Array.from(
    { length: arrayLen },
    () => Array(arrayLen).fill(false)
);

emptyarray = Array.from(
    { length: arrayLen },
    () => Array(arrayLen).fill(false)
);

swaparray = Array.from(
    { length: arrayLen },
    () => Array(arrayLen).fill(false)
);

const rowmoves: number[] = [1, -1, 0];
const colmoves: number[] = [1, -1, 0];

let Create = (): void =>{
    const dfrag: DocumentFragment = document.createDocumentFragment();
    for (let i = 0; i < arrayLen; i++) {
        for (let j = 0; j < arrayLen; j++) {
            const div = document.createElement('div');
            div.setAttribute("class", "dead");
            div.setAttribute("id", (i + "_" + j))
            div.addEventListener("click", () => {
                Select(i, j);
            })
            dfrag.appendChild(div);
        }
    }
    document.getElementById("grid")?.appendChild(dfrag);
}

Create();


function Restart(): void{
    mainarray = emptyarray;
    swaparray = emptyarray;
    for (let i = 0; i < arrayLen; i++) {
        for (let j = 0; j < arrayLen; j++) {
            mainarray[i][j] = false;
            swaparray[i][j] = false;
        } 
    }
}

function EvaluateCell(x: number, y: number, macierz: boolean[][]): boolean {
    let neighborSum = 0;

    for (let i = 0; i < rowmoves.length; i++) {
        for (let j = 0; j < colmoves.length; j++) {

            if (rowmoves[i] === 0 && colmoves[j] === 0) continue;

            const nx = x + rowmoves[i];
            const ny = y + colmoves[j];

            if (nx < 0 || ny < 0 || nx >= arrayLen || ny >= arrayLen) continue;

            if (macierz[nx][ny]) neighborSum++;
        }
    }

    const alive = macierz[x][y];

    if (!alive) return neighborSum === 3;
    return neighborSum === 2 || neighborSum === 3;
}

function Select(x: number, y: number): void{
    mainarray[x][y] = true;
    if(document.getElementById(x + "_" + y)?.className == "dead"){
        document.getElementById(x + "_" + y)?.setAttribute("class", "alive")
    } else {
        document.getElementById(x + "_" + y)?.setAttribute("class", "dead")
    }
}

function ReplaceArrays(): void{
    for (let i = 0; i < arrayLen; i++) {
        for (let j = 0; j < arrayLen; j++) {
            swaparray[i][j] = EvaluateCell(i,j,mainarray);
            
        }
    }
    let foobarray: boolean[][];
    foobarray = mainarray;
    mainarray = swaparray;
    swaparray = foobarray;
    for (let i = 0;i < arrayLen; i++) {
        for (let j = 0;j < arrayLen; j++) {
            if(mainarray[i][j]){
        document.getElementById(i + "_" + j)?.setAttribute("class", "alive")
            } else {
        document.getElementById(i + "_" + j)?.setAttribute("class", "dead")
            }
            
        }
        
    }
}

let state: boolean = true;

let intervalId: any;

function Swap(): void{
    state != state;
    if(state){
        intervalId = setInterval(() => {
        ReplaceArrays();
    }, 1000);
    } else {
        clearInterval(intervalId)
    }
};

document.getElementById("start")?.addEventListener("click", () => {
    Swap();
})

