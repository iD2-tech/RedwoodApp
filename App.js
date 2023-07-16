import React from 'react';
import Providers from './navigation';
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebase from '@react-native-firebase/app';
import store from './store'

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, //since we are using Firestore
};


const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Providers />
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
export default App;
