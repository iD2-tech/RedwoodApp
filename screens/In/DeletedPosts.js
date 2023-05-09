//deletedposts
import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, ImageBackground, Animated, I18nManager, Alert, TextInput, ActivityIndicator } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import PageBackButton from '../../components/PageBackButton';
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";


const { width, height } = Dimensions.get('window')

const DeletedPosts = () => {
    const navigation = useNavigation();

    const navToSettings = () => {
        navigation.navigate("Settings");
    }

    return (
        <View style = {styles.container}>
            <View style={{marginRight: width * 0.78, marginTop: height * 0.08,}}>
                <PageBackButton onPress={navToSettings}/>
            </View>
            <View style = {styles.deletedPostsContainer}>
                <Text style={styles.recentlyDeleted}>Recently Deleted</Text>
            </View>
        </View>
    )
};

export default DeletedPosts;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deletedPostsContainer: {
        flex: 1,
        width: width * 0.7,
        alignitems: 'center',          
        marginTop: height * 0.07,
        marginBottom: height * 0.07,
    },
    recentlyDeleted: {
        marginTop: height * -0.055,
        marginBottom: height * 0.04,
        fontSize: 25,
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        color: '#505050',
        paddingBottom: '3%',
    },
})