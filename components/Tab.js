import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'

const Tab = ({ color, tab, onPress, icon }) => {
  return (
    <TouchableOpacity style={{flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: color,
        borderRadius: 100}} onPress={onPress}>
            <Text style={{ color:'white', fontFamily: 'Lato-Bold' }}>{tab.name}</Text>
        
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    // backgroundColor: 'black'
  },
});

export default Tab;