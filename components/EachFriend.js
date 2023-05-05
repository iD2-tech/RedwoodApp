import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import  Feather  from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get('window')
const EachFriend = (props) => {
  return (
    <View style={styles.container}>
    <FontAwesome name="user-circle-o" size={height * 0.055} color="#505050"/>
    <View style={styles.nameContainer}>
        <Text style={{fontFamily:'Lato-Bold', fontSize: height * 0.022}}>{props.name}</Text>
        <Text style={{fontFamily: 'Lato-Regular', fontSize: height * 0.015, color: '#898989'}}>{props.username}</Text>
    </View>
    <View style={styles.xContainer}>
        <TouchableOpacity onPress={props.onPress}>
        <Feather name="x-circle" size={height * 0.026} color="black"/> 
        </TouchableOpacity>
    </View>
      
    </View>
  )
}

export default EachFriend

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        marginTop: height * 0.015
    },

    nameContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: width * 0.04
    },

    xContainer: {
        justifyContent: 'center',
        marginLeft: width * 0.4
    }

})