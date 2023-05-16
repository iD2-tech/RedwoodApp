import { StyleSheet, Text, View, Animated, Dimensions, ImageBackground, Alert, Scrollview, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import DismissKeyBoard from '../../components/DissmisskeyBoard';
import PageBackButton from '../../components/PageBackButton';
import EachComment from '../../components/EachComment';

const { width, height } = Dimensions.get('window')

const DisplayPostProfile = ({ route }) => {
    const userId = firebase.auth().currentUser.uid;
    const navigation = useNavigation();
    const { postId, postUserId, text, username, user, title, verse, verseText } = route.params;
    const [commentEntry, setCommentEntry] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('Posts')
            .doc(postUserId)
            .collection('userPosts')
            .doc(postId)
            .onSnapshot(doc => {
                setComments(parseComments(doc.data().comments));
            })

        return () => subscriber();
    }, []);

    const parseComments = (comments) => {
        let parsedComments = [];
        let key = 0;
        comments.forEach(comment => {
            let divIndexStart = comment.indexOf('|div|');
            let divIndexEnd = divIndexStart + 5;
            let commentUser = comment.slice(0, divIndexStart);
            let commentContent = comment.slice(divIndexEnd);
            let feed = { username: commentUser, comment: commentContent, key: key };
            key++;
            parsedComments.push(feed);
        });
        return parsedComments;
    }

    // back button
    const navBack = () => {
        navigation.goBack();
    }

    const commentSent = () => {
        let userComment = username + '|div|' + commentEntry;
        firestore().collection('Posts').doc(postUserId).collection('userPosts').doc(postId).update({
            comments: firestore.FieldValue.arrayUnion(userComment),
        })
        setCommentEntry('');
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
                <View style={styles.commentSection}>
                    <View style={styles.commentEntryContainer}>
                        <TextInput
                            placeholder='write your comment here'
                            style={styles.commentEntry}
                            placeholderTextColor='#C3A699'
                            value={commentEntry}
                            onChangeText={(text) => setCommentEntry(text)}
                        />
                        <TouchableOpacity style={styles.sendCommentButtonContainer} onPress={() => commentSent()}>
                            <Feather name='send' color='#C3A699' size={18} style={styles.sendCommentButton} />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.commentsContainer}>

                
                <FlatList
                    data={comments}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => <EachComment username={item.username} comment={item.comment} />}
                />
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
        // borderWidth: 1,
    },

    backButton: {
        marginLeft: width * -0.13,
        paddingLeft: width * 0.025,
        width: width * 0.13,
    },

    topBar: {
        height: height * 0.05,
        width: width,
        marginLeft: width * -0.13,
        paddingLeft: width * 0.13,
        backgroundColor: '#DCC6BB',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height * 0.1,
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
        // borderWidth: 1,
        // justifyContent: 'center',
    },

    sendCommentButton: {
        // marginTop: height * 0.01,
        transform: [{ rotate: '45deg' }],
        marginRight: width * 0.01,

    },

    commentsContainer: {
        height: height * 0.22, 
        // borderWidth: 1,
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
        height: height * 0.05,
        justifyContent: 'center',
    },

    verse: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: '#A47C69',
    },

    verseTextContainer: {
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
    },

    text: {
        fontFamily: 'Lato-Regular',
        fontWeight: 500,
        fontSize: 14,
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