import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase } from "@react-native-firebase/auth";
import { AuthContext } from '../../navigation/AuthProvider';


const Profile = ({route}) => {
  var userId =firebase.auth().currentUser.email;

  const [verses, setVerses] = useState('');
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verseText, setVerseText] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const navigation= useNavigation();
  const {logout} = useContext(AuthContext);

  

  const navToFeed = () => {
    navigation.navigate("Post");
  }


  return (
  <View style = {{backgroundColor: 'white', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
    <Text>{userId}</Text>
    <TouchableOpacity
      onPress = {() => logout()}
    >
      <Text>Logout</Text>
    </TouchableOpacity>
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