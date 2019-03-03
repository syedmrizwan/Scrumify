

export const BOARD = {
    INIT_BOARD_STATE: 'INIT_BOARD_STATE',
    UPDATE_BOARD_STATE: 'UPDATE_BOARD_STATE',

}

export function initBoard(payload) {
    return (dispatch) => {
        dispatch(initBoardState(payload))
    }
}

export function initBoardState(payload) {
    return {
        type: BOARD.INIT_BOARD_STATE,
        boardState: payload
    }
}

export function updateBoardState(payload) {
    return {
        type: BOARD.UPDATE_BOARD_STATE,
        boardState: payload
    }
}

export function update(result, prevState) {
    return (dispatch) => {
        let newState = prevState;
        if (result && result.droppable0) {
            newState[0].cards = result.droppable0
        }

        if (result && result.droppable1) {
            newState[1].cards = result.droppable1
        }

        if (result && result.droppable2) {
            newState[2].cards = result.droppable2
        }
        dispatch(updateBoardState(newState))
    }
}