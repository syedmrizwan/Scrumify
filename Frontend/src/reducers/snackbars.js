import {
    SNACK_BARS_ACTIONS
} from '../actions/snackbars';

const snackbars = (state = [], action) => {

    switch (action.type) {
        case SNACK_BARS_ACTIONS.SHOW_SUCCESS_SNACK_BAR:
            return { ...state, succ_flag: action.succ_flag, succ_message: action.succ_message }
        case SNACK_BARS_ACTIONS.SHOW_ERROR_SNACK_BAR:
            return { ...state, err_flag: action.err_flag, err_message: action.err_message };

        default:
            return state;

    }

}

export default snackbars