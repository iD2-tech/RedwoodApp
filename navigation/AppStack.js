
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';



import Feed from '../screens/In/Feed';
import CreatePost from '../screens/In/CreatePost';
import Friends from '../screens/In/Friends';
import Profile from '../screens/In/Profile';
import Requests from '../screens/In/Requests';
import Feather from 'react-native-vector-icons/Feather';
import DisplayPost from '../screens/In/DisplayPost';
import DisplayPostProfile from '../screens/In/DisplayPostProfile';
import TabBar from '../components/TabBar';
import DeletedPosts from '../screens/In/DeletedPosts';
import MyProfile from '../screens/In/MyProfile';
import Privacy from '../screens/In/Privacy';
import Settings from '../screens/In/Settings';




import GroupMain from '../screens/In/Group/GroupMain';
import CreateGroup from '../screens/In/Group/CreateGroup';
import EachGroup from '../screens/In/Group/EachGroup';
import Members from '../screens/In/Group/Members';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// const Tabb = createMaterialBottomTabNavigator();
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
      <Stack.Screen
        name="Settings"
        component={Settings}
        options ={{headerShown:false}}
      />
      <Stack.Screen
        name="DeletedPosts"
        component={DeletedPosts}
        options ={{headerShown:false}}
      />
      <Stack.Screen
        name="Privacy"
        component={Privacy}
        options ={{headerShown:false}}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options ={{headerShown:false}}
      />
    </Stack.Navigator>
  );

  const GroupStack = ({navigation}) => (
    <Stack.Navigator>
      <Stack.Screen
        name="GroupMain"
        component={GroupMain}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EachGroup"
        component={GroupNavStack}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="CreateGroup"
        component={CreateGroup}
        options ={{headerShown:false}}
      />
    </Stack.Navigator>
  );

  const GroupNavStack = ({route}) => {
    const {item} = route.params
    return (
      <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" options ={{headerShown:false, gestureDirection: "horizontal-inverted"}}  >
        {props => <EachGroup {...props} item={item}/>}
      </Tab.Screen>
      <Tab.Screen name="Members"  options ={{headerShown:false, gestureDirection: "horizontal-inverted"}} >
        {props => <Members {...props} item={item}/>}
      </Tab.Screen>
     
    </Tab.Navigator>
    )
  }

  const FriendStack = ({navigation}) => {
return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen name="Friends" component={Friends} options ={{headerShown:false, gestureDirection: "horizontal-inverted"}}  />
      <Tab.Screen name="Requests" component={Requests}  options ={{headerShown:false, gestureDirection: "horizontal-inverted"}} />
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
      <Tab.Screen
        name="Groups"
        component={GroupStack}   
        options ={{  headerShown:false, tabBarLabel: '', tabBarIcon: ({color, size}) => (
          <Feather name="zap" size={size} color={color}/>
        ), tabBarActiveTintColor: 'black', tabBarInactiveTintColor: 'gray', }} 
      />
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