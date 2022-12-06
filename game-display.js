//here you use html
import { start,GAME_SIZE } from './game-data.js'
let table = document.querySelector('.drawingTable')
const boardGame = start()
function displayBoargame(boardGame) {
    table.style.setProperty('--size', GAME_SIZE)
    boardGame.forEach(row => {
        row.forEach(pixel => {
            table.append(pixel.divPixel)
        })
    });
}

displayBoargame(boardGame)