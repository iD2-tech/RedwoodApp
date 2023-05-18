import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

FontAwesome.loadFont();

const { width, height } = Dimensions.get('window')

const PageBackButton = (props) => {
  return (
    <TouchableOpacity onPress={() => {props.onPress()}} style={styles.buttonContainer}>
          <FontAwesome name="angle-left" size={35} color="#5C4033" style={styles.button} />
          <View style={styles.touchableArea} />
    </TouchableOpacity>
    // <TouchableOpacity  onPress ={() => {props.onPress()}}>
    //     <FontAwesome name="angle-left" size={35} color="#5C4033"/>
    // </TouchableOpacity>
  )
}

export default PageBackButton

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'relative',
  },
  
  button: {
    zIndex: 1,
  },
  
  touchableArea: {
    position: 'absolute',
    top: -height * 0.01,
    left: -width * 0.035,
    right: -width * 0.035,
    bottom: -height * 0.01,
    zIndex: 2,
    opacity: 0,
  }
})

