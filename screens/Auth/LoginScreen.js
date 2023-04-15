import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, TouchableWithoutFeedback, Keyboard, Animated } from 'react-native'
import React, {useState, useContext, useRef, useEffect} from 'react'
import { AuthContext } from '../../navigation/AuthProvider'
import { useNavigation } from '@react-navigation/native'
import DismissKeyBoard from '../../components/DissmisskeyBoard'
import OnboardButton from '../../components/OnboardButton'
import PageBackButton from '../../components/PageBackButton'
import SocialButton from '../../components/SocialButton'
import { GoogleSignin } from '@react-native-google-signin/google-signin'


const LoginScreen = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();
    const {login, google, apple} = useContext(AuthContext);

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
            <Text style={styles.su}>Sign In</Text>
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
            
            </View>
            <View style={styles.lineContainer}>
          <View style={{flex: 1, height: 2, backgroundColor: '#5C4033'}} />
              <View>
                <Text style={{width: 50, textAlign: 'center', fontFamily: 'Lato-Regular'}}>Or</Text>
              </View>
           <View style={{flex: 1, height: 2, backgroundColor: '#5C4033'}} />
          </View>
          <View style= {styles.socialContainer}>
            <SocialButton buttonColor="#F2F2F2" textColor="#B6B6B6" text="Continue with Google" social="google" onPress={() => google()}/>
            <SocialButton buttonColor="#F2F2F2" textColor="#B6B6B6" text="Continue with Apple" social="apple" onPress={() => apple()}/>
          </View>
          
            <OnboardButton buttonColor="#5C4033" textColor="#FFFFFF" text="SIGN IN" onPress={() => login(email, password)}/>
            
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
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10%',
        marginTop: '5%'
      },
      letterContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '75%',
        // marginTop: '35%'
      },

      socialContainer: {
        marginBottom: '15%'
      },

      
      input: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,      
        marginTop: 5,
        marginBottom: 10,
        width: '95%',
        borderStyle: 'solid',
        borderBottomColor: '#AAAAAA',
        borderBottomWidth: 1,
        borderColor: 'black',
        opacity: 50,
        fontFamily: 'Lato-Regular'
      },
      su: {
        marginBottom: 30,
        fontSize: 30,
        fontWeight: '800',
        fontFamily: 'Lato-Regular',
        color: '#5C4033',
        marginLeft: 0
      },

      lineContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        // flex: 1,
        width: '85%',
        // marginTop: '5',
        marginBottom: '10%',
        opacity: 0.5,

      },

      backButtonContainer: {
        // backgroundColor: 'blue'
        marginTop: '20%',
        marginBottom: '10%',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width: '75%'
      }
})