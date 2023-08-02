/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import OneSignal from 'react-native-onesignal';

// OneSignal Initialization
OneSignal.setAppId('a5a88436-68cd-4aea-bdee-97a9fa3b4181');

// promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
OneSignal.promptForPushNotificationsWithUserResponse();

//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
  let notification = notificationReceivedEvent.getNotification();
  console.log("notification: ", notification);
  const data = notification.additionalData
  console.log("additionalData: ", data);
  // Complete with null means don't show a notification.
  notificationReceivedEvent.complete(notification);
});

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  console.log("OneSignal: notification opened:", notification);
});

AppRegistry.registerComponent(appName, () => App);


// const firebaseConfig = {
//   apiKey: "AIzaSyCgZAawYARtcfrvdLVgCQ9iei50yWeIvsw",
//   authDomain: "redwoodapp-dcf6d.firebaseapp.com",
//   databaseURL: "https://redwoodapp-dcf6d-default-rtdb.firebaseio.com",
//   projectId: "redwoodapp-dcf6d",
//   storageBucket: "redwoodapp-dcf6d.appspot.com",
//   messagingSenderId: "199999796805",
//   appId: "1:199999796805:web:0417f38385c9e61697952c",
//   measurementId: "G-Y8PLDYHSLS"
// };