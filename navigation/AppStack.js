
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Feed from '../screens/In/Feed';
import CreatePost from '../screens/In/CreatePost';
import Friends from '../screens/In/Friends';
import Profile from '../screens/In/Profile';

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Feed}    
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
      />
      <Tab.Screen
        name="Post"
        component={CreatePost}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
  };

export default AppStack;