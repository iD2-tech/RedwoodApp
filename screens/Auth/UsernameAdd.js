import { KeyboardAvoidingView, StyleSheet, Text, TextInput, Dimensions, TouchableOpacity, View, Image, TouchableWithoutFeedback, Keyboard, Animated, Alert } from 'react-native'
import React, { useState, useContext, useRef, useEffect } from 'react'
import { AuthContext } from '../../navigation/AuthProvider'
import { useNavigation } from '@react-navigation/native'
import DismissKeyBoard from '../../components/DissmisskeyBoard'
import OnboardButton from '../../components/OnboardButton'
import PageBackButton from '../../components/PageBackButton'
import firestore from '@react-native-firebase/firestore';



const { width, height } = Dimensions.get('window')


const UsernameAdd = () => {

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const navigation = useNavigation();
  const { register } = useContext(AuthContext);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const navBack = () => {
    navigation.navigate("Onboarding");
  }

  const navSignup = () => {
    if(username != '' && name != '') {
      checkUsernameUnique();
    } else {
      Alert.alert("Please be sure to fill out name and username!");
    }
    

  }

  const checkUsernameUnique = async () => {
    var unique = true;
    await firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.data().username.toUpperCase() == username.toUpperCase()) {
            if(unique) {
              Alert.alert("Username is taken");
            }
            unique = false;
          }
        });
      }).then(() => {
        if(unique) {
          navigation.navigate("Signup", {
            username: username,
            name: name,
          });
        }
      })
  }

  return (
    <DismissKeyBoard>
      <Animated.View style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ECDCD1',
        opacity: fadeAnim
      }}>
        <KeyboardAvoidingView style={{ width: '100%', alignItems: 'center', }}>
          <View style={styles.backButtonContainer}>
            <PageBackButton onPress={navBack} />
          </View>
          <View style={styles.letterContainer}>
            <Text style={styles.su}>My name is</Text>
          </View>


          <View style={styles.inputContainer}>

            <TextInput
              placeholder="John Doe"
              value={name}
              onChangeText={text => { setName(text) }}
              style={styles.input}
            />
          </View>
          <View style={styles.letterContainer}>
            <Text style={styles.su}>My username is</Text>
          </View>
          <View style={styles.inputContainer}>

            <TextInput
              placeholder="john_doe"
              value={username}
              onChangeText={text => { setUsername(text) }}
              style={styles.input}
            />
          </View>
          {/* <View style={styles.lineContainer}>
          <View style={{flex: 1, height: 1, backgroundColor: '#FFBE48'}} />
              <View>
                <Text style={{width: 50, textAlign: 'center'}}>Or</Text>
              </View>
           <View style={{flex: 1, height: 1, backgroundColor: '#FFBE48'}} />
          </View> */}
          <OnboardButton buttonColor="#785444" textColor="#FFFFFF" text="CONTINUE" onPress={navSignup} />

        </KeyboardAvoidingView>
      </Animated.View>
    </DismissKeyBoard>
  )
}

export default UsernameAdd

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.055,

  },
  letterContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: width * 0.75,
  },


  input: {
    backgroundColor: '#ECDCD1',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 5,
    marginBottom: 10,
    width: '95%',
    borderStyle: 'solid',
    borderBottomColor: '#785444',
    borderBottomWidth: 1,
    borderColor: 'black',
    opacity: 50,
    fontFamily: 'Quicksand-Bold',
    color: '#785444'
  },
  su: {
    marginBottom: 30,
    fontSize: 28,
    fontWeight: '800',
    fontFamily: 'Quicksand-Bold',
    color: '#505050',
    marginLeft: 0
  },

  backButtonContainer: {
    marginTop: height * 0.08,
    marginBottom: height * 0.05,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: width * 0.78
  }
})