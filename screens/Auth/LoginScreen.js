import { KeyboardAvoidingView, StyleSheet, Text, TextInput, Dimensions, TouchableOpacity, View, Image, TouchableWithoutFeedback, Keyboard, Animated } from 'react-native'
import React, { useState, useContext, useRef, useEffect } from 'react'
import { AuthContext } from '../../navigation/AuthProvider'
import { useNavigation } from '@react-navigation/native'
import DismissKeyBoard from '../../components/DissmisskeyBoard'
import OnboardButton from '../../components/OnboardButton'
import PageBackButton from '../../components/PageBackButton'
import SocialButton from '../../components/SocialButton'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

const { width, height } = Dimensions.get('window')

const LoginScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation();
  const { login, google, apple } = useContext(AuthContext);

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
            <Text style={styles.su}>Sign In</Text>
          </View>


          <View style={styles.inputContainer}>

            <TextInput
              placeholder="email"
              value={email}
              onChangeText={text => { setEmail(text) }}
              style={styles.input}

            />

            <TextInput
              placeholder="password"
              value={password}
              onChangeText={text => { setPassword(text) }}
              style={styles.input}
              secureTextEntry

            />

          </View>
          <View style={styles.lineContainer}>
            <View style={{ flex: 1, height: 2, backgroundColor: '#5C4033' }} />
            <View>
              <Text style={{ width: 50, textAlign: 'center', fontFamily: 'Quicksand-Regular' }}>Or</Text>
            </View>
            <View style={{ flex: 1, height: 2, backgroundColor: '#5C4033' }} />
          </View>
          <View style={styles.socialContainer}>
            <SocialButton buttonColor="#ECDCD1" textColor="#785444" text="Continue with Google" social="google" onPress={() => google()} />
            <SocialButton buttonColor="#ECDCD1" textColor="#785444" text="Continue with Apple" social="apple" onPress={() => apple()} />
          </View>

          <OnboardButton buttonColor="#5C4033" textColor="#FFFFFF" text="SIGN IN" onPress={() => login(email, password)} />

        </KeyboardAvoidingView>
      </Animated.View>
    </DismissKeyBoard>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    width: width * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.035,
    marginTop: height * 0.012
  },
  letterContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: width * 0.76,
    marginBottom: height * 0.0005,
    marginTop: -height * 0.02
  },

  socialContainer: {
    marginBottom: height * 0.024
  },


  input: {
    backgroundColor: '#ECDCD1',
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginTop: height * 0.005,
    marginBottom: width * 0.014,
    width: width * 0.77,
    borderStyle: 'solid',
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 1,
    borderColor: 'black',
    opacity: 50,
    fontFamily: 'Quicksand-Bold',
    color: '#785444'
  },
  su: {
    marginBottom: height * 0.01,
    fontSize: 30,
    fontWeight: '800',
    fontFamily: 'Quicksand-Bold',
    color: '#785444',
  },

  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.865,
    marginBottom: height * 0.03,
    opacity: 0.5,
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