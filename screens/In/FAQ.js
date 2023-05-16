import React, { useState, useEffect, useContext } from 'react'
import {ScrollView, Switch, StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, ImageBackground, Animated, I18nManager, Alert, TextInput, ActivityIndicator } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import PageBackButton from '../../components/PageBackButton';
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";
import EachQuestion from '../../components/EachQuestion';


const { width, height } = Dimensions.get('window')

const FAQ = () => {
    const navigation = useNavigation();
    
    const navToSettings = () => {
        navigation.navigate("Settings");
    }

    return (
            <View style = {styles.container}>
            <View style={{marginRight: width * 0.78, marginTop: height * 0.08,}}>
                <PageBackButton onPress={navToSettings}/>
            </View>
            <View style = {styles.faqContainer}>
                <Text style={styles.faq}>FAQ</Text>   
                <View style={{ flexGrow: 1 }}>
                <ScrollView
                    contentContainerStyle={styles.scrollViewContent}
                    showsVerticalScrollIndicator={false}
                    >
                    <View style = {styles.textContainer}>
                        <EachQuestion></EachQuestion>
                    </View>
                    <View style = {styles.bottomPadding}></View>
                </ScrollView>
                </View>
            </View>
        </View>
    )
};

export default FAQ;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECDCD1',
        height: height * 0.91,
        alignItems: 'center',
        justifyContent: 'center',
    },
    faqContainer: {
        flex: 1,    
        marginTop: height * 0.03,
        marginBottom: height * 0.07,
    },
    faq: {
        marginTop: height * -0.02,
        marginBottom: height * 0.04,
        marginLeft: width * 0.105,
        fontSize: 29,
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
        color: '#785444',
    },
    textContainer: {
        marginTop: -height * 0.03,
        width: width,
    },
    text: {
        fontSize: 12.3,
        fontFamily: 'Quicksand',
        fontWeight: '400',
        color: '#785444',
    },
    scrollViewContent: {
        height: height,
        paddingTop: height * 0.04,
        paddingBottom: height * 0.08,
    },
})