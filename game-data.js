import { GAME_DISPLAY } from "./game-display.js";

export const GAME_DATA = {
    boardGame: null,
    GAME_SIZE: 10,
    BOMB: 10,

    createColumn: (i, j) => {
        const pixel = {
            i: i,
            j: j,
            setBoom: false,
            numberOfBoomAround: 0,
            status: 'hidden'
        }
        return pixel;
    },
    createRow: (i) => {
        const row = [];
        for (let j = 0; j < GAME_DATA.GAME_SIZE; j++) {
            const column = GAME_DATA.createColumn(i, j);
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
            const adjacentPixels = GAME_DATA.getAdjacentPixels(bomb.i, bomb.j, boardGame);
            adjacentPixels.forEach(pixel => {
                if (pixel) pixel.numberOfBoomAround++;
            });
        })
    },
    getAdjacentPixels: (i, j, boardGame) => {
        const myAdjacentPixels = [];
        const myadJacent = [];
        myAdjacentPixels.push(GAME_DATA.getTopPixel(i, j, boardGame));
        myAdjacentPixels.push(GAME_DATA.getRightPixel(i, j, boardGame));
        myAdjacentPixels.push(GAME_DATA.getLeftPixel(i, j, boardGame));
        myAdjacentPixels.push(GAME_DATA.getBottomPixel(i, j, boardGame));
        myAdjacentPixels.push(GAME_DATA.getTopRightPixel(i, j, boardGame));
        myAdjacentPixels.push(GAME_DATA.getTopLeftPixel(i, j, boardGame));
        myAdjacentPixels.push(GAME_DATA.getBottomRightPixel(i, j, boardGame));
        myAdjacentPixels.push(GAME_DATA.getBottomRightPixel(i, j, boardGame));
        myAdjacentPixels.forEach(item => {
            if (item !== null) {
                myadJacent.push(item)
            }
        })
        return myadJacent;
    },
    getTopPixel: (i, j, boardGame) => {
        if (i > 0 && i < GAME_DATA.GAME_SIZE) {
            return boardGame[i - 1][j];
        }
        return null;
    },
    getRightPixel: (i, j, boardGame) => {
        if (j > -1 && j < GAME_DATA.GAME_SIZE - 1) {
            return boardGame[i][j + 1];
        }
        return null;
    },
    getLeftPixel: (i, j, boardGame) => {
        if (j > 0 && j < GAME_DATA.GAME_SIZE) {
            return boardGame[i][j - 1];
        }
        return null;
    },
    getBottomPixel: (i, j, boardGame) => {
        if (i > -1 && i < GAME_DATA.GAME_SIZE - 1) {
            return boardGame[i + 1][j];
        }
        return null;
    },
    getTopRightPixel: (i, j, boardGame) => {
        if (i > 0 && i < GAME_DATA.GAME_SIZE && j > -1 && j < GAME_DATA.GAME_SIZE - 1) {
            return boardGame[i - 1][j + 1];
        }
        return null;
    },
    getTopLeftPixel: (i, j, boardGame) => {
        if (i > 0 && i < GAME_DATA.GAME_SIZE && j > 0 && j < GAME_DATA.GAME_SIZE) {
            return boardGame[i - 1][j - 1];
        }
        return null;
    },
    getBottomRightPixel: (i, j, boardGame) => {
        if (i > -1 && i < GAME_DATA.GAME_SIZE - 1 && j > -1 && j < GAME_DATA.GAME_SIZE - 1) {
            return boardGame[i + 1][j + 1];
        }
        return null;
    },
    getBottomLeftPixel: (i, j, boardGame) => {
        if (i > -1 && i < GAME_DATA.GAME_SIZE - 1 && j > 0 && j < GAME_DATA.GAME_SIZE) {
            return boardGame[i + 1][j - 1];
        }
        return null;
    },

    createBomb: () => {
        const arrayBomb = [];
        for (let i = 0; i < GAME_DATA.BOMB; i++) {
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
        for (let i = 0; i < GAME_DATA.GAME_SIZE; i++) {
            const row = GAME_DATA.createRow(i);
            boardGame.push(row);
        }
        return boardGame;
    },
    updateBoardGameWithClick: (i, j, boardGame) => {
        //MANY CODE TO DO HERE
        GAME_DISPLAY.resetBoardGame()
        const pixel = boardGame[i][j];
        if (pixel.numberOfBoomAround === 0 && pixel.setBoom === false && pixel.status === 'hidden') {
            pixel.status = 'marked';
            const adjacentPixel = GAME_DATA.getAdjacentPixels(i, j, boardGame)
            adjacentPixel.forEach(item => {
                if (item.numberOfBoomAround === 0 && pixel.setBoom === false) {
                    adjacentPixel.push(item)
                    if (item.status === 'hidden') {
                        GAME_DATA.updateBoardGameWithClick(item.i, item.j, boardGame)
                    }
                }
            })
        }else if (pixel.numberOfBoomAround > 0 && pixel.status === 'hidden') {
            pixel.status = 'number'
            GAME_DISPLAY.createDivPixel(pixel).innerHTML = pixel.numberOfBoomAround
        }else if (pixel.setBoom === true && pixel.status === 'hidden') {
            pixel.status = 'bomb';
            GAME_DATA.stop();
        } 
    },

    stop: () => {
        alert("GAME OVER YOU LOSE");
    },
    start: (GAME_DISPLAY, GAME_USER_ACTION) => {
        GAME_DATA.boardGame = GAME_DATA.createBoardGame();
        const arrayBomb = GAME_DATA.createBomb();
        GAME_DATA.updateBoardGameWithBombs(GAME_DATA.boardGame, arrayBomb);
        GAME_DISPLAY.displayBoargame(GAME_DATA.boardGame, GAME_DATA.GAME_SIZE);
        GAME_USER_ACTION.handleOnclick(GAME_DATA.boardGame,
            GAME_DATA.updateBoardGameWithClick,
            GAME_DISPLAY.getTableGame(),
            GAME_DISPLAY.displayBoargame,
            GAME_DATA.GAME_SIZE)
    }
}
