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

const { width, height } = Dimensions.get('window')

const DisplayPostProfile = ({ route }) => {
    const userId = firebase.auth().currentUser.uid;
    const navigation = useNavigation();
    const { date, id, text, title, user, verse, verseText } = route.params;
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

    useEffect(() => {
        setTimeout(() => {
            scrollViewRef.current?.flashScrollIndicators();
        }, 500);
    }, []);

    var dateObj = new Date(date.seconds * 1000);
    var dateNum = dateObj.getDate();
    if (dateNum < 10) {
        dateNum = "0" + dateNum;
    }
    var month = dateObj.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    const year = dateObj.getFullYear();
    const dateString = month + "/" + dateNum + "/" + year;

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

    // deletes the post from firestore
    const deleteOP = () => {
        firestore().collection('Posts').doc(userId).collection('userPosts').doc(id).delete().then(() => {
            navigation.navigate("Profile");
        })
    }

    // prompts user to verify they want to delete post
    const deletePost = () => {
        Alert.alert('DELETING POST', 'Are you sure?', [
            {
                text: 'Cancel',
                onPress: () => console.log('canceled'),
                style: 'cancel'
            },
            {
                text: 'Ok',
                onPress: deleteOP,
            }
        ])
    }

    // allows/disallows editing
    const editButtonPressed = () => {
        console.log(editMode);
        if (!editMode) {
            try {
                ref_input1.current.focus();
            } catch (error) {
                console.log(editMode);
                console.log(error);
            }
            setEditMode(!editMode);
        } else {
            if (!invalidVerse) {
                firestore().collection('Posts').doc(userId).collection('userPosts').doc(id).update({
                    title: editedTitle,
                    book: editedBook,
                    verse: editedVerse,
                    chapter: editedChapter,
                    verses: editedVerseText,
                    text: editedText
                })
                setEditMode(!editMode);
            } else {
                Alert.alert("Please enter a valid verse");
            }

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
                console.error(error);
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
        console.log(editedBook)
        if (chapter != '' && verse != '' && !isNaN(chapter)) {
            try {
                await fetch(`https://bible-api.com/${editedBook}${chapter}:${verse}`)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson.text);

                        if (!responseJson.text) {
                            setInvalidVerse(true);
                        } else {
                            setEditedVerseText(responseJson.text);
                            setInvalidVerse(false);
                        }
                    });
            } catch (error) {
                Alert.alert("Please enter valid bible verse(s)");
                console.error(error);
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

    const EditablePage = () => {
        return (
            <View>

            </View>
        )
    }



    return (
        <DismissKeyBoard>
            <ImageBackground source={require('../../tree.jpg')} resizeMode="cover" style={styles.image}>
                {/* back button */}
                <View style={styles.backButtonContainer}>
                    <PageBackButton onPress={navBack} />
                </View>
                {/* screen container */}
                <View style={styles.container}>
                    <Text style={styles.date}>{dateString}</Text>

                    <View>

                        <View style={styles.titleInputContainer}>
                            <TextInput
                                style={styles.title}
                                value={editedTitle}
                                onChangeText={text => setEditedTitle(text)}
                                onFocus={() => setEditMode(true)}
                                onBlur={() => setEditMode(false)}
                            />
                        </View>

                        <View style={styles.editVerseContainer}>
                            <View>
                                <View style={{flexDirection: 'column'}}>

                                
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
                            <ScrollView persistentScrollbar={true} ref={scrollViewRef}>
                                <Text style={styles.verseText}>{"\"" + editedVerseText.replace(/(\r\n|\n|\r)/gm, "") + "\""}</Text>
                            </ScrollView>
                        </View>


                        <View style={{
                            height: height * 0.2,
                            borderColor: '#D3D3D3',
                            // paddingLeft: width * 0.02

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
        width: width * 0.8,
        justifyContent: 'center',
        marginLeft: width * 0.05,
        height: height * 0.6,
        // borderWidth: 1,
    },

    editButton: {
        alignContent: 'center',
        alignSelf: 'center',
    },

    date: {
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        color: '#505050',
        fontWeight: 'bold',
    },

    verseTextContainer: {
        height: height * 0.12,
        marginBottom: height * 0.02
    },

    title: {
        fontFamily: 'Lato-Bold',
        fontSize: 23,
        color: '#505050',
        width: width * 0.65

    },

    colon: {
        alignSelf: 'center',
        fontWeight: 800,
        fontSize: 15
    },

    editLabel: {
        fontFamily: 'Lato-Regular',
        fontSize: 10,
        color: '#505050',
    },

    titleInputContainer: {
        color: '#505050',
        width: width * 0.75,
        marginBottom: height * 0.022,
        marginTop: height * 0.01,

        flexDirection: 'row',
    },

    titleContainer: {
        marginBottom: height * 0.022,
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
        marginBottom: height * 0.022
    },

    verse: {
        fontFamily: 'Lato-Bold',
        color: '#505050',
        textAlign: 'right',
        fontSize: 14,
        marginBottom: height * 0.021,
        marginRight: width * 0.03
    },

    editVerseContainer: {
        flexDirection: 'row',
        marginBottom: height * 0.012,
        marginRight: width * 0.03,
        width: width * 0.8,
        height: height * 0.05,

    },

    editableBook: {
        fontFamily: 'Lato-Regular',
        fontSize: 20,
        color: '#505050',

        width: width * 0.5,
        height: height * 0.05,
    },

    editableChapter: {
        fontFamily: 'Lato-Regular',
        fontSize: 20,
        color: '#505050',

        width: width * 0.08,
        marginRight: width * 0.02,
        textAlign: 'right',
    },

    editableVerse: {
        fontFamily: 'Lato-Regular',
        fontSize: 20,
        color: '#505050',

        width: width * 0.15,
        marginLeft: width * 0.02
    },

    text: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: '#505050',
        // marginRight: width * 0.015,
        width: width * 0.7,
        height: height * 0.28,
    },

    textInput: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: '#505050',
        marginRight: width * 0.015,
    },

    image: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },

    backButtonContainer: {
        marginLeft: width * 0.05,
        width: width * 0.05,
        marginTop: height * 0.06,
    },

    bookAutofill: {
        position: 'absolute',
        width: width * 0.3,
        alignSelf: 'flex-start',
        marginTop: height * 0.035,
        
    },

    bookAutofillText: {
        fontFamily: 'Lato-Regular',
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