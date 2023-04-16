import { StyleSheet, Text, View, Animated, Dimensions, ImageBackground, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import PageBackButton from '../../components/PageBackButton'
import { useNavigation } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";

const DisplayPostProfile = ({route}) => {
    const userId = firebase.auth().currentUser.uid;
    const navigation = useNavigation();
    const {date, id, text, title, user, verse, verseText} = route.params;

    var dateObj = new Date(date.seconds * 1000);
    var dateNum = dateObj.getDate();
    if(dateNum < 10) {
        dateNum = "0" + dateNum;
    }
    var month = dateObj.getMonth() + 1;
    if(month < 10) {
        month = "0" + month;
    }
    const year = dateObj.getFullYear();
    const dateString = month + "/" + dateNum + "/" + year;
    
    const navBack = () => {
        navigation.navigate("Profile");
    }

    const deleteOP = () => {
        firestore().collection('Posts').doc(userId).collection('userPosts').doc(id).delete().then(() => {
            navigation.navigate("Profile");
        })

    }

    const deletePost = () => {
        Alert.alert('DELETING POST', 'Are you sure?', [
            {
                text: 'Cancel',
                onPress: () => console.log('canceled'),
                style: 'cancel'
            },
            {
                text: 'Ok',
                onPress: deleteOP,
            }
        ])
    }

  return (
    <ImageBackground source={require('../../tree.jpg')} resizeMode="cover" style={styles.image}>
    <View 
        style={styles.container}
        >
     <PageBackButton onPress={navBack}/>
     <View style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignContent:'center',
        alignItems: 'center',
        marginBottom: '1%',
        marginTop: '10%'
     }}>
        <Text style={styles.name}>{user}</Text>
        <TouchableOpacity onPress={deletePost}>
            <Feather name={"trash-2"} size={20} color="#505050"/>
        </TouchableOpacity>
     </View>
      <Text style={styles.date}>{dateString}</Text>
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