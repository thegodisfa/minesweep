
export const gameData = {
    GAME_SIZE: 10,
    BOMB: 10,
    createDivPixel: (i, j) => {
        const divPixel = document.createElement('div')
        divPixel.dataset.status = 'hidden'
        divPixel.dataset.line = i;
        divPixel.dataset.column = j;
        return divPixel
    },

    createColumn: (i, j) => {
        const divPixel = createDivPixel(i, j)
        const pixel = {
            i: i,
            j: j,
            divPixel,
            setBoom: false,
            numberOfBoomAround: 0,
            status: 'hidden'
        }
        return pixel;
    },
    createRow: (i) => {
        const row = [];
        for (let j = 0; j < GAME_SIZE; j++) {
            const column = createColumn(i, j);
            row.push(column);
        }
        return row;
    },
    updateBoardGameWithBombs: (boardGame, arrayBomb) => {
        arrayBomb.forEach(bomb => {
            //Here I add the bomb in the BoardGame
            const pixel = boardGame[bomb.i][bomb.j]
            pixel.setBoom = true;
            //Here I change the numbers in my BoardGame
            const adjacentPixels = getAdjacentPixels(bomb.i, bomb.j, boardGame);
            adjacentPixels.forEach(pixel => {
                if (pixel) pixel.numberOfBoomAround++;
            });
        })
    },
    getAdjacentPixels: (i, j, boardGame) => {
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
    },
    getTopPixel: (i, j, boardGame) => {
        if (i > -1 + 1 && i < GAME_SIZE - 1 && j > -1 && j < GAME_SIZE) {
            return boardGame[i - 1][j];
        }
        return null;
    },
    getRightPixel: (i, j, boardGame) => {
        if (i > -1 && i < GAME_SIZE && j > -1 && j < GAME_SIZE - 1) {
            return boardGame[i][j + 1];
        }
        return null;
    },
    getLeftPixel: (i, j, boardGame) => {
        if (i > -1 && i < GAME_SIZE && j > -1 + 1 && j < GAME_SIZE) {
            return boardGame[i][j - 1];
        }
        return null;
    },
    getBottomPixel: (i, j, boardGame) => {
        if (i > -1 && i < GAME_SIZE - 1 && j > -1 && j < GAME_SIZE) {
            return boardGame[i + 1][j];
        }
        return null;
    },
    getTopRightPixel: (i, j, boardGame) => {
        if (i > -1 + 1 && i < GAME_SIZE && j > -1 && j < GAME_SIZE - 1) {
            return boardGame[i - 1][j + 1];
        }
        return null;
    },
    getTopLeftPixel: (i, j, boardGame) => {
        if (i > -1 + 1 && i < GAME_SIZE && j > -1 + 1 && j < GAME_SIZE) {
            return boardGame[i - 1][j - 1];
        }
        return null;
    },
    getBottomRightPixel: (i, j, boardGame) => {
        if (i > -1 && i < GAME_SIZE - 1 && j > -1 && j < GAME_SIZE - 1) {
            return boardGame[i + 1][j + 1];
        }
        return null;
    },
    getBottomLeftPixel: (i, j, boardGame) => {
        if (i > -1 && i < GAME_SIZE - 1 && j > -1 + 1 && j < GAME_SIZE) {
            return boardGame[i + 1][j - 1];
        }
        return null;
    },

    createBomb: () => {
        const arrayBomb = [];
        for (let i = 0; i < TOTAL_BOMB; i++) {
            const bomb = {
                i: Math.floor(Math.random() * 10),
                j: Math.floor(Math.random() * 10),
            }
            arrayBomb.push(bomb);
        }
        return arrayBomb
    },

    createBoardGame: () => {
        const boardGame = [];
        for (let i = 0; i < GAME_SIZE; i++) {
            const row = createRow(i);
            boardGame.push(row);
        }
        return boardGame;
    },
    updateBoardGameWithClick: (boardGame, i, j) => {
        //MANY CODE TO DO HERE
        const pixel = boardGame[i][j];
        if (pixel && pixel.setBoom === true) {
            stop();
        }else if(pixel.numberOfBoomAround === 0){
            pixel.status = 'visible';
            adjacentPixel = getAdjacentPixels(i,j,boardGame)
            adjacentPixel.forEach(item=>{
                if(item.numberOfBoomAround === 0 && item.status === 'hidden'){
                    item.status = 'visible'
                    adjacentPixel.push(item)
                }
            })
        }else if(pixel.numberOfBoomAround !== 0){
            pixel.divPixel.innerHTML = pixel.numberOfBoomAround
        }
    },

    stop: () => {
        alert("GAME OVER YOU LOSE");
    },
    start: () => {
        document.boardGame = createBoardGame();
        const arrayBomb = createBomb();
        updateBoardGameWithBombs(document.boardGame, arrayBomb);
        return document.boardGame
        /**
         * THIS IS THE ONLY 2 FUNCTIONS THAT CAN BE CALLED FROM OTHER FILES
         */
        //displayGame(boardGame);
        //listenUserActions(boardGame);
    },
}
