import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const OnboardButton = (props) => {
  return (
    <TouchableOpacity style={
        {backgroundColor: props.buttonColor,
            width: '75%',
            padding: 14,
            borderRadius: 40,
            alignItems: 'center',
            marginBottom: '3%',
            borderColor: '#5B5B5B',
            borderWidth: 1
        }
    }
    onPress ={() => {props.onPress()}}>
        <Text style={
            {color: props.textColor,
            fontFamily: 'Lato-Regular',
            fontWeight:'500'
            }
        }>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default OnboardButton

const styles = StyleSheet.create({})