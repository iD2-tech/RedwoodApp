import React, { useState, useEffect, useContext } from 'react'
import {Switch, StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, ImageBackground, Animated, I18nManager, Alert, TextInput, ActivityIndicator } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import PageBackButton from '../../components/PageBackButton';
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";


const { width, height } = Dimensions.get('window')

const AboutUs = () => {
    const navigation = useNavigation();

    const navToSettings = () => {
        navigation.navigate("Settings");
    }

    return (
        <View style = {styles.container}>
            <View style={{marginRight: width * 0.78, marginTop: height * 0.08,}}>
                <PageBackButton onPress={navToSettings}/>
            </View>
            <View style = {styles.aboutUsContainer}>
                <Text style={styles.aboutUs}>About Us</Text>
                <View style = {styles.textContainer}>
                    <Text style={styles.text}>We are a young, passionate team of three software engineers and two designers who are driven by our desire to utilize the skills and abilities we are learning in school to further God's kingdom.{"\n"}{"\n"}

                    Redwood was inspired by a profound experience shared by one of our members during his daily devotionals. Moved by the insights he gained, he eagerly shared them with us through text messages. However, he soon realized the need for a more accessible platform to reach a wider audience. That night, we came together and made the decision to build Redwood. {"\n"}{"\n"}

                    Our vision was clear: we wanted to create an app that goes beyond individual merit and fosters thriving communities through support, care, and love. Our aim is to provide a platform that nurtures a sense of togetherness and promotes growth in faith and community, bridging the gap between believers and non-believers.{"\n"}{"\n"}

                    With our diverse skill sets and shared passion, we are dedicated to crafting an app that not only facilitates the sharing of devotionals but also fosters meaningful connections and encourages spiritual growth. We believe in the power of technology to strengthen relationships, inspire discussions, and deepen one's faith.{"\n"}{"\n"}

                    Join us on this journey as we strive to create a platform that empowers individuals, unites communities, and ultimately brings people closer to God and each other.
                    </Text>
                </View>
            </View>
        </View>
    )
};

export default AboutUs;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECDCD1',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    aboutUsContainer: {
        flex: 1,
        width: width * 0.71,
        alignitems: 'center',          
        marginTop: height * 0.07,
        marginBottom: height * 0.07,
    },
    aboutUs: {
        marginTop: height * -0.055,
        marginBottom: height * 0.04,
        fontSize: 29,
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
        color: '#785444',
        paddingBottom: '3%',
    },
    textContainer: {
        height: height * 0.8, 
        marginTop: -height * 0.02
    },
    text: {
        fontSize: 12.3,
        fontFamily: 'Quicksand',
        fontWeight: '400',
        color: '#785444',
    },
})