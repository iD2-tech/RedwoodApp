import { StyleSheet, Text, View, Animated, Dimensions, ImageBackground, Alert, Scrollview, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import DismissKeyBoard from '../../../components/DissmisskeyBoard';
import PageBackButton from '../../../components/PageBackButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const { width, height } = Dimensions.get('window')

const DisplayPostProfile = ({ route }) => {
    const userId = firebase.auth().currentUser.uid;
    const navigation = useNavigation();
    const {postId, postUserId, text, username, user, title, verse, verseText } = route.params;

    // back button
    const navBack = () => {
        navigation.goBack();
    }

    return (
        <KeyboardAwareScrollView behavior='padding' scrollEnabled={false} extraScrollHeight={-(height * 0.06)} style={styles.container}>
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
                <KeyboardAwareScrollView
                    extraScrollHeight={-(height * 0.06)}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.verseContainer}>
                        <TextInput style={styles.verse} editable={false} value={verse} scrollEnabled={false} />
                    </View>
                    <View style={styles.verseTextContainer}>
                        <TextInput style={styles.verseText} editable={false} scrollEnabled={false} multiline value={"\"" + verseText.replace(/(\r\n|\n|\r)/gm, "") + "\""} />
                    </View>
                    <View style={styles.textContainer}>
                        <TextInput style={styles.text} editable={false} value={text} multiline scrollEnabled={false}/>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default DisplayPostProfile

const styles = StyleSheet.create({
    container: {
        width: width,
        paddingLeft: width * 0.13,
        paddingRight: width * 0.13,
        height: height,
        backgroundColor: '#ECDCD1',
    },

    scrollContainer: {
        maxHeight: height * 0.70,
        height: height * 0.70,
        paddingBottom: height * 0.01,
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
        fontSize: 17,
        color: '#785444',
    },

    textContainer: {
        marginTop: height * 0.025,
    },

})