import {
    LOADER_ACTIONS
} from '../actions/loader';

const loader = (state = [], action) => {

    switch (action.type) {
        case LOADER_ACTIONS.SHOW_LOADER:
            return { ...state, showloader: action.showloader }
        default:
            return state;

    }

}

export default loader