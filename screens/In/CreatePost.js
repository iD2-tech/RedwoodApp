import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react';



const CreatePost = () => {

  const [verses, setVerses] = useState('');
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');

  // useEffect(() => {
  //   setVerses('');
  //   setBook('');
  //   setChapter('');
  //   setVerse('');
  // }, []);

  const fetchVerses = async () => {
    try {
      const response = await fetch(`https://bible-api.com/${book}${chapter}:${verse}`);
      const data = await response.json();
      setVerses(data.text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{backgroundColor: 'white', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
               <TextInput 
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
        <Text>{verses}</Text>
    </View>
  )
}

export default CreatePost

const styles = StyleSheet.create({})