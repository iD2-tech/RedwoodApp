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
        marginBottom: height * 0.015,
        paddingLeft: width * 0.13,
        paddingRight: width * 0.13,
        height: height * 0.36,
    },

    topBar: {
        height: height * 0.05,
        width: width,
        marginLeft: width * -0.13,
        paddingLeft: width * 0.13,
        backgroundColor: '#DCC6BB',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.01,
    },

    titleContainer: {
        width: width * 0.5,
        height: height * 0.04,
        justifyContent: 'center',
    },

    userContainer: {
        width: width * 0.25,
        textAlign: 'right',
        justifyContent: 'center',
    },

    name: {
        fontFamily: 'Lato-Bold',
        fontSize: 16.5,
        color: '#785444',
        textAlign: 'right',
    },

    title: {
        fontFamily: 'Lato-Regular',
        fontWeight: 500,
        fontSize: 23,
        color: '#785444',
    },

    verseContainer: {
        height: height * 0.03,
    },

    verse: {
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: '#A47C69',
    },

    verseTextContainer: {
        // borderWidth: 1,
        height: height * 0.08,
        flexDirection: 'row'
    },

    quote: {
        fontFamily: 'Lato-Bold',
        fontSize: 17,
        color: '#505050',
    },

    verseText: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: '#A47C69',
        marginBottom: '3%'
    },

    text: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: '#785444',
    },

    textContainer: {
        height: height * 0.16,
    },

    interactionContainer: {
        height: height * 0.03,
        flexDirection: 'row',
    },

    iteractionButtonContainer: {
        width: width * 0.085,
        height: height * 0.035,
        justifyContent: 'flex-end'

    },
})