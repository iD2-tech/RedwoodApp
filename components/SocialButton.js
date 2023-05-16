import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const SocialButton = (props) => {
  return (
    <TouchableOpacity style={
        {backgroundColor: props.buttonColor,
            width: '75%',
            padding: 10,
            borderRadius: 40,
            alignItems: 'center',
            marginBottom: '3%',
            borderColor: '#785444',
            borderWidth: 0.5,
            flexDirection: 'row',
            justifyContent:'space-evenly'
        }
    }
    onPress ={() => {props.onPress()}}
    >

        <FontAwesome name={props.social} size={25} color="#505050"/>
        <Text style={
            {color: props.textColor,
            fontFamily: 'Quicksand-Bold',
            fontWeight:'500'
            }
        }>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default SocialButton

const styles = StyleSheet.create({})