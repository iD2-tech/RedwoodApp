import { configureStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from '@react-native-firebase/app';


  
  // Initialize Firebase
  firebase.initializeApp();
  
  // Add Firebase services
  firebase.firestore();

  const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    // your other reducers...
  });

  
  const store = configureStore(
    rootReducer,
    compose(
      reactReduxFirebase(firebase), // Firebase configuration
      reduxFirestore(firebase) // Firestore configuration
    )
  );
  
  export default store;