import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, Alert, Keyboard } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import PageBackButton from '../../components/PageBackButton';
import DismissKeyBoard from '../../components/DissmisskeyBoard'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";
import { FlatList } from 'react-native-gesture-handler';
import { bookNames } from '../../assets/bibleBookNames';
import { makeMutable } from 'react-native-reanimated';
import { opacity } from 'react-native-redash';

// on submitediting for verses box, trigger request to get verse and handle accordingly

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


  useEffect(() => {
    if (title !== '' && book !== '' && chapter !== '' && verse !== '' && text !== '') {
      setBtnColor(true);
    } else {
      setBtnColor(false);
    }
    if (!data) {
      setData(bookNames);
    }
    

  }, [text])


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
            }).then((docRef) => {
              console.log("added" + docRef)
              setTitle('');
              setBook('');
              setChapter('');
              setVerse('');
              setText('');
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

  const navAndSend = () => {
    fetchVerses();
  }
  
  const bookSelected = (name) => {
    setShowBookDropdown(false);
    setBook(name);
    ref_input2.current.focus()
  }

  const renderItem = ({ item }) => {
    if (item.name.toUpperCase().includes(book.toUpperCase())) {
      return (<View style={styles.item}>
        <TouchableOpacity style={styles.itemText} onPress={() => bookSelected(item.name)}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      </View>
      );

    }
  }

  const bookToChapter = () => {
    for(let i = 0; i < bookNames.length; i++) {
      if(bookNames[i].name.toUpperCase().includes(book.toUpperCase())) {
        bookSelected(bookNames[i].name);
        break;
      }
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
            onChangeText={text => { setTitle(text) }}
            style={styles.title}
            returnKeyType='next'
            onSubmitEditing={() => ref_input1.current.focus()}
          />

          {/* holds the book, chapter, verse inputs */}
          <View style={styles.versesContainer}>

            {/* holds the book and book dropdown */}
            <View style={styles.bookContainer}>

              <TextInput
                placeholder="Book"
                value={book}
                onChangeText={text => { setBook(text) }}
                style={styles.bookInput}
                maxLength={15}
                onFocus={() => setShowBookDropdown(true)}
                onBlur={() => setShowBookDropdown(false)}
                returnKeyType='next'
                onSubmitEditing={bookToChapter}
                ref={ref_input1}
                autoCorrect='false'
                autoComplete='off'
              />

              {showBookDropdown ?
                <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  style={styles.bookDropDown}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps={'handled'}

                />
                : <></>}

            </View>

            <TextInput
              placeholder="Chapter"
              value={chapter}
              onChangeText={text => { setChapter(text); }}
              style={styles.chapterInput}
              keyboardType='numbers-and-punctuation'
              returnKeyType='next'
              ref={ref_input2}
              onSubmitEditing={() => ref_input3.current.focus()}
            />

            <Text style={{ fontSize: 20, fontFamily: 'Lato-Bold', }}>:</Text>

            <TextInput
              placeholder="Verse(s)"
              value={verse}
              onChangeText={text => { setVerse(text); }}
              style={styles.verseInput}
              keyboardType='numbers-and-punctuation'
              returnKeyType='go'
              ref={ref_input3}
              onSubmitEditing={() => ref_input4.current.focus()}
            />
          </View>

          <TextInput
            placeholder="Reflection..."
            multiline
            numberOfLines={4}
            value={text}
            onChangeText={text => { setText(text) }}
            style={styles.textInput}
            returnKeyType='done'
            ref={ref_input4}
            blurOnSubmit
            onSubmitEditing={() => Keyboard.dismiss}
          />
        </View>

        <TouchableOpacity style={
          btnColor ? styles.filledButton : styles.normalButton
        }
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

  bookInput: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    color: '#505050',
  },

  chapterInput: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    marginRight: width * 0.04,
    color: '#505050',
    marginLeft: width * 0.25,
  },

  verseInput: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    marginLeft: width * 0.04,
    color: '#505050',
  },

  textInput: {
    fontSize: 15,
    fontFamily: 'Lato-Bold',
    height: height * 0.45,
    marginBottom: height * 0.065,
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

  bookContainer: {
    flexDirection: 'column',
    position: 'absolute',
    width: width * 0.25,

  },

  bookDropDown: {
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: width * 0.28,
    position: 'absolute',
    marginTop: height * 0.03,
    borderRadius: 2,


  },

  item: {
    // backgroundColor: '#F8F8F8',
    paddingTop: height * 0.005,
    opacity: 1
  },

  itemText: {
    opacity: 0.3,
  }
})