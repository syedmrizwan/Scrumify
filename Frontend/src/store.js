import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from './reducers/index';
import thunk from "redux-thunk";
// import promise from "redux-promise-middleware";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native


const persistConfig = {
    key: 'root',
    storage,
    //  whitelist: ['auth', 'project', 'contracts', 'selectedProject', 'notification', 'companyProfiles', 'companyProfile',],
    // blacklist: ['form', 'paymentSettlement', 'notificationLink']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
//const middleware = applyMiddleware(promise(), thunk)
const middleware = applyMiddleware(thunk)
export const store = createStore(persistedReducer, compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f))
export const persistor = persistStore(store)