import { StyleSheet, Text, View, Animated, Dimensions, ImageBackground, Alert, Scrollview, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import DismissKeyBoard from '../../../components/DissmisskeyBoard';
import PageBackButton from '../../../components/PageBackButton';

const { width, height } = Dimensions.get('window')

const DisplayPostProfile = ({ route }) => {
    const userId = firebase.auth().currentUser.uid;
    const navigation = useNavigation();
    const { postId, postUserId, text, username, user, title, verse, verseText } = route.params;
    const [commentEntry, setCommentEntry] = useState('');

    // back button
    const navBack = () => {
        navigation.goBack();
    }

    return (
        <DismissKeyBoard>
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <View style={styles.backButton}>
                        <PageBackButton onPress={navBack} />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text adjustsFontSizeToFit style={styles.title} numberOfLines={1}>{title}</Text>
                    </View>
                    <View style={styles.userContainer}>
                        <Text adjustsFontSizeToFit style={styles.name} numberOfLines={1}>{user}</Text>
                    </View>
                </View>

                <View style={styles.scrollContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.verseContainer}>
                            <Text style={styles.verse}>{verse}</Text>
                        </View>
                        <View style={styles.verseTextContainer}>
                            <Text style={styles.verseText}>{"\"" + verseText.replace(/(\r\n|\n|\r)/gm, "") + "\""}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{text}</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </DismissKeyBoard>

    )
}

export default DisplayPostProfile

const styles = StyleSheet.create({
    container: {
        width: width,
        marginBottom: height * 0.015,
        paddingLeft: width * 0.13,
        paddingRight: width * 0.13,
        height: height,
        backgroundColor: '#ECDCD1',
    },

    scrollContainer: {
        maxHeight: height * 0.45,
    },

    backButton: {
        marginLeft: width * -0.13,
        paddingLeft: width * 0.025,
        width: width * 0.13,
    },

    topBar: {
        height: height * 0.065,
        width: width,
        marginLeft: width * -0.13,
        paddingLeft: width * 0.13,
        backgroundColor: '#DCC6BB',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height * 0.1,
        marginBottom: height * 0.02
    },

    titleContainer: {
        width: width * 0.5,
        height: height * 0.04,
        justifyContent: 'center',
    },

    commentSection: {
        marginTop: height * 0.03,
    },

    commentEntry: {
        color: '#785444',
        width: width * 0.65
    },

    commentEntryContainer: {
        marginBottom: height * 0.03,
        paddingBottom: height * 0.005,
        borderColor: '#C3A699',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },

    sendCommentButtonContainer: {
        width: width * 0.09,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

    sendCommentButton: {
        transform: [{ rotate: '45deg' }],
        marginRight: width * 0.01,

    },

    commentsContainer: {
        height: height * 0.22,
    },

    userContainer: {
        width: width * 0.25,
        textAlign: 'right',
        justifyContent: 'center',
    },

    name: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 15,
        color: '#785444',
        textAlign: 'right',
    },

    title: {
        fontFamily: 'Quicksand-Regular',
        fontWeight: 500,
        fontSize: 27,
        color: '#785444',
    },

    verseContainer: {
        height: height * 0.05,
        justifyContent: 'center',
    },

    verse: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 20,
        color: '#A47C69',
    },

    verseTextContainer: {
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
        fontWeight: 500,
        fontSize: 17,
        color: '#785444',
    },

    textContainer: {
        marginTop: height * 0.025,
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