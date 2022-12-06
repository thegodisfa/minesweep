

export const GAME_SIZE = 10;
export const TOTAL_BOMB = 10;

function createDivPixel(i, j) {
    const divPixel = document.createElement('div')
    divPixel.dataset.status = 'hidden'
    divPixel.dataset.line = i;
    divPixel.dataset.column = j;
    divPixel.dataset.numberOfBoomAround = 0;
    return divPixel
}

function createColumn(i, j) {
    const divPixel = createDivPixel(i,j)
    const pixel = {
        i: i,
        j: j,
        divPixel,
        setBoom: false,
    }
    return pixel;
}

function createRow(i) {
    const row = [];
    for (let j = 0; j < GAME_SIZE; j++) {
        const column = createColumn(i, j);
        row.push(column);
    }
    return row;
}

function updateBoardGameWithBombs(boardGame, arrayBomb) {
    arrayBomb.forEach(bomb => {
        //Here I add the bomb in the BoardGame
        const pixel = boardGame[bomb.i][bomb.j]
        pixel.setBoom = true;
        //Here I change the numbers in my BoardGame
        const adjacentPixels = getAdjacentPixels(bomb.i, bomb.j, boardGame);
        adjacentPixels.forEach(pixel => {
            if (pixel) pixel.divPixel.dataset.numberOfBoomAround++;
        });
    })
}

export function getAdjacentPixels(i, j, boardGame) {
    const myAdjacentPixels = [];
    myAdjacentPixels.push(getTopPixel(i, j, boardGame));
    myAdjacentPixels.push(getRightPixel(i, j, boardGame));
    myAdjacentPixels.push(getLeftPixel(i, j, boardGame));
    myAdjacentPixels.push(getBottomPixel(i, j, boardGame));
    myAdjacentPixels.push(getTopRightPixel(i, j, boardGame));
    myAdjacentPixels.push(getTopLeftPixel(i, j, boardGame));
    myAdjacentPixels.push(getBottomRightPixel(i, j, boardGame));
    myAdjacentPixels.push(getBottomRightPixel(i, j, boardGame));
    return myAdjacentPixels;
}
function getTopPixel(i, j, boardGame) {
    if (i > -1 + 1 && i < GAME_SIZE - 1 && j > -1 && j < GAME_SIZE) {
        return boardGame[i - 1][j];
    }
    return null;
}
function getRightPixel(i, j, boardGame) {
    if (i > -1 && i < GAME_SIZE && j > -1 && j < GAME_SIZE - 1) {
        return boardGame[i][j + 1];
    }
    return null;
}
function getLeftPixel(i, j, boardGame) {
    if (i > -1 && i < GAME_SIZE && j > -1 + 1 && j < GAME_SIZE) {
        return boardGame[i][j - 1];
    }
    return null;
}
function getBottomPixel(i, j, boardGame) {
    if (i > -1 && i < GAME_SIZE - 1 && j > -1 && j < GAME_SIZE) {
        return boardGame[i + 1][j];
    }
    return null;
}
function getTopRightPixel(i, j, boardGame) {
    if (i > -1 + 1 && i < GAME_SIZE && j > -1 && j < GAME_SIZE - 1) {
        return boardGame[i - 1][j + 1];
    }
    return null;
}
function getTopLeftPixel(i, j, boardGame) {
    if (i > -1 + 1 && i < GAME_SIZE && j > -1 + 1 && j < GAME_SIZE) {
        return boardGame[i - 1][j - 1];
    }
    return null;
}
function getBottomRightPixel(i, j, boardGame) {
    if (i > -1 && i < GAME_SIZE - 1 && j > -1 && j < GAME_SIZE - 1) {
        return boardGame[i + 1][j + 1];
    }
    return null;
}
function getBottomLeftPixel(i, j, boardGame) {
    if (i > -1 && i < GAME_SIZE - 1 && j > -1 + 1 && j < GAME_SIZE) {
        return boardGame[i + 1][j - 1];
    }
    return null;
}

function createBomb() {
    const arrayBomb = [];
    for (let i = 0; i < TOTAL_BOMB; i++) {
        const bomb = {
            i: Math.floor(Math.random() * 10),
            j: Math.floor(Math.random() * 10),
        }
        arrayBomb.push(bomb);
    }
    return arrayBomb
}

function createBoardGame() {
    const boardGame = [];
    for (let i = 0; i < GAME_SIZE; i++) {
        const row = createRow(i);
        boardGame.push(row);
    }
    return boardGame;
}

function updateBoardGameWithClick(boardGame, i, j) {
    //MANY CODE TO DO HERE
    const pixel = boardGame[i][j];
    if (pixel && pixel.setBoom === true) {
        stop();
    }
}

export function stop() {
    alert("GAME OVER YOU LOSE");
}

export const start = () => {
    document.boardGame = createBoardGame();
    const arrayBomb = createBomb();
    updateBoardGameWithBombs(document.boardGame, arrayBomb);
    return document.boardGame
    /**
     * THIS IS THE ONLY 2 FUNCTIONS THAT CAN BE CALLED FROM OTHER FILES
     */
    //displayGame(boardGame);
    //listenUserActions(boardGame);
}
start();
