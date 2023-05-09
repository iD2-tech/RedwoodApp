import { StyleSheet, Text, View, Animated, Dimensions, ImageBackground } from 'react-native'
import React, { useState, useCallback } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather'

const { width, height } = Dimensions.get('window')

const EachPost = (props) => {

    const [textShown, setTextShown] = useState(false); //To show ur remaining Text
    const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
    const toggleNumberOfLines = () => { //To toggle the show text or hide it
        setTextShown(!textShown);
    }

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
        // console.log(e.nativeEvent);
    }, []);


    return (
        <ImageBackground source={require(".././lake_tree_mountain.jpg")} resizeMode='cover' style={styles.background}>


            <View style={styles.container}>
                <Text style={styles.name}>{props.user}</Text>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.verseText}>{"\"" + props.verseText.replace(/(\r\n|\n|\r)/gm, "") + "\""}</Text>
                <Text style={styles.verse}>{props.verse}</Text>
                <Text style={styles.text}
                    onTextLayout={onTextLayout}
                    numberOfLines={textShown ? undefined : 4}
                >{props.text}</Text>
                {
                    lengthMore ? <Text
                        onPress={toggleNumberOfLines}
                        style={{ fontFamily: 'Lato-Regular', color: '#505050', marginTop: '2%', fontSize: 10 }}
                    >{textShown ? 'Read less...' : 'Read more...'}</Text>
                        : null
                }
                <View style={styles.interactionContainer}>
                    <TouchableOpacity style={styles.likeButtonContainer}>
                        <Feather name="heart" size={15} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.likeButtonContainer}>
                        <Feather name="heart" size={15} />
                    </TouchableOpacity>
                </View>

            </View>
        </ImageBackground>
    )
}

export default EachPost

const styles = StyleSheet.create({
    background: {
        height: height,
        opacity: 0.5
    },

    container: {
        // width: width * 0.7,
        height: height,
        paddingTop: height * 0.1,
    },

    interactionContainer: {
        borderWidth: 1,
        flexDirection: 'row'
    },

    likeButtonContainer: {
        width: width * 0.05,
        borderWidth: 1,
        alignItems: 'center',
    },

    name: {
        fontFamily: 'Lato-Bold',
        fontSize: 16.5,
        color: 'black',
        textShadowColor: 'white',
        textShadowOffset: {width: 1.5, height: 1.5},
        textShadowRadius: 1,
    },

    title: {
        fontFamily: 'Lato-Bold',
        fontSize: 23,
        color: '#000000',
        marginBottom: height * 0.01,
        textShadowColor: 'white',
        textShadowOffset: {width: 1.5, height: 1.5},
        textShadowRadius: 1,
    },

    quote: {
        fontFamily: 'Lato-Bold',
        fontSize: 17,
        textShadowColor: 'white',
        textShadowOffset: {width: 1.5, height: 1.5},
        textShadowRadius: 1,
        color: 'black',
    },

    verseText: {
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        textShadowColor: 'white',
        textShadowOffset: {width: 1.5, height: 1.5},
        textShadowRadius: 1,
        color: 'black',
    },

    verse: {
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: '#000000',
        textShadowColor: 'white',
        textShadowOffset: {width: 1.5, height: 1.5},
        textShadowRadius: 1,
        textAlign: 'right',
    },

    text: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: 'black',

    }



})