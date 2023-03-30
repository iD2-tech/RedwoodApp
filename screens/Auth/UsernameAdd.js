import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, TouchableWithoutFeedback, Keyboard, Animated } from 'react-native'
import React, {useState, useContext, useRef, useEffect} from 'react'
import { AuthContext } from '../../navigation/AuthProvider'
import { useNavigation } from '@react-navigation/native'
import DismissKeyBoard from '../../components/DissmisskeyBoard'
import OnboardButton from '../../components/OnboardButton'
import PageBackButton from '../../components/PageBackButton'


const UsernameAdd = ({route}) => {

    const {email, password} = route.params;

    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    const [username, setUsername] = useState('')
    const navigation = useNavigation();
    const {register} = useContext(AuthContext);

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);

    const navBack= () => {
        navigation.navigate("Signup");
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
            <Text style={styles.su}>My username is</Text>
          </View>
         

            <View style={styles.inputContainer}>

                <TextInput 
                    placeholder="username"
                    value={username}
                    onChangeText={text => {setUsername(text)}}
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
            <OnboardButton buttonColor="#505050" textColor="#FFFFFF" text="SIGN UP" onPress={() => register(email, password, username)}/>
            
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
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10%',
        // marginTop: '2%'
      },
      letterContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '75%',
        // marginTop: '35%'
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
        color: '#505050',
        marginLeft: 0
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