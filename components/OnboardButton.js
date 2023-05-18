import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput} from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window')

const OnboardButton = (props) => {
  return (
    <TouchableOpacity style={
        {backgroundColor: props.buttonColor,
            width: width * 0.75,
            padding: width * 0.038,
            borderRadius: 40,
            alignItems: 'center',
            marginBottom: height * 0.01,
            borderColor: props.buttonColor,
            borderWidth: 1
        }
    }
    onPress ={() => {props.onPress()}}>
        <Text style={
            {color: props.textColor,
            fontFamily: 'Quicksand-Regular',
            fontWeight:'bold'
            }
        }>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default OnboardButton

const styles = StyleSheet.create({})