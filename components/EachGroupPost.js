import { StyleSheet, Text, View, Animated, Dimensions, TouchableOpacity, Pressable } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window')

const EachGroupPost = (props) => {
    const postId = props.postId;
    const userId = props.userId;
    const username = props.username;
    const navigation = useNavigation();

    const entryPressed = () => {
        navigation.navigate("DisplayPostGroup", {
            postId: props.postId,
            postUserId: props.userId,
            text: props.text,
            username: props.username,
            user: props.user,
            title: props.title,
            likes: props.likes,
            verse: props.verse,
            verseText: props.verseText
          });
    }

    return (
        <TouchableOpacity onPress={() => entryPressed()} style={styles.container} activeOpacity={0.5}>
            <View style={styles.topBar}>
                <View style={styles.titleContainer}>
                    <Text adjustsFontSizeToFit style={styles.title} numberOfLines={1}>{props.title}</Text>
                </View>
                <View style={styles.userContainer}>
                    <Text adjustsFontSizeToFit style={styles.name} numberOfLines={2}>{props.user}</Text>
                </View>
            </View>

            <View style={styles.verseContainer}>
                <Text style={styles.verse}>{props.verse}</Text>
            </View>

            <View style={styles.verseTextContainer}>
                <Text numberOfLines={3} style={styles.verseText}>{"\"" + props.verseText.replace(/(\r\n|\n|\r)/gm, "") + "\""}</Text>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text} numberOfLines={8}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default EachGroupPost;

const styles = StyleSheet.create({
    container: {
        width: width,
        paddingLeft: width * 0.13,
        paddingRight: width * 0.13,
        marginBottom: height * 0.015,
        paddingBottom: height * 0.015,
    },

    topBar: {
        height: height * 0.058,
        width: width,
        marginLeft: width * -0.13,
        paddingLeft: width * 0.13,
        backgroundColor: '#DCC6BB',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.01,
    },

    titleContainer: {
        width: width * 0.50,
        height: height * 0.04,
        justifyContent: 'center',

    },

    userContainer: {
        width: width * 0.28,
      
        textAlign: 'right',
        justifyContent: 'center',


    },

    name: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 14,
        color: '#785444',
        textAlign: 'right',
        // borderWidth: 1,
    },

    title: {
        fontFamily: 'Quicksand-Bold',
        fontWeight: 500,
        fontSize: 25,
        color: '#785444',
        // borderWidth: 1,
    },

    verseContainer: {
        height: height * 0.025,
        marginTop: height * 0.01,
        justifyContent: 'flex-end'
    },

    verse: {
        fontFamily: 'Quicksand-SemiBold',
        fontSize: 16,
        color: '#A47C69',
    },

    verseTextContainer: {
        maxHeight: height * 0.08,
        flexDirection: 'row',
        marginTop: height * 0.01
        // borderWidth: 1,
    },

    quote: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 19,
        color: '#505050',
    },

    verseText: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 17,
        color: '#A47C69',
    },

    text: {
        fontFamily: 'Quicksand-Regular',
        fontWeight: '500',
        fontSize: 16,
        color: '#785444',
        marginTop: height * 0.01,
    },

    textContainer: {
        maxHeight: height * 0.35,
        marginTop: height * 0.01,
        marginBottom: height * 0.01,
        //borderWidth: 1,
    },
})