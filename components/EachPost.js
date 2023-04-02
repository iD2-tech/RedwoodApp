import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native'
import React, {useState} from 'react'

const {width} = Dimensions.get("window")
const ratio = 228 / 362
const DEFAULT_HEIGHT = width * 0.8 * ratio
const {height: wHeight} = Dimensions.get("window")
const height = wHeight - 64

const EachPost = (props) => {
    const[itemHeight, setItemHeight] = useState(0);
    const HEIGHT = itemHeight + 16 * 2
    const yVal = props.y
    const id = props.id
    const position = Animated.subtract(id * HEIGHT, yVal);
    const isDisappearing = -HEIGHT;
    const isTop = 0;
    const isBottom = height - HEIGHT;
    const isAppearing = height;
    
    const translateY = Animated.add(Animated.add(yVal, yVal.interpolate({
        inputRange: [0, 0.0001 + id * HEIGHT],
        outputRange: [0, -id * HEIGHT],
        extrapolateRight: "clamp",
    })),
    position.interpolate({
        inputRange: [isBottom, isAppearing],
        outputRange: [0, HEIGHT / 4],
        extrapolate: "clamp"
    })
    )
    const scale = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [0.5, 1, 1, 0.5],
        extrapolate: "clamp",
      });
      const opacity = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [0.5, 1, 1, 0.5],
      });
  return (
    <Animated.View 
        onLayout={(e) => {
            setItemHeight(e.nativeEvent.layout.height + 16);
        }}
        style={[styles.container, { opacity, transform: [{ translateY }, { scale }] }]}
        >
      <Text style={styles.name}>{props.user}</Text>
      <Text style={styles.date}>{props.date}</Text>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.verseText}>" {props.verseText} "</Text>
      <Text style={styles.verse}>{props.verse}</Text>
      <Text style={styles.text}>{props.text}</Text>
    </Animated.View>
  )
}

export default EachPost

const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginBottom: '10%',
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
        marginBottom: '5%'
    },

    text: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: '#505050', 
    }

    

})