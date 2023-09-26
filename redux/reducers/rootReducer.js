import authReducer from "./authReducer";
import postReducer from "./postReducer";
import { combineReducers, legacy_createStore as createStore, applyMiddleware, compose } from "redux";
// import { firestoreReducer } from "react-redux-firebase";
import { firestoreReducer } from 'redux-firestore';
import {firebaseReducer} from "react-redux-firebase";

const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
})


export default rootReducer;