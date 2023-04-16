import { StyleSheet, Text, View, Animated, Dimensions, ImageBackground, Alert, Scrollview } from 'react-native'
import React, {useState, useEffect} from 'react'
import PageBackButton from '../../components/PageBackButton'
import { useNavigation } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";
import { ScrollView } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get('window')

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
    <View style={styles.backButtonContainer}>
        <PageBackButton onPress={navBack}/>
      </View>
      <ScrollView>
    <View 
        style={styles.container}
        >
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
    </ScrollView>
    </ImageBackground>
  )
}

export default DisplayPostProfile

const styles = StyleSheet.create({
    container: {
        width: width * 0.8,
        // marginBottom: '20%',
        justifyContent: 'center',
        marginLeft: width * 0.05,
        marginTop: width * 0.1,

        // alignItems: 'center' 
    },

    name: {
        fontFamily: 'Lato-Bold',
        fontSize: 16.5,
        color: '#505050',
        marginBottom: height * 0.005,
        marginTop: height * 0.06
    },
    date: {
        fontFamily: 'Lato-Regular',
        fontSize: 10,
        color: '#505050',
        marginBottom: height * 0.02
    },

    title: {
        fontFamily: 'Lato-Bold',
        fontSize: 23,
        color: '#505050',
        marginBottom: height * 0.022
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
        marginBottom: height * 0.022
    },

    verse: {
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: '#505050', 
        textAlign: 'right',
        marginBottom: height * 0.021,
        marginRight: width * 0.03
    },

    text: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: '#505050', 
        marginRight: width * 0.015,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    backButtonContainer: {
        marginTop: height * 0.11,
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginLeft: width * 0.05
    }
})