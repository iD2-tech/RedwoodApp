import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import SignUpScreen from '../screens/Auth/SignUpScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import UsernameAdd from '../screens/Auth/UsernameAdd';
import OnboardScreens from '../screens/Auth/OnboardScreens';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AuthStack = () => {
  const [firstLaunch, setFirstLaunch] = useState(null);
  useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.getItem("appLaunched");
      if (appData == null) {
        setFirstLaunch(true);
        AsyncStorage.setItem("appLaunched", "false");
      } else {
        setFirstLaunch(false);
      }
    }
    setData();
  }, []);

  return (
    firstLaunch != null && (
      <Stack.Navigator  initialRouteName="Onboard">
          {firstLaunch && (
            <Stack.Screen
              name="Onboard"
              component={OnboardScreens}
              options={{headerShown:false, animationEnabled: false,}}
            />
          )}
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{headerShown:false, animationEnabled: false,}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown:false, animationEnabled: false,}}
      />
      <Stack.Screen
        name="Signup"
        component={SignUpScreen}
        options={{headerShown:false, animationEnabled: false,}}
      />
        <Stack.Screen
        name="UsernameAdd"
        component={UsernameAdd}
        options={{headerShown:false, animationEnabled: false,}}
      />
        </Stack.Navigator>
    )

  );
};

export default AuthStack;