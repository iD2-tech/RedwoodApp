import { KeyboardAvoidingView, StyleSheet, Text, TextInput, Dimensions,TouchableOpacity, View, Image, TouchableWithoutFeedback, Keyboard, Animated } from 'react-native'
import React, {useState, useContext, useRef, useEffect} from 'react'
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
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigation = useNavigation();
    const {google, apple} = useContext(AuthContext);

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);

    const navBack= () => {
        navigation.navigate("Onboarding"); 
    }

    const navNext= () => {
      if (!(password === confirmPassword)) {
        console.log("passwords do not match");
      } else {
        navigation.navigate("UsernameAdd", {
          email: email,
          password: password
        });
      }  
  }


    return (
      <DismissKeyBoard>
         <Animated.View  style={ {
              flex:1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: 'white',
              opacity: fadeAnim
            }}>
        <KeyboardAvoidingView style={{width: '100%', alignItems: 'center',}}> 
          <View style={styles.backButtonContainer}>
            <PageBackButton onPress={navBack}/> 
          </View>   
          <View style={styles.letterContainer}>
            <Text style={styles.su}>Sign Up</Text>
          </View>
         

            <View style={styles.inputContainer}>

                <TextInput 
                    placeholder="email"
                    value={email}
                    onChangeText={text => {setEmail(text)}}
                    style={styles.input}
                    
                />
                
                <TextInput 
                    placeholder="password"
                    value={password}
                    onChangeText={text => {setPassword(text)}}
                    style={styles.input}
                    secureTextEntry
                    
                />

                <TextInput 
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChangeText={text => {setConfirmPassword(text)}}
                    style={styles.input}
                    secureTextEntry
                    
                />    
            
            </View>
            <View style={styles.lineContainer}>
              <View style={{flex: 1, height: 2, backgroundColor: '#505050'}} />
                  <View>
                    <Text style={{width: 50, textAlign: 'center', fontFamily: 'Lato-Regular'}}>Or</Text>
                  </View>
              <View style={{flex: 1, height: 2, backgroundColor: '#505050'}} />
            </View>
          <View style= {styles.socialContainer}>
            <SocialButton buttonColor="#F2F2F2" textColor="#B6B6B6" text="Continue with Google" social="google" onPress={() => google()}/>
            <SocialButton buttonColor="#F2F2F2" textColor="#B6B6B6" text="Continue with Apple" social="apple" onPress={() => apple()}/>
          </View>
            <OnboardButton buttonColor="#505050" textColor="#FFFFFF" text="CONTINUE" onPress={navNext}/>
            
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
        width: width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: height * 0.05,
        marginTop: height * 0.000955
      },
      letterContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: width * 0.76,
        marginBottom: height * 0.06
      },

      
      input: {
        backgroundColor: 'white',
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginTop: height * 0.0005,
        marginBottom: height * 0.008,
        width: width * 0.77,
        borderStyle: 'solid',
        borderBottomColor: '#AAAAAA',
        borderBottomWidth: 1,
        borderColor: 'black',
        opacity: 50,
        fontFamily: 'Lato-Regular'
      },

      lineContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        // flex: 1,
        width: width * 0.865,
        marginTop: height * 0.005,
        marginBottom: height * 0.06,
        opacity: 0.5,

      },
      su: {
        marginBottom: height * 0.025,
        fontSize: 30,
        fontWeight: '800',
        fontFamily: 'Lato-Regular',
        color: '#505050',
        marginLeft: 0
      },

      backButtonContainer: {
        marginTop: height * 0.07,
        marginBottom: height * 0.04,
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width: width * 0.78,
      },

      socialContainer: {
        marginBottom: height * 0.05
      },

})