import { StyleSheet, Text, View, Animated, Dimensions, ImageBackground } from 'react-native'
import React, {useState, useEffect} from 'react'
import PageBackButton from '../../components/PageBackButton'
import { useNavigation } from '@react-navigation/native'


const DisplayPostProfile = ({route}) => {
    const navigation = useNavigation();
    const {date, id, text, title, user, verse, verseText} = route.params;
    
    const navBack = () => {
        navigation.navigate("Profile")
    }

  return (
    <ImageBackground source={require('../../tree.jpg')} resizeMode="cover" style={styles.image}>
    <View 
        style={styles.container}
        >
     <PageBackButton onPress={navBack}/>
      <Text style={styles.name}>{user}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.verseText}>{"\""+verseText.replace(/(\r\n|\n|\r)/gm, "")+"\""}</Text>
      <Text style={styles.verse}>{verse}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
    </ImageBackground>
  )
}

export default DisplayPostProfile

const styles = StyleSheet.create({
    container: {
        width: '80%',
        // marginBottom: '20%',
        justifyContent: 'center',
        marginLeft: '5%',
        marginTop: '20%',
        

        // alignItems: 'center' 
    },

    name: {
        fontFamily: 'Lato-Bold',
        fontSize: 16.5,
        color: '#505050',
        marginBottom: '1%',
        marginTop: '10%'
    },
    date: {
        fontFamily: 'Lato-Regular',
        fontSize: 10,
        color: '#505050',
        marginBottom: '5%'
    },

    title: {
        fontFamily: 'Lato-Bold',
        fontSize: 23,
        color: '#505050',
        marginBottom: '5%'
    },

    quote: {
        fontFamily: 'Lato-Bold',
        fontSize: 17,
        color: '#505050', 

    },

    verseText: {
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: '#505050', 
        marginBottom: '3%'
    },

    verse: {
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: '#505050', 
        textAlign: 'right',
        marginBottom: '5%',
    },

    text: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: '#505050', 
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
      },

    

})