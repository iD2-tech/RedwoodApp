
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';



import Feed from '../screens/In/Feed';
import CreatePost from '../screens/In/CreatePost';
import Friends from '../screens/In/Friends';
import Profile from '../screens/In/Profile';
import FriendsStack from '../screens/In/FriendStack';
import Requests from '../screens/In/Requests';
import Feather from 'react-native-vector-icons/Feather';
import DisplayPost from '../screens/In/DisplayPost';
import DisplayPostProfile from '../screens/In/DisplayPostProfile';
import TabBar from '../components/TabBar';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Tabb = createMaterialBottomTabNavigator();
// ios-add-circle-outline



const { width, height } = Dimensions.get('window')

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
       <Stack.Screen
        name="FriendStack"
        component={FriendStack}
        options ={{headerShown:false, gestureDirection: "horizontal-inverted"}}
      />
    </Stack.Navigator>
  );

  const FriendStack = ({navigation}) => {
return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen name="Friends" component={Friends} options ={{headerShown:false}} initialParams={{ icon: 'home' }} />
      <Tab.Screen name="Requests" component={FriendsStack}  options ={{headerShown:false,}} initialParams={{ icon: 'home' }}/>
    </Tab.Navigator>
)
  }

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