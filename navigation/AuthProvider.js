import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import {useApp} from '@realm/react';
import Realm from 'realm';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const app = useApp();
  const [user, setUser] = useState(null);

  GoogleSignin.configure({
    webClientId: '199999796805-vjf05ebikemna00sbe55eui10lgmvkr4.apps.googleusercontent.com',
  });

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch {
      console.log("error")
    }
    
  }

  async function onAppleButtonPress() {

    try {
      // Start the sign-in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identify token returned');
      }

      // Create a Firebase credential from the response
      const { identityToken, nonce } = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

      // Sign the user in with the credential
      return auth().signInWithCredential(appleCredential);
    } catch {
      console.log("error")
    }
    
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password, username) => {
          try {

              const user = await auth().createUserWithEmailAndPassword(email, password);
              auth().currentUser.getIdToken().then(async function(token) {
                const credentials = Realm.Credentials.jwt(token);
                try {
                  const user = await app.logIn(credentials)
                  console.log("Successfully logged in", user.id);
                } catch (err) {
                  console.error("Failed to login", err.message);
                }
              })
          } catch (e) {
              console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },

        google: async () => {
           onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
        },

        apple: async () => {
           onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))
        }
      }}>
      {children}
    </AuthContext.Provider>
  );
};