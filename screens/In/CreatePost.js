import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react';
import PageBackButton from '../../components/PageBackButton';
import DismissKeyBoard from '../../components/DissmisskeyBoard'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import {firebase } from "@react-native-firebase/auth";

const CreatePost = () => {
  var userId =firebase.auth().currentUser.uid;

  const navigation = useNavigation();

  const [verses, setVerses] = useState('');
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [btnColor, setBtnColor] = useState(false);

  useEffect(() => {
    if (title !== '' && book !== '' && chapter !== '' && verse !== '' && text !== '') {
      setBtnColor(true);
    } else {
      setBtnColor(false);
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
          // console.log("\"" + responseJson.text.replace(/(\r\n|\n|\r)/gm, "").trim() + "\"");
          setVerses(responseJson.text);
          console.log("Test2")
          firestore().collection('Posts').doc(userId).collection('userPosts').add({
            title: title,
            book: book,
            chapter: chapter,
            verse: verse,
            verses: verses,
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
        });
    } catch (error) {
      console.error(error);
    }
  };

  const navAndSend = () => {
    fetchVerses();
  }


  return (
    <DismissKeyBoard>
      <View style={styles.container}>
        {/* <TextInput 
                    placeholder="book"
                    value={book}
                    onChangeText={text => {setBook(text)}}
                    style={styles.input}
                    
                />
                
                <TextInput 
                    placeholder="chapter"
                    value={chapter}
                    onChangeText={text => {setChapter(text)}}
                    style={styles.input}    
                />

                <TextInput 
                    placeholder="verse"
                    value={verse}
                    onChangeText={text => {setVerse(text)}}
                    style={styles.input}
                />    
      
      <TouchableOpacity onPress={fetchVerses}>
        <Text>find</Text>
        </TouchableOpacity>
        <Text>{verses}</Text> */}

        {/* <View style={styles.backButtonContainer}>
        <PageBackButton onPress={() => {}}/>
      </View> */}

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Untitled"
            value={title}
            onChangeText={text => { setTitle(text) }}
            style={styles.title}

          />
          <View style={styles.versesContainer}>
            <TextInput
              placeholder="Book"
              value={book}
              onChangeText={text => { setBook(text) }}
              style={styles.bookInput}

            />
            <TextInput
              placeholder="Chapter"
              value={chapter}
              onChangeText={text => { setChapter(text) }}
              style={styles.chapterInput}

            />
            <Text style={{ fontSize: 20, fontFamily: 'Lato-Bold', }}>:</Text>
            <TextInput
              placeholder="Verse(s)"
              value={verse}
              onChangeText={text => { setVerse(text) }}
              style={styles.verseInput}

            />
          </View>

          <TextInput
            placeholder="Type here..."
            multiline
            numberOfLines={4}
            value={text}
            onChangeText={text => { setText(text) }}
            style={styles.textInput}

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
    backgroundColor: 'white', height: '100%', justifyContent: 'center', alignItems: 'center'
  },

  backButtonContainer: {
    justifyContent: 'flex-start',
    width: '85%',
    marginTop: '8%'
  },

  inputContainer: {
    justifyContent: 'center',
    width: '70%',
    marginTop: '20%',
  },

  versesContainer: {
    // alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: '15%',
  },

  title: {
    fontSize: 27,
    fontFamily: 'Lato-Bold',
    marginBottom: '8%',
    color: '#505050'
    //  justifyContent: 'center'
  },

  bookInput: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    marginRight: '10%',
    color: '#505050'
  },

  chapterInput: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    marginRight: '5%',
    color: '#505050'
  },

  verseInput: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    marginLeft: '5%',
    color: '#505050'
  },

  textInput: {
    fontSize: 15,
    fontFamily: 'Lato-Bold',
    height: 400,
    marginBottom: '20%',
    color: '#505050',
  },

  filledButton: {
    backgroundColor: '#5C4033',
    width: '75%',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  normalButton: {
    backgroundColor: '#E4E4E4',
            width: '75%',
            padding: 12,
            borderRadius: 10,
            alignItems: 'center',
  }

  // postButton: {

  // }
})