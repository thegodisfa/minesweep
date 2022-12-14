//here you use html
export const GAME_DISPLAY = {
    getTableGame:()=>{
        return document.querySelector('.drawingTable')
    },
    displayBoargame: (boardGame,GAME_SIZE) => {
        const table = GAME_DISPLAY.getTableGame()
        table.style.setProperty('--size', GAME_SIZE)
        boardGame.forEach(row => {
            row.forEach(pixel => {
                pixel = GAME_DISPLAY.createDivPixel(pixel)
                table.append(pixel)
            })
        });
    },
    resetBoardGame:()=>{
        const table = GAME_DISPLAY.getTableGame()
        table.innerHTML = ''
    },
    createDivPixel: (pixel) => {
        const divPixel = document.createElement('div')
        divPixel.dataset.status = pixel.status
        divPixel.dataset.line = pixel.i;
        divPixel.dataset.column = pixel.j;
        divPixel.classList.add('pixel');
        return divPixel
    },
}
