//here you put your listener click
import { start, GAME_SIZE,stop,getAdjacentPixels } from './game-data.js'
let table = document.querySelector('.drawingTable')

function handleOnclick() {
    const boardGame = start()
    table.addEventListener('click', function (e) {
        const i = e.target.dataset.line;
        const j = e.target.dataset.column;
        updateBoardGameOnClick(i,j,boardGame)
        // displayBoardGame(boardGame)
    })
}

function updateBoardGameOnClick(i,j,boardGame){
    const pickedPixel = boardGame[i][j]
        if(pickedPixel.setBoom === true ){
        pickedPixel.divPixel.dataset.status = 'bomb'
        console.log(pickedPixel.divPixel.dataset.status)
        stop()
    }else if(pickedPixel.divPixel.dataset.numberOfBoomAround == 0){
        const pickedPixelArray = []
        const AdjacentPixelArray = []
        pickedPixelArray.push(pickedPixel)
        while(pickedPixelArray.length > 0){
            const adjacentPixels = getAdjacentPixels(pickedPixel.i,pickedPixel.j,boardGame)
            adjacentPixels.forEach(item=>{
                if(item.divPixel.dataset.numberOfBoomAround == 0){
                    pickedPixelArray.push(item)
                    AdjacentPixelArray.push(item)
                }
            })
            pickedPixelArray.shift()
        }
    }else if(pickedPixel.divPixel.dataset.numberOfBoomAround !== 0){
        pickedPixel.divPixel.innerHTML = pickedPixel.divPixel.dataset.numberOfBoomAround
        pickedPixel.divPixel.dataset.status = 'number'
    }
}

handleOnclick()
//code by myself
// function getPickedPixel(i, j) {
//     const pickedPixel = boardGame[i][j]
//     pickedPixel.divPixel.dataset.status = true
//     return pickedPixel
// }

// function handleGamePlay(pickedPixel){
//     // console.log(pickedPixel.divPixel.dataset.numberOfBoomAround)
//     if(pickedPixel.setBoom === true){
//         return 1
//     }else if(pickedPixel.divPixel.dataset.numberOfBoomAround == 0){
//         return 2
//     }else{
//         return 3
//     }
// }
// const pickedPixel = getPickedPixel(i,j)
//         const number = handleGamePlay(pickedPixel)
//         if(number == 1){
//             e.target.dataset.status = 'bomb'
//             stop()
//         }else if(number == 2){
//             console.log(123)
//         }else if(number == 3){
//             e.target.innerHTML = pickedPixel.divPixel.dataset.numberOfBoomAround
//             e.target.dataset.status = 'number'
//         }