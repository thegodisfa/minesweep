const getEle = (id) => {
    return document.getElementById(id)
}
let table = document.querySelector('.drawingTable')
let lose = document.querySelector('.lose')
let totalLose = 0
let totalWin = 0
let colorTable = getEle('colorTable')
let chosingColor = getEle('chosingColor')
let totalBomb = getEle('totalBomb')
let totalBombNextToPixel = 0
size = 10
boardGame = []
arrayBomb = []
totalBombs = 10;
function getRow(size, boardGame) {
    const row = []
    for (let i = 0; i < size; i++) {
        getColumn(size, row, i)
    }
    boardGame.push(row)
    return boardGame
}
function createColumn(i, j) {
    const column = document.createElement('div')
    column.dataset.status = 'hidden'
    column.dataset.line = i;
    column.dataset.column = j;
    return column
}
function createPixel(i, j) {
    pixel = {
        i,
        j,
        column,
        setBoom: false,
        value: 0
    }
    return pixel
}
function getColumn(size, row, i) {
    for (let j = 0; j < size; j++) {
        column = createColumn(i, j)
        pixel = createPixel(i, j)
        row.push(pixel)
    }
    return row
}
function createBoardGame(boardGame) {
    boardGame.forEach(row => {
        row.forEach(pixel => {
            table.append(pixel.column)
        })
    })
    return boardGame
}
function drawingTable(size, boardGame, arrayBomb, totalBombs) {
    table.style.setProperty('--size', size)
    getRow(size, boardGame)
    boardGame = createBoardGame(boardGame)[0]
    displayBomb(arrayBomb, totalBombs, boardGame)
    displayGame()
}
function displayGame() {
    table.addEventListener('click', function (e) {
        if (e.target.dataset.setBoom === false && e.target.dataset.value === 0) {
            e.target.dataset.status = 'marked'
        } else if (e.target.dataset.setBoom === true) {
            alert('you lose')
        } else if (e.target.dataset.value != 0) {
            e.target.dataset.status = 'number'
            e.target.innerHTML = e.target.dataset.value
        }
    })
}
function createBomb(arrayBomb, totalBombs) {
    for (let i = 0; i < totalBombs; i++) {
        bomb = {
            i: Math.floor(Math.random() * 10).toString(),
            j: Math.floor(Math.random() * 10).toString(),
        }
        arrayBomb.push(bomb)
    }
    return arrayBomb
}
function displayBomb(arrayBomb, totalBombs, boardGame) {
    arrayBomb = createBomb(arrayBomb, totalBombs)
    arrayBomb.forEach(bomb => {
        const boom = boardGame[bomb.i+bomb.j] //<--- This is not correct
                                              //Use  boardGame[bomb.i][bomb.j] instead
        boom.setBoom = true
        console.log('i',bomb.i)
        console.log('j',bomb.j)
        console.log(boom)
        getTopPixel(bomb.i, bomb.j, boardGame)
        getRightPixel(bomb.i, bomb.j, boardGame)
        getLeftPixel(bomb.i, bomb.j, boardGame)
        getBottomPixel(bomb.i, bomb.j, boardGame)
        getTopRightPixel(bomb.i, bomb.j, boardGame)
        getTopLeftPixel(bomb.i, bomb.j, boardGame)
        getBottomRightPixel(bomb.i, bomb.j, boardGame)
        getBottomLeftPixel(bomb.i, bomb.j, boardGame)
    })
    console.log(boardGame)
}
function getTopPixel(i, j, boardGame) {
    if (i > 0) {
        const topPosition = boardGame[(Number(i) - 1) + j]
        if (topPosition.setBoom == false) {
            topPosition.value = Number(topPosition.value) + 1
        }
        return topPosition
    }
}
function getRightPixel(i, j, boardGame) {
    if (j < 9) {
        const rightPosition = boardGame[i + (Number(j) + 1)]
        if (rightPosition.setBoom == false) {
            rightPosition.value = Number(rightPosition.value) + 1
        }
        return rightPosition
    }
}
function getLeftPixel(i, j, boardGame) {
    if (j > 0) {
        const leftPosition = boardGame[i + (Number(j) - 1)]
        if (leftPosition.setBoom == false) {
            leftPosition.value = Number(leftPosition.value) + 1
        }
        return leftPosition
    }
}
function getBottomPixel(i, j, boardGame) {
    if (i < 9) {
        const bottomPosition = boardGame[(Number(i) + 1) + j]
        if (bottomPosition.setBoom == false) {
            bottomPosition.value = Number(bottomPosition.value) + 1
        }
        return bottomPosition
    }
}
function getTopRightPixel(i, j, boardGame) {
    if (i > 0 && j < 9) {
        const topRightPixel = boardGame[(Number(i) - 1) + (Number(j) + 1)]
        if (topRightPixel.setBoom == false) {
            topRightPixel.value = Number(topRightPixel.value) + 1
        }
        return topRightPixel
    }
}
function getTopLeftPixel(i, j, boardGame) {
    if (i > 0 && j > 0) {
        const topLeftPixel = boardGame[(Number(i) - 1) + (Number(j) - 1)]
        if (topLeftPixel.setBoom == false) {
            topLeftPixel.value = Number(topLeftPixel.value) + 1
        }
        return topLeftPixel
    }
}
function getBottomRightPixel(i, j, boardGame) {
    if (i < 9 && j < 9) {
        const bottomRightPixel = boardGame[(Number(i) + 1) + (Number(j) + 1)]
        if (bottomRightPixel.setBoom == false) {
            bottomRightPixel.value = Number(bottomRightPixel.value) + 1
        }
        return bottomRightPixel
    }
}
function getBottomLeftPixel(i, j, boardGame) {
    if (i < 9 && j > 0) {
        const bottomLeftPixel = boardGame[(Number(i) + 1) + (Number(j) - 1)]
        if (bottomLeftPixel.setBoom == false) {
            bottomLeftPixel.value = Number(bottomLeftPixel.value) + 1
        }
        return bottomLeftPixel
    }
}

drawingTable(size, boardGame, arrayBomb, totalBombs)
