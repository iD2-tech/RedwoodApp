import { StyleSheet, Text, View, Animated, Dimensions, ImageBackground, Alert, Scrollview, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import PageBackButton from '../../components/PageBackButton';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";
import { ScrollView } from 'react-native-gesture-handler';
import DismissKeyBoard from '../../components/DissmisskeyBoard';
import { bookNames } from '../../assets/bibleBookNames';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const { width, height } = Dimensions.get('window')

const DisplayPostProfile = ({ route }) => {
    const monthNames = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const userId = firebase.auth().currentUser.uid;
    const navigation = useNavigation();
    const { date, id, text, title, user, verse, verseText, likes, comments } = route.params;
    const ref_input1 = useRef();
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedText, setEditedText] = useState(text);
    const [editMode, setEditMode] = useState();
    let arr = verse.split(":")[0].split(" ");
    const [editedChapter, setEditedChapter] = useState(arr.pop());
    const [editedBook, setEditedBook] = useState(arr.toString().replaceAll(",", " "))
    const [editedVerse, setEditedVerse] = useState(verse.split(":")[1]);
    const [editedVerseText, setEditedVerseText] = useState(verseText);
    const [bookAutofill, setBookAutofill] = useState(arr.toString().replaceAll(',', ' '));
    const [showBookAutofill, setShowBookAutofill] = useState(false);
    const [invalidVerse, setInvalidVerse] = useState(false);
    const scrollViewRef = useRef();
    const { messageInputRef } = route.params;

    useEffect(() => {
        setTimeout(() => {
            scrollViewRef.current?.flashScrollIndicators();
        }, 500);
    }, []);

    var dateObj = new Date(date.seconds * 1000);
    const datee = dateObj.getDate();
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    // back button
    const navBack = () => {
        if (!invalidVerse) {
            firestore().collection('Posts').doc(userId).collection('userPosts').doc(id).update({
                title: editedTitle,
                book: editedBook,
                verse: editedVerse,
                chapter: editedChapter,
                verses: editedVerseText,
                text: editedText
            }).then(() => {
                navigation.navigate("Profile");
            })
        } else {
            Alert.alert("Please enter a valid verse");
        }


    }

    // gets verses each time verse input is changed
    const getVerses = async () => {
        if (bookAutofill != '' && editedChapter != '' && editedVerse != '' && !isNaN(editedChapter)) {
            try {
                await fetch(`https://bible-api.com/${bookAutofill}${editedChapter}:${editedVerse}`)
                    .then((response) => response.json())
                    .then((responseJson) => {

                        if (!responseJson.text) {
                            setInvalidVerse(true);
                        } else {
                            setEditedVerseText(responseJson.text);
                            setInvalidVerse(false);
                        }
                    });
            } catch (error) {
                Alert.alert("Please enter valid bible verse(s)");
            }
        }

    }

    // gets verses from chapter or verse
    const getVersesFromNumber = async (number, indicator) => {
        let chapter;
        let verse;
        if (indicator == 0) {
            chapter = number;
            verse = editedVerse;
        } else {
            chapter = editedChapter;
            verse = number;
        }
        if (chapter != '' && verse != '' && !isNaN(chapter)) {
            try {
                await fetch(`https://bible-api.com/${editedBook}${chapter}:${verse}`)
                    .then((response) => response.json())
                    .then((responseJson) => {

                        if (!responseJson.text) {
                            setInvalidVerse(true);
                        } else {
                            setEditedVerseText(responseJson.text);
                            setInvalidVerse(false);
                        }
                    });
            } catch (error) {
                Alert.alert("Please enter valid bible verse(s)");
            }
        } else if (isNaN(chapter) || chapter == '' || verse == '') {
            setInvalidVerse(true);
        }
    }

    // autofills the book
    const autofillBook = (text) => {
        for (let i = 0; i < bookNames.length; i++) {
            if (bookNames[i].name.toUpperCase().startsWith(text.toUpperCase())) {
                setBookAutofill(bookNames[i].name);
                break;
            }
        }
    }

    // sets the autofilled book
    const setAutofilledBook = () => {
        setEditedBook(bookAutofill);
        setShowBookAutofill(false);
    }

    const navToLike = () => {
        navigation.navigate("PostLikes", {
            date: date,
            id: id,
            text: text,
            title: title,
            user: user,
            verse: verse,
            verseText: verseText,
            likes: likes,
            comments: comments,
        });
    }

    const navToComment = () => {
        navigation.navigate("PostComments", {
            date: date,
            id: id,
            text: text,
            title: title,
            user: user,
            verse: verse,
            verseText: verseText,
            likes: likes,
            comments: comments,
        });
    }

    return (
        <DismissKeyBoard>
            <ImageBackground source={require('../../FeatherLeft.png')} resizeMode="cover" style={styles.image} imageStyle={{
                marginTop: height * 0.02, transform: [
                    { scaleX: -1 }
                ]
            }}>
                {/* back button */}
                <View style={styles.backButtonContainer}>
                    <PageBackButton onPress={navBack} />
                </View>
                {/* screen container */}
                <View style={styles.container}>
                    <Text style={styles.date}>{month + ' ' + datee + ', ' + year}</Text>
                    <View>
                        <View style={styles.titleInputContainer}>
                            <TextInput
                                style={styles.title}
                                value={editedTitle}
                                onChangeText={text => setEditedTitle(text)}
                                onFocus={() => setEditMode(true)}
                                onBlur={() => setEditMode(false)}
                            />
                            {
                                likes === undefined ? <></> : <View style={styles.socialContainer}>
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={navToLike}>
                                        <Feather name='heart' size={27} color={'#785444'} />
                                        <Text style={styles.likeText}>{likes.length}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={navToComment}>
                                        <Feather name='message-circle' size={27} color={'#785444'} />
                                        <Text style={styles.likeText}>{comments.length}</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>

                        <View style={styles.editVerseContainer}>
                            <View>
                                <View style={{ flexDirection: 'column' }}>
                                    <TextInput
                                        value={editedBook}
                                        onChangeText={text => { setEditedBook(text); autofillBook(text) }}
                                        style={styles.editableBook}
                                        returnKeyType='done'
                                        onSubmitEditing={() => setAutofilledBook()}
                                        onBlur={() => { setAutofilledBook(); getVerses(); setEditMode(false); }}
                                        onFocus={() => setShowBookAutofill(true)}
                                    />
                                    {showBookAutofill ?
                                        <TouchableOpacity style={styles.bookAutofill} onPress={() => setAutofilledBook()}>
                                            <Text style={styles.bookAutofillText}>{bookAutofill}</Text>
                                        </TouchableOpacity>
                                        :
                                        <></>
                                    }
                                </View>
                            </View>
                            <Text> </Text>
                            <TextInput
                                value={editedChapter}
                                onChangeText={text => { setEditedChapter(text); getVersesFromNumber(text, 0) }}
                                style={styles.editableChapter}
                            />
                            <Text style={styles.colon}>:</Text>
                            <TextInput
                                value={editedVerse}
                                onChangeText={text => { setEditedVerse(text); getVersesFromNumber(text, 1) }}
                                style={styles.editableVerse}
                            />
                        </View>
                        {invalidVerse ?
                            <Text style={styles.invalidVerse}>invalid verse</Text>
                            :
                            <></>
                        }
                        <View style={styles.verseTextContainer}>
                            <ScrollView persistentScrollbar={true} ref={scrollViewRef} showsVerticalScrollIndicator={false}>
                                <Text style={styles.verseText}>{"\"" + editedVerseText.replace(/(\r\n|\n|\r)/gm, "") + "\""}</Text>
                            </ScrollView>
                        </View>
                        <View style={{
                            height: height * 0.2,
                            borderColor: '#D3D3D3',

                        }}>
                            <TextInput
                                style={styles.text}
                                value={editedText}
                                onChangeText={text => setEditedText(text)}
                                ref={ref_input1}
                                multiline
                                returnKeyType='done'
                                onBlur={() => setEditMode(false)}
                                onFocus={() => setEditMode(true)}
                                blurOnSubmit
                            />
                        </View>
                    </View>
                </View>

            </ImageBackground>
        </DismissKeyBoard>
    )
}

export default DisplayPostProfile

const styles = StyleSheet.create({
    container: {
        width: width * 0.7,
        justifyContent: 'flex-start',
        marginLeft: width * 0.1,
        height: height * 0.7,
        // borderWidth: 1,
        backgroundColor: '#ECDCD1'
    },

    editButton: {
        alignContent: 'center',
        alignSelf: 'center',
    },

    date: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 20,
        color: '#785444',
        fontWeight: 'bold',
        marginTop: height * 0.02
    },

    verseTextContainer: {
        height: height * 0.12,
        marginBottom: height * 0.02,
        width: width * 0.67
    },

    title: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 25,
        color: '#785444',
        width: width * 0.57

    },

    likeText: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 20,
        marginRight: width * 0.03,
        marginLeft: width * 0.02,
        color: "#785444"
    },

    colon: {
        alignSelf: 'center',
        fontWeight: 800,
        fontSize: 15
    },

    editLabel: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 10,
        color: '#A47C69',
    },

    titleInputContainer: {
        color: '#A47C69',
        width: width * 0.57,
        marginBottom: height * 0.022,
        marginTop: height * 0.01,
        flexDirection: 'row',
        // borderWidth: 1
    },

    socialContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth:1,
    },

    titleContainer: {
        marginBottom: height * 0.022,

    },

    quote: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 17,
        color: '#A47C69',

    },

    verseText: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 14,
        color: '#A47C69',
        marginBottom: height * 0.022
    },

    verse: {
        fontFamily: 'Quicksand-Bold',
        color: '#A47C69',
        textAlign: 'right',
        fontSize: 14,
        marginBottom: height * 0.021,
        marginRight: width * 0.03
    },

    editVerseContainer: {
        flexDirection: 'row',
        marginBottom: height * 0.012,
        marginRight: width * 0.03,
        width: width * 0.7,
        height: height * 0.05,

    },

    editableBook: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 20,
        color: '#A47C69',

        width: width * 0.4,
        height: height * 0.05,
    },

    editableChapter: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 20,
        color: '#A47C69',

        width: width * 0.08,
        marginRight: width * 0.02,
        textAlign: 'right',
    },

    editableVerse: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 20,
        color: '#A47C69',

        width: width * 0.15,
        marginLeft: width * 0.02
    },

    text: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 14,
        color: '#785444',
        // marginRight: width * 0.015,
        width: width * 0.67,
        height: height * 0.38,
    },

    textInput: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 14,
        color: '#785444',
        marginRight: width * 0.015,
    },

    image: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ECDCD1',
    },

    backButtonContainer: {
        marginLeft: width * 0.05,
        width: width * 0.05,
        // marginTop: height * 0.06,
    },

    bookAutofill: {
        position: 'absolute',
        width: width * 0.3,
        alignSelf: 'flex-start',
        marginTop: height * 0.035,

    },

    bookAutofillText: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 14,
        color: '#808080',
        textAlign: 'left',
    },

    invalidVerse: {
        color: 'red',
        alignSelf: 'flex-end',
        position: 'absolute',
        // marginTop: height * 0.195,
        paddingRight: width * 0.03,
        fontSize: 10
    },
})