import React, {createContext, useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import firestore from '@react-native-firebase/firestore';
import { firebase,} from "@react-native-firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
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
            Alert.alert("Incorrect username/password combination");
            console.log(e);
          }
        },
        register: async (email, password, name, username) => {
          try {
            
              auth().createUserWithEmailAndPassword(email, password)
              .then((userCredentials)=>{
                console.log(userCredentials)
                if(userCredentials.user){
                  userCredentials.user.updateProfile({
                    displayName: name + "|" + username
                   }).then((s)=> {
                    console.log('done')
                  })
                }
            })
            .catch(function(error) {
              console.log(error.message);
            });

              
             

            } catch (e) {
              Alert.alert("Email address is already in use");
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

        google: async (name, username) => {
           onGoogleButtonPress().then(() => 
           
           firebase.auth().currentUser.updateProfile({displayName: name +"|"+username}).then(() => {
            console.log('updated')
          })
          
          )
        },

        apple: async (name, username) => {
           onAppleButtonPress().then(() => 
           firebase.auth().currentUser.updateProfile({displayName: name +"|"+username}).then(() => {
            console.log('updated')
          }))
        }
      }}>
      {children}
    </AuthContext.Provider>
  );
};