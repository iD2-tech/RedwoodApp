import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native'
import React, {useState} from 'react'


const EachPost = (props) => {

    

  return (
    <View 
        style={styles.container }
        >
      <Text style={styles.name}>{props.user}</Text>
      <Text style={styles.date}>{props.date}</Text>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.verseText}>" {props.verseText} "</Text>
      <Text style={styles.verse}>{props.verse}</Text>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  )
}

export default EachPost

const styles = StyleSheet.create({
    container: {
        width: '80%',
        marginBottom: '20%',

        // alignItems: 'center' 
    },

    name: {
        fontFamily: 'Lato-Bold',
        fontSize: 16.5,
        color: '#505050',
        marginBottom: '1%'
    },
    date: {
        fontFamily: 'Lato-Regular',
        fontSize: 10,
        color: '#505050',
        marginBottom: '5%'
    },

    title: {
        fontFamily: 'Lato-Bold',
        fontSize: 23,
        color: '#505050',
        marginBottom: '5%'
    },

    quote: {
        fontFamily: 'Lato-Bold',
        fontSize: 17,
        color: '#505050', 

    },

    verseText: {
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: '#505050', 
        marginBottom: '3%'
    },

    verse: {
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: '#505050', 
        textAlign: 'right',
        marginBottom: '5%',
    },

    text: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: '#505050', 
    }

    

})