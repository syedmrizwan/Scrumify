
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import board from './board'
import snackbars from './snackbars'
import loader from './loader'
// import storage from 'redux-persist/lib/storage';

const appReducer = combineReducers({
    form: formReducer,
    board,
    loader,
    snackbars
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
