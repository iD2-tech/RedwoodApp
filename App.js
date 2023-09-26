import React from 'react';
import Providers from './navigation';
import { Provider } from 'react-redux';
// import RNFirebase from '@react-native-firebase';
import rootReducer from './redux/reducers/rootReducer';
import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import { createFirestoreInstance, getFirestore, reduxFirestore } from 'redux-firestore';
import thunk from "redux-thunk";
// import fbConfig from './config/fbConfig'
import firebase from '@react-native-firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyCgZAawYARtcfrvdLVgCQ9iei50yWeIvsw",
  authDomain: "redwoodapp-dcf6d.firebaseapp.com",
  databaseURL: "https://redwoodapp-dcf6d-default-rtdb.firebaseio.com",
  projectId: "redwoodapp-dcf6d",
  storageBucket: "redwoodapp-dcf6d.appspot.com",
  messagingSenderId: "199999796805",
  appId: "1:199999796805:web:0417f38385c9e61697952c",
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase, firebaseConfig)
  )
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const App = () => {
  
  return ( 
  <Provider store = {store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Providers />
    </ReactReduxFirebaseProvider>
  </Provider>
  
  )
  

}
export default App;
