import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'


const Profile = ({route}) => {

  const [verses, setVerses] = useState('');
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verseText, setVerseText] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const navigation= useNavigation();

  

  const navToFeed = () => {
    navigation.navigate("Post");
  }


  return (
    <View style={styles.container}>

      <View style={styles.innerContainer}>
        
        <Text>profile</Text>

        
      </View>

    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  innerContainer: {
    // backgroundColor: 'blue',
    width: '100%',
    alignItems: 'center',
    justifyContent:'center'

  },

  text: {
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    fontSize: 40
  }

})