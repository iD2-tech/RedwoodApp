import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, ImageBackground, Animated, I18nManager, Alert, TextInput, ActivityIndicator } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import PageBackButton from '../../components/PageBackButton';
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../navigation/AuthProvider';


const { width, height } = Dimensions.get('window')

const Settings = () => {
    const navigation = useNavigation();
    const { logout } = useContext(AuthContext);

    const navToProfile = () => {
        navigation.navigate("Profile");
    }

    const navToMyProfile = () => {
        navigation.navigate("MyProfile");
    }

    const navToDeletedPosts = () => {
        navigation.navigate("DeletedPosts");
    }

    const navToPrivacy = () => {
        navigation.navigate("Privacy");
    }

    return (
        <View style = {styles.container}>
            <View style={{marginRight: width * 0.78, marginTop: height * 0.08,}}>
                <PageBackButton onPress={navToProfile}/>
            </View>
            <View style = {styles.settingsContainer}>
                <Text style={styles.settings}>Settings</Text>
                    <View style={styles.personalContainer}>
                        <Text style={styles.title}>PERSONAL SECTION</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', height: height * 0.05}}>
                                <TouchableOpacity
                                    onPress={() =>  navToMyProfile()}
                                >
                                    <Feather name="user" size={28} color={'#505050'}/>
                                </TouchableOpacity>
                                <Text style={styles.text}>My Profile</Text>
                            </View>
                            {/* <View style={{ flexDirection: 'row', alignItems: 'center', height: height * 0.05}}>
                                <TouchableOpacity
                                    onPress={() =>  navToDeletedPosts()}
                                >
                                    <Feather name="trash-2" size={28} color={'#505050'}/>
                                </TouchableOpacity>
                                <Text style={styles.text}>Recently Deleted</Text>
                            </View> */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', height: height * 0.05}}>
                                <TouchableOpacity
                                    onPress={() =>  navToPrivacy()}
                                >
                                    <Feather name="lock" size={28} color={'#505050'} />
                                </TouchableOpacity>
                                <Text style={styles.text}>Privacy</Text>
                            </View>
                    </View>
                    <View style = {styles.aboutContainer}>
                        <Text style={styles.title}>ABOUT</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', height: height * 0.05}}>
                                <TouchableOpacity
                                    >
                                        <Feather name="share" size={28} color={'#505050'} />
                                </TouchableOpacity>
                                <Text style={styles.text}>Share Redwood</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', height: height * 0.05}}>
                                <TouchableOpacity
                                    >
                                        <Feather name="star" size={28} color={'#505050'}/>
                                </TouchableOpacity>
                                <Text style={styles.text}>Rate Redwood</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', height: height * 0.05}}>
                                <TouchableOpacity
                                    >
                                        <Feather name="help-circle" size={28} color={'#505050'}/>
                                </TouchableOpacity>
                                <Text style={styles.text}>Help</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', height: height * 0.05}}>
                                <TouchableOpacity
                                    >
                                        <Feather name="info" size={28} color={'#505050'}/>
                                </TouchableOpacity>
                                <Text style={styles.text}>About Us</Text>
                            </View>
                    </View>
                    <View style = {styles.logoutContainer}>
                        <Text style={styles.title}>LOG OUT</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', height: height * 0.05}}>
                                    <TouchableOpacity
                                        onPress={() =>  logout()}
                                    >
                                        <Feather name="log-out" size={28} color={'#505050'}/>
                                    </TouchableOpacity>
                                <Text style={styles.text}>Log Out</Text>
                            </View>
                    </View>
            </View>
        </View>
    )
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingsContainer:{
        flex: 1,
        width: width * 0.7,
        alignitems: 'center',
        marginTop: height * 0.07,
        marginBottom: height * 0.07,
    },
    settings: {
        marginTop: height * -0.055,
        marginBottom: height * 0.04,
        fontSize: 29,
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        color: '#505050',
        paddingBottom: '3%',
    },
    personalContainer: {
        height: height * 0.18,
        width: width * 0.7,
    },
    title: {
        fontSize: 15,
        fontFamily: 'Helvetica',
        fontWeight: 600,
        color: '#505050',
        marginBottom: height * 0.015,
    },
    text: {
        fontSize: 17.5,
        fontFamily: 'Helvetica',
        fontWeight: 600,
        color: '#505050',
        marginLeft: width * 0.15,
    },
    aboutContainer: {
        height: height * 0.28,
        width: width * 0.7,
    },
    logoutContainer: {
        height: height * 0.235,
        width: width * 0.7,
    },
})
