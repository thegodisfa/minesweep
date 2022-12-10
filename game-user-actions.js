export const GAME_USER_ACTION = {
    handleOnclick: (boardGame, updateBoardGameWithClick, table, displayBoardGame, size) => {
        table.querySelectorAll(".pixel").forEach(pixel => {
            pixel.addEventListener('click', function (e) {
                console.log("CLICK", pixel);
                const i = e.target.dataset.line;
                const j = e.target.dataset.column;
                updateBoardGameWithClick(i, j, boardGame);
                // displayBoardGame(boardGame, size);
                // GAME_USER_ACTION.handleOnclick(boardGame, updateBoardGameWithClick, table, displayBoardGame, size);
            })
        })
    }
}

