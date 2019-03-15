import {
    BOARD
} from '../actions/board';

const board = (state = [], action) => {

    switch (action.type) {
        case BOARD.INIT_BOARD_STATE:
            return { ...state, boardState: action.boardState }
        case BOARD.UPDATE_BOARD_STATE:
            return { ...state, boardState: action.boardState };

        default:
            return state;

    }

}

export default board