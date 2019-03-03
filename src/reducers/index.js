
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import board from './board'
// import storage from 'redux-persist/lib/storage';

const appReducer = combineReducers({
    form: formReducer,
    board
});


const rootReducer = (state, action) => {
    // if (action.type === LOGOUT_SUCCESS) {
    //     Object.keys(state).forEach(key => {
    //         storage.removeItem(`persist:${key}`);
    //     });
    //     state = undefined
    // }
    return appReducer(state, action)
}

export default rootReducer;
