import { StyleSheet, Text, View, Animated, Dimensions, ImageBackground, Alert, Scrollview, TextInput, TouchableOpacity } from 'react-native'
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
    const [editedBook, setEditedBook] = useState(verse.split(" ")[0])
    const [editedChapter, setEditedChapter] = useState(verse.split(" ")[1].split(":")[0]);
    const [editedVerse, setEditedVerse] = useState(verse.split(" ")[1].split(":")[1]);
    const [editedVerseText, setEditedVerseText] = useState(verseText);
    const [bookAutofill, setBookAutofill] = useState();
    const [showBookAutofill, setShowBookAutofill] = useState(false);
    const [invalidVerse, setInvalidVerse] = useState(false);

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
        if(!invalidVerse) {
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
        if (!editMode) {
            try {
                ref_input1.current.focus();
            } catch (error) {
                console.log(editMode);
                console.log(error);
            }
            setEditMode(!editMode);
        } else {
            if(!invalidVerse) {
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
        if (chapter != '' && verse != '') {
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
        }
    }

    const autofillBook = (text) => {
        for (let i = 0; i < bookNames.length; i++) {
            if (bookNames[i].name.toUpperCase().startsWith(text.toUpperCase())) {
                setBookAutofill(bookNames[i].name);
                break;
            }
        }
    }

    const setAutofilledBook = () => {
        setEditedBook(bookAutofill);
        setShowBookAutofill(false);
    }

    return (
        <DismissKeyBoard>
            <ImageBackground source={require('../../tree.jpg')} resizeMode="cover" style={styles.image}>
                <View style={styles.backButtonContainer}>
                    <PageBackButton onPress={navBack} />
                </View>

                <View
                    style={styles.container}
                >
                    <View style={{
                        flexDirection: 'row',
                        width: width * 0.05,
                        justifyContent: 'space-between',
                        alignContent: 'center',
                        alignItems: 'center',
                        marginBottom: height * 0.01,
                    }}>
                        <View style={{ flexDirection: 'row', marginBottom: height * 0.002 }}>
                            <TouchableOpacity onPress={() => editButtonPressed()} >
                                {editMode ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <Feather name="eye" size={20} color="#505050" />
                                        <View style={{ marginLeft: width * 0.04 }}>
                                            <TouchableOpacity onPress={deletePost}>
                                                <Feather name={"trash-2"} size={20} color="#505050" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    :
                                    <Feather name={"edit-3"} size={20} color="#505050" />}
                            </TouchableOpacity>


                        </View>


                    </View>



                    {editMode ?
                        <View>
                            <Text style={styles.date}>{dateString}</Text>
                            <View style={styles.titleInputContainer}>
                                <TextInput
                                    style={styles.title}
                                    value={editedTitle}
                                    onChangeText={text => setEditedTitle(text)}
                                    ref={ref_input1}
                                />
                            </View>

                            <Text style={styles.verseText}>{"\"" + editedVerseText.replace(/(\r\n|\n|\r)/gm, "") + "\""}</Text>
                            <View style={styles.editVerseContainer}>
                                <View>
                                    <TextInput
                                        value={editedBook}
                                        onChangeText={text => { setEditedBook(text); autofillBook(text) }}
                                        style={styles.editableBook}
                                        returnKeyType='done'
                                        onSubmitEditing={() => setAutofilledBook()}
                                        onBlur={() => { setAutofilledBook(); getVerses() }}
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
                                <Text> </Text>
                                <TextInput
                                    value={editedChapter}
                                    onChangeText={text => { setEditedChapter(text); getVersesFromNumber(text, 0) }}
                                    style={styles.editableNumber}
                                />
                                <Text>:</Text>
                                <TextInput
                                    value={editedVerse}
                                    onChangeText={text => { setEditedVerse(text); getVersesFromNumber(text, 1) }}
                                    style={styles.editableNumber}
                                />
                            </View>
                            {invalidVerse ?
                                <Text style={styles.invalidVerse}>invalid verse</Text>
                                :
                                <></>
                            }
                            <View style={{
                                height: height * 0.2,
                                // borderWidth: 1,
                                borderColor: '#D3D3D3',
                                // paddingLeft: width * 0.02
                            }}>
                                <ScrollView>
                                    <TextInput
                                        style={styles.text}
                                        value={editedText}
                                        onChangeText={text => setEditedText(text)}
                                        multiline
                                    />
                                </ScrollView>

                            </View>
                            <TouchableOpacity onPress={() => editButtonPressed()}>
                                <Text style={styles.editLabel}>done</Text>
                            </TouchableOpacity>

                        </View>

                        :
                        <View>
                            <Text style={styles.date}>{dateString}</Text>
                            <View style={styles.titleContainer} >

                                <Text style={styles.title}>{editedTitle}</Text>
                            </View>
                            <Text style={styles.verseText}>{"\"" + editedVerseText.replace(/(\r\n|\n|\r)/gm, "") + "\""}</Text>
                            <Text style={styles.verse}>{editedBook} {editedChapter}:{editedVerse}</Text>
                            <View style={{ height: height * 0.2 }}>
                                <ScrollView>
                                    <Text style={styles.text}>{editedText}</Text>
                                </ScrollView>
                            </View>
                        </View>}


                </View>

            </ImageBackground>
        </DismissKeyBoard>
    )
}

export default DisplayPostProfile

const styles = StyleSheet.create({
    container: {
        width: width * 0.8,
        // marginBottom: '20%',
        justifyContent: 'center',
        marginLeft: width * 0.05,
        marginTop: height * 0.05,

        // alignItems: 'center' 
    },

    name: {
        fontFamily: 'Lato-Bold',
        fontSize: 16.5,
        color: '#505050',
        marginBottom: height * 0.005,
        marginTop: height * 0.06
    },
    date: {
        fontFamily: 'Lato-Regular',
        fontSize: 10,
        color: '#505050',
        marginBottom: height * 0.02
    },

    title: {
        fontFamily: 'Lato-Bold',
        fontSize: 23,
        color: '#505050',

    },

    editLabel: {
        fontFamily: 'Lato-Regular',
        fontSize: 10,
        color: '#505050',
    },

    titleInputContainer: {
        color: '#505050',
        borderBottomWidth: 1,
        borderBottomColor: '#D3D3D3',
        width: width * 0.7,
        marginBottom: height * 0.022,
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
        marginBottom: height * 0.021,
        marginRight: width * 0.03,
        alignSelf: 'flex-end'
    },

    editableBook: {
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: '#505050',
        borderBottomWidth: 1,
        borderBottomColor: '#D3D3D3',
        minWidth: width * 0.08,
        textAlign: 'right',
    },

    editableNumber: {
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: '#505050',
        borderBottomWidth: 1,
        borderBottomColor: '#D3D3D3',
    },

    text: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: '#505050',
        marginRight: width * 0.015,
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
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginLeft: width * 0.05,
    },

    bookAutofill: {
        position: 'absolute',
        width: width * 0.3,
        alignSelf: 'flex-end',
        marginTop: height * 0.02,
    },

    bookAutofillText: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: '#D3D3D3',
        textAlign: 'right',
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