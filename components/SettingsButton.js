//settingsbutton
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'

const { width, height } = Dimensions.get('window')


const SettingsButton = (props) => {
  return (
    <TouchableOpacity style={
        {width: width * 0.15,
        padding: width * 0.03,
        alignItems: 'center',
        } 
    } onPress ={() => {props.onPress()}}>
        <Feather name = "settings" size={30} color="#5C4033"/>
    </TouchableOpacity>
  )
}

export default SettingsButton

const styles = StyleSheet.create({})