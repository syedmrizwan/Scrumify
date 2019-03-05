

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

export function update(state, prevState) {
    return (dispatch) => {
        let newState = prevState;
        for (let i in Object.keys(state)) {
            if (state && state["selected" + i]) {
                newState[i].cards = state["selected" + i];
            }
        }
        dispatch(updateBoardState(newState))
    }
}