import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import SignUpScreen from '../screens/Auth/SignUpScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import OnboardingScreen from '../screens/Auth/OnboardingScreen';

const Stack = createStackNavigator();

const AuthStack = () => {

  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{headerShown:false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown:false}}
      />
      <Stack.Screen
        name="Signup"
        component={SignUpScreen}
        options={{headerShown:false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;