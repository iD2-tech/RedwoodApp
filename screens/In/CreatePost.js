import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, Alert, Keyboard } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import PageBackButton from '../../components/PageBackButton';
import DismissKeyBoard from '../../components/DissmisskeyBoard'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";
import { ScrollView } from 'react-native-gesture-handler';
import { bookNames } from '../../assets/bibleBookNames';
import { makeMutable } from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window')


const CreatePost = () => {
  var userId = firebase.auth().currentUser.uid;

  const navigation = useNavigation();

  const [verses, setVerses] = useState('');
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [btnColor, setBtnColor] = useState(false);
  const [showBookDropdown, setShowBookDropdown] = useState();
  const [data, setData] = useState(null);
  const ref_input1 = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const [bookAutofill, setBookAutofill] = useState('');
  const [chapterEntered, setChapterEntered] = useState(false);
  const [showVerse, setShowVerse] = useState(false);
  const [verseText, setVerseText] = useState('');
  const [invalidVerse, setInvalidVerse] = useState(false);
  const [nonEmpty, setNonEmpty] = useState(false);


  // updates the status of if entry is postable or not
  useEffect(() => {
    if (title !== '' && book !== '' && chapter !== '' && verse !== '' && text !== '' && !invalidVerse) {
      setBtnColor(true);
    } else {
      setBtnColor(false);
    }
    if (!data) {
      setData(bookNames);
    }

  }, [text, invalidVerse, verse, chapter, book, title])


  // sends post info to next page
  const fetchVerses = async () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    try {
      await fetch(`https://bible-api.com/${book}${chapter}:${verse}`)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(userId)
          console.log("Test1")
          if (!responseJson) {
            fetchVerses();
            return;
          } else {
            setVerses(responseJson.text);
            console.log("Test2")
            firestore().collection('Posts').doc(userId).collection('userPosts').add({
              title: title,
              book: book,
              chapter: chapter,
              verse: verse,
              verses: responseJson.text,
              text: text,
              date: new Date(),
              pinned: '0',
            }).then((docRef) => {
              console.log("added" + docRef)
              setTitle('');
              setBook('');
              setChapter('');
              setVerse('');
              setText('');
              setVerseText('');
              setShowVerse(false);
              navigation.navigate("ProfileStack")
            }).catch((error) => {
              console.log(error);
            })
          }

        });
    } catch (error) {
      Alert.alert("Please enter valid bible verse(s)");
      console.error(error);
    }
  };

  // navigate to next page
  const navAndSend = () => {
    fetchVerses();
  }

  // function for if user accepts autofill
  const bookSelected = (name) => {
    setShowBookDropdown(false);
    setBook(name);
    ref_input2.current.focus()
  }

  // sets the autofill-ed book name
  const autofillBook = (text) => {
    for (let i = 0; i < bookNames.length; i++) {
      if (bookNames[i].name.toUpperCase().startsWith(text.toUpperCase())) {
        setBookAutofill(bookNames[i].name);
        break;
      }
    }
  }

  // grows/truncates book name section if chapter is/isn't entered
  const adjustBookNameSize = (text) => {
    if (text === "") {
      setChapterEntered(false);
    } else {
      setChapterEntered(true);
    }
  }

  // gets verses on book being updated
  const getVerses = async () => {
    if (verse != '' && bookAutofill != '' && chapter != '' && !isNaN(chapter)) {
      try {
        await fetch(`https://bible-api.com/${bookAutofill}${chapter}:${verse}`)
          .then((response) => response.json())
          .then((responseJson) => {

            if (!responseJson.text) {
              setInvalidVerse(true);
            } else {
              setVerseText(responseJson.text);
              setInvalidVerse(false);
              // ref_input4.current.focus()
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
    let chapterRet;
    let verseRet;
    if (indicator == 0) {
      chapterRet = number;
      verseRet = verse;
    } else {
      chapterRet = chapter;
      verseRet = number;
    }
    if (chapterRet != '' && verseRet != '' && !isNaN(chapterRet)) {
      try {
        await fetch(`https://bible-api.com/${bookAutofill}${chapterRet}:${verseRet}`)
          .then((response) => response.json())
          .then((responseJson) => {

            if (!responseJson.text) {
              setInvalidVerse(true);
            } else {
              setVerseText(responseJson.text);
              setInvalidVerse(false);
            }
          });
      } catch (error) {
        Alert.alert("Please enter valid bible verse(s)");
        console.error(error);
      }
    } else if (isNaN(chapterRet) || chapterRet == '' || verseRet == '') {
      setInvalidVerse(true);
    }
  }

  return (
    <DismissKeyBoard>
      <View style={styles.container}>

        {/* holds the inputs up until post button */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={text => { setTitle(text); }}
            style={styles.title}
            returnKeyType='next'
            onSubmitEditing={() => ref_input1.current.focus()}
          />

          {/* holds the book, chapter, verse inputs */}
          <View style={styles.versesContainer}>

            {/* holds the book and book dropdown */}
            <View style={chapterEntered ? styles.bookContainerLong : styles.bookContainerShort}>

              {invalidVerse ? <Feather name="alert-circle" size={20} color="red" style={styles.alert}/> : <></>}

              <TextInput
                placeholder="Book"
                value={book}
                onChangeText={text => { setBook(text); autofillBook(text); }}
                style={invalidVerse ? styles.bookInputInvalid : styles.bookInputValid}
                maxLength={15}
                onFocus={() => setShowBookDropdown(true)}
                onBlur={() => setShowBookDropdown(false)}
                returnKeyType='next'
                onSubmitEditing={(text) => { bookSelected(bookAutofill); getVerses(); }}
                ref={ref_input1}
                autoCorrect={false}
                autoComplete='off'
              />

              {showBookDropdown ?
                <View style={styles.item}>
                  <TouchableOpacity style={styles.itemText} onPress={() => { bookSelected(bookAutofill); getVerses(); }}>
                    <Text>{bookAutofill}</Text>
                  </TouchableOpacity>
                </View>
                : <></>}

            </View>

            <TextInput
              placeholder="Chapter"
              textAlign='right'
              value={chapter}
              onChangeText={text => { setChapter(text); adjustBookNameSize(text); getVersesFromNumber(text, 0); }}
              style={invalidVerse ? styles.chapterInputInvalid : styles.chapterInputValid}
              keyboardType='numbers-and-punctuation'
              returnKeyType='next'
              ref={ref_input2}
              onSubmitEditing={() => ref_input3.current.focus()}
            />

            <Text style={styles.semiColon}>:</Text>

            <TextInput
              placeholder="Verse(s)"
              value={verse}
              onChangeText={text => { setVerse(text); getVersesFromNumber(text, 1); }}
              style={invalidVerse ? styles.verseInputInvalid : styles.verseInputValid}
              keyboardType='numbers-and-punctuation'
              returnKeyType='next'
              ref={ref_input3}
              onSubmitEditing={(text) => getVerses().then(() => { ref_input4.current.focus() })}
            />

            <TouchableOpacity
              style={styles.showVerseButton}
              onPress={() => { setShowVerse(!showVerse); getVerses() }}>
              <Text style={styles.showVerseText}>
                {showVerse ? "ʌ" : "v"}
              </Text>
            </TouchableOpacity>
          </View>



          {showVerse ?
            <View style={styles.verseTextContainer}>
              <ScrollView>
                <View>
                  <Text style={{ fontFamily: 'Lato-Regular', }}>{verseText}</Text>
                </View>
              </ScrollView>


            </View>
            :
            <></>
          }

          <TextInput
            placeholder="Reflection..."
            multiline
            numberOfLines={4}
            value={text}
            onChangeText={text => { setText(text) }}
            style={showVerse ? styles.textInputShort : styles.textInputTall}
            returnKeyType='done'
            ref={ref_input4}
            blurOnSubmit
            onSubmitEditing={() => Keyboard.dismiss}
            onFocus={() => getVerses()}
          />
        </View>

        <TouchableOpacity style={
          btnColor ? styles.filledButton : styles.normalButton
        }
          disabled={btnColor ? false : true}
          onPress={navAndSend}>
          <Text style={
            btnColor ? {
              color: "#FFFFFF",
              fontFamily: 'Lato-Bold',
              fontSize: 18
            } :
              {
                color: "#ABABAB",
                fontFamily: 'Lato-Bold',
                fontSize: 18
              }
          }>Post</Text>
        </TouchableOpacity>



      </View>
    </DismissKeyBoard>
  )
}

export default CreatePost

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'white', height: '100%', justifyContent: 'center', alignItems: 'center',
  },

  backButtonContainer: {
    justifyContent: 'flex-start',
    width: width * 0.85,
    marginTop: '8%',
  },

  inputContainer: {
    justifyContent: 'center',
    width: width * 0.7,
    marginTop: height * 0.05,
  },

  versesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: height * 0.025,
  },

  title: {
    fontSize: 27,
    fontFamily: 'Lato-Bold',
    marginBottom: height * 0.023,
    color: '#505050'
  },

  bookInputValid: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    color: '#505050',
  },

  bookInputInvalid: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    color: 'red',
  },

  chapterInputValid: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    marginRight: width * 0.04,
    color: '#505050',
    marginLeft: width * 0.3,
    position: 'absolute',
    width: width * 0.19,
  },

  chapterInputInvalid: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    marginRight: width * 0.04,
    color: 'red',
    marginLeft: width * 0.3,
    position: 'absolute',
    width: width * 0.19,
  },

  semiColon: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    marginLeft: width * 0.50,
    opacity: 0.3,
  },

  verseInputValid: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    marginLeft: width * 0.523,
    color: '#505050',
    position: 'absolute'
  },

  verseInputInvalid: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    marginLeft: width * 0.523,
    color: 'red',
    position: 'absolute'
  },

  textInputTall: {
    fontSize: 15,
    fontFamily: 'Lato-Bold',
    height: height * 0.5,
    marginBottom: height * 0.015,
    color: '#505050',
  },

  textInputShort: {
    fontSize: 15,
    fontFamily: 'Lato-Bold',
    height: height * 0.40,
    top: height * 0.1,
    marginBottom: height * 0.115,
    color: '#505050',
  },

  filledButton: {
    backgroundColor: '#5C4033',
    width: width * 0.75,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  normalButton: {
    backgroundColor: '#E4E4E4',
    width: width * 0.75,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  bookContainerShort: {
    flexDirection: 'column',
    position: 'absolute',
    width: width * 0.25,
  },

  bookContainerLong: {
    flexDirection: 'column',
    position: 'absolute',
    width: width * 0.5,
  },

  item: {
    // backgroundColor: '#F8F8F8',
    marginLeft: width * 0.002,
    opacity: 1
  },

  itemText: {
    opacity: 0.5,

  },

  showVerseButton: {
    alignSelf: 'flex-end',
    marginLeft: width * 0.2

  },

  showVerseText: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    opacity: 0.3,
  },

  verseTextContainer: {
    position: 'absolute',
    top: height * 0.12,
    height: height * 0.08,
    width: '100%',
    flex: 1,
  },

  alert: {
    position: 'absolute',
    left: width * -0.08,
  }
})