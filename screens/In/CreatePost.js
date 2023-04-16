import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react';
import PageBackButton from '../../components/PageBackButton';
import DismissKeyBoard from '../../components/DissmisskeyBoard'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

const CreatePost = () => {

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
    // try {
    //   await fetch(`https://bible-api.com/${book}${chapter}:${verse}`)
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //       // console.log("\"" + responseJson.text.replace(/(\r\n|\n|\r)/gm, "").trim() + "\"");
    //       setVerses(responseJson.text)

    //       realm.write(() => {
    //         realm.create('Post', Post.generate(user.id, title, book, chapter, verse, responseJson.text, text, user.id))
    //       });
    //       setTitle('');
    //       setBook('');
    //       setChapter('');
    //       setVerse('');
    //       setText('');
          navigation.navigate("ProfileStack"
          // , 
          // {
          //   title: title,
          //   verseText: verses,
          //   text: text
          // }
          )
        // });


    // } catch (error) {
    //   console.error(error);
    // }
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
    width: width * 0.85,
    marginTop: '8%'
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
    marginRight: width * 0.07,
    color: '#505050'
  },

  chapterInput: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    marginRight: width * 0.04,
    color: '#505050'
  },

  verseInput: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    marginLeft: width * 0.04,
    color: '#505050'
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
  }

  // postButton: {

  // }
})