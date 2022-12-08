let table = document.querySelector('.drawingTable')
export const gameUserAction = {
    handleOnclick:()=> {
        const boardGame = start()
        table.addEventListener('click', function (e) {
            const i = e.target.dataset.line;
            const j = e.target.dataset.column;
            updateBoardGameOnClick(i,j,boardGame)
            // displayBoardGame(boardGame)
        })
    }
    
}

