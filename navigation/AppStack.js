
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Feed from '../screens/In/Feed';
import CreatePost from '../screens/In/CreatePost';
import Friends from '../screens/In/Friends';
import Profile from '../screens/In/Profile';
import Feather from 'react-native-vector-icons/Feather';
import DisplayPost from '../screens/In/DisplayPost';
import DisplayPostProfile from '../screens/In/DisplayPostProfile';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// ios-add-circle-outline





const AppStack = () => {

  const ProfileStack = ({navigation}) => (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DisplayPost"
        component={DisplayPostProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );

  return (
    <Tab.Navigator
    
    screenOptions={{
      tabBarStyle: {
               borderTopWidth: 0,
               marginBottom: '2%',
               padding: 10
         }
     }}>
      <Tab.Screen
        name="Home"
        component={Feed}   
        options ={{  headerShown:false, tabBarLabel: '', tabBarIcon: ({color, size}) => (
          <Feather name="home" size={size} color={color}/>
        ), tabBarActiveTintColor: 'black', tabBarInactiveTintColor: 'gray', }} 
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options ={{  headerShown:false, tabBarLabel: '', tabBarIcon: ({color, size}) => (
          <Feather name="users" size={size} color={color}/>
        ), tabBarActiveTintColor: 'black', tabBarInactiveTintColor: 'gray',}}
      />
      {/* <Tab.Screen
        name="Friends"
        component={Friends}
      /> */}
      <Tab.Screen
        name="Post"
        component={CreatePost}
        options ={{  headerShown:false, tabBarLabel: '', tabBarIcon: ({color, size}) => (
          <Feather name="plus-circle" size={size} color={color}/>
        ), tabBarActiveTintColor: 'black', tabBarInactiveTintColor: 'gray',}}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options ={{  headerShown:false, tabBarLabel: '', tabBarIcon: ({color, size}) => (
          <Feather name="book-open" size={size} color={color}/>
        ), tabBarActiveTintColor: 'black', tabBarInactiveTintColor: 'gray',}}
      />
    </Tab.Navigator>
  );
  };

export default AppStack;