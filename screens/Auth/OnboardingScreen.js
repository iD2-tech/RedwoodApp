import { StyleSheet, Text, View, TouchableOpacity, Image, Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, {useEffect, useRef} from 'react'
import OnboardButton from '../../components/OnboardButton'

const OnboardingScreen = () => {

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  
  const navigation= useNavigation();

  const navToLogin = () => {
    navigation.navigate("Login");
  }

  const navToSignUp = () => {
    navigation.navigate("Signup");
  }



  return (
    <Animated.View style={{
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: 'white',
      flexDirection: 'column',
      opacity: fadeAnim,
     }}>
      <View style={styles.logoContainer}>
        <Image source={require('../../logo.jpg')} style = {styles.logo}/> 
      </View>  
        <Text style={styles.subText}>
            By clicking Log In or Sign Up, you agree to our Terms. Learn how we process your data in our Privacy Policy and Cookies Policy
        </Text>
      <OnboardButton buttonColor="#505050" textColor="#FFFFFF" text="CREATE ACCOUNT" onPress={navToSignUp}/>
      <OnboardButton buttonColor="#FFFFFF" textColor="#505050" text="SIGN IN" onPress={navToLogin}/>  
    </Animated.View>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({

  logoContainer: {
    marginTop: '20%',
    marginBottom: '40%',
  },

  subText: {
    textAlign: 'center',
    fontSize: 9,
    width: '70%',
    marginBottom: "5%",
    lineHeight: 15,
    fontFamily: 'Lato-Regular',
    color: '#505050'
  },

  logo: {
    resizeMode: 'contain',
    width: 250,
    height: 250,
  }
})