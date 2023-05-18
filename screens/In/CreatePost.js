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
import Modal from "react-native-modal";
import RadioGroup from 'react-native-radio-buttons-group';
import DropDownMenu from '../../components/DropDownMenu';

const { width, height } = Dimensions.get('window')


const CreatePost = () => {
  var userId = firebase.auth().currentUser.uid;

  const navigation = useNavigation();
  const DATA = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Public',
      value: 'public',
      icon: 'globe'
    },
    {
      id: '2',
      label: 'Private',
      value: 'private',
      icon: 'lock'
    },
    {
      id: '3',
      label: 'Anonymous',
      value: 'anonymous',
      icon: 'eye-off'
    }
  ];


  const [verses, setVerses] = useState('');
  const [selected, setSelected] = useState(DATA[0]);
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
  const [isModalVisible, setIsModalVisible] = useState(false);


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

    if (verseText.length > 0) {
      setShowVerse(true);
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

            if (selected.value === 'public') {
              firestore().collection('Posts').doc(userId).collection('userPosts').add({
                title: title,
                book: book,
                chapter: chapter,
                verse: verse,
                verses: responseJson.text,
                text: text,
                date: new Date(),
                pinned: '0',
                public: '1',
                private: '0',
                anonymous: '0',
                likes: [],
                comments: [],
              }).then((docRef) => {
                console.log("added" + docRef)
                setTitle('');
                setBook('');
                setChapter('');
                setVerse('');
                setText('');
                setVerseText('');
                setSelected(DATA[0])
                setShowVerse(false);
                navigation.navigate("ProfileStack")
              }).catch((error) => {
                console.log(error);
              })
            } else if (selected.value === 'private') {
              firestore().collection('Posts').doc(userId).collection('userPosts').add({
                title: title,
                book: book,
                chapter: chapter,
                verse: verse,
                verses: responseJson.text,
                text: text,
                date: new Date(),
                pinned: '0',
                public: '0',
                private: '1',
                anonymous: '0',
                likes: [],
                comments: [],
              }).then((docRef) => {
                console.log("added" + docRef)
                setTitle('');
                setBook('');
                setChapter('');
                setVerse('');
                setText('');
                setVerseText('');
                setSelected(DATA[0])
                setShowVerse(false);
                navigation.navigate("ProfileStack")
              }).catch((error) => {
                console.log(error);
              })
            } else {
              firestore().collection('Posts').doc(userId).collection('userPosts').add({
                title: title,
                book: book,
                chapter: chapter,
                verse: verse,
                verses: responseJson.text,
                text: text,
                date: new Date(),
                pinned: '0',
                public: '0',
                private: '0',
                anonymous: '1',
                likes: [],
                comments: [],
              }).then((docRef) => {
                console.log("added" + docRef)
                setTitle('');
                setBook('');
                setChapter('');
                setVerse('');
                setText('');
                setVerseText('');
                setSelected(DATA[0])
                setShowVerse(false);
                navigation.navigate("ProfileStack")
              }).catch((error) => {
                console.log(error);
              })
            }

          }

        });
    } catch (error) {
      Alert.alert("Please enter valid bible verse(s)");
      console.error(error);
    }
  };

  // navigate to next page
  const navAndSend = () => {
    setBtnColor(false);
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

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  }

  const handleModal = () => {
    // let selectedButton = radioButtons.find(e => e.selected == true);
    // selectedButton = selectedButton ? selectedButton.value : radioButtons[0].label;
    // setSelected(selectedButton);

    setIsModalVisible(() =>
      !isModalVisible
    )
  }

  const onPressItem = (data) => {
    setSelected(data);
    setIsModalVisible(() =>
      !isModalVisible
    )
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
            maxLength={20}
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
                    <Text style={{
                      // fontFamily: 'Quicksand-Regular',
                      // fontSize: 20
                    }}>{bookAutofill}</Text>
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
          </View>



          {showVerse ?
            <View style={styles.verseTextContainer}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                >
                <View>
                  {/* <Text style={{ fontFamily: 'Quicksand-Regular',color: 'black' }}>{verseText}</Text> */}
                  <TextInput multiline style={{fontFamily: 'Quicksand-Regular',color: 'black'}} value={verseText} editable={false}/>
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
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: width * 0.9} }>
        
        <TouchableOpacity style={{ marginRight: width * 0.02}}onPress={handleModal}>
          <Feather name={selected.icon} size={27} color="#785444" />
        </TouchableOpacity>

        <TouchableOpacity style={
          btnColor ? styles.filledButton : styles.normalButton
        }
          disabled={btnColor ? false : true}
          onPress={navAndSend}>
          <Text style={
            btnColor ? {
              color: "#FFFFFF",
              fontFamily: 'Quicksand-Bold',
              fontSize: 18
            } :
              {
                color: "#FFFFFF",
                fontFamily: 'Quicksand-Bold',
                fontSize: 18
              }
          }>Post</Text>
        </TouchableOpacity>
        </View>
        {
          isModalVisible ? 
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            // flex: 1,
            top: height * 0.655,
            left: width * 0.25,
            position: 'absolute',
          }}>
          <DropDownMenu onPressItem={onPressItem} data={DATA}/>
          </View>
          : <></>
        }
        {/* <Modal
        isVisible={isModalVisible}
      >
        <View style={{ height: height * 0.4, width: width * 0.7, backgroundColor: '#ECDCD1', alignSelf: 'center', borderRadius: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.filterText}>Filter</Text>

          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
            containerStyle={styles.buttons}
          />


          <TouchableOpacity onPress={handleModal} style={styles.filterButton}>
            <Text style={{
              color: "#505050",
              fontFamily: 'Quicksand-Regular',
              fontWeight: '500'
            }}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
      </View>
      

    </DismissKeyBoard>
  )
}

export default CreatePost

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#ECDCD1', height: '100%', justifyContent: 'center', alignItems: 'center',
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
    fontFamily: 'Quicksand-Bold',
    marginBottom: height * 0.023,
    color: '#785444'
  },

  bookInputValid: {
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
    color: '#785444',
  },

  bookInputInvalid: {
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
    color: 'red',
  },

  chapterInputValid: {
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
    marginRight: width * 0.04,
    color: '#785444',
    marginLeft: width * 0.3,
    position: 'absolute',
    width: width * 0.19,
  },

  chapterInputInvalid: {
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
    marginRight: width * 0.04,
    color: 'red',
    marginLeft: width * 0.3,
    position: 'absolute',
    width: width * 0.19,
  },

  semiColon: {
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
    marginLeft: width * 0.50,
    opacity: 0.3,
  },

  verseInputValid: {
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
    marginLeft: width * 0.523,
    color: '#785444',
    position: 'absolute'
  },

  verseInputInvalid: {
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
    marginLeft: width * 0.523,
    color: 'red',
    position: 'absolute'
  },

  textInputTall: {
    fontSize: 15,
    fontFamily: 'Quicksand-Bold',
    height: height * 0.5,
    marginBottom: height * 0.015,
    color: '#785444',
  },

  textInputShort: {
    fontSize: 15,
    fontFamily: 'Quicksand-Bold',
    height: height * 0.40,
    top: height * 0.1,
    marginBottom: height * 0.115,
    color: '#785444',
  },

  filledButton: {
    backgroundColor: '#785444',
    width: width * 0.70,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  normalButton: {
    backgroundColor: '#C3A699',
    width: width * 0.70,
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
  },
  filterButton: {
    width: width * 0.5,
    padding: width * 0.02,
    borderRadius: 40,
    alignItems: 'center',
    // marginBottom: height * 0.01,
    borderColor: '#E4E4E4',
    borderWidth: 1,
    backgroundColor: '#C3A699',
    marginTop: height * 0.05,
  },
  filterText: {
    fontSize: 27,
    fontWeight: '800',
    fontFamily: 'Quicksand-Regular',
    color: '#785444',
    textAlign: 'left',
    width: width * 0.44,
    marginBottom: height * 0.03
  },

  buttons: {
    alignItems: 'flex-start',
    fontFamily: 'Quicksand-Regular',
  },
})