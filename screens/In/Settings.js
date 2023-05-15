import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, ImageBackground, Animated, I18nManager, Alert, TextInput, ActivityIndicator, Share } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import PageBackButton from '../../components/PageBackButton';
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../navigation/AuthProvider';
import * as StoreReview from 'react-native-store-review';


const { width, height } = Dimensions.get('window')

const Settings = () => {
    const navigation = useNavigation();
    const { logout } = useContext(AuthContext);

    const onShare = async () => {
        try {
            const result = await Share.share({
              message:
                'Donwload Redwood and join my community!',
                url: 'https://google.com'
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {
                // shared
              }
            } else if (result.action === Share.dismissedAction) {
              // dismissed
            }
          } catch (error) {
            Alert.alert(error.message);
          }
    }

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
                        <Text style={styles.personal}>PERSONAL SECTION</Text>
                        <Text style={styles.profile}>My Profile</Text>
                        <Text style={styles.deleted}>Recently Deleted</Text>
                        <Text style={styles.privacy}>Privacy</Text>
                        <View style={styles.icons1Container}>
                            <View style={{ flexDirection: 'row'}}>
                                    <TouchableOpacity
                                        onPress={() =>  navToMyProfile()}
                                    >
                                        <Feather name="user" size={28} color={'#505050'} marginBottom={height * 0.019} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row'}}>
                                    <TouchableOpacity
                                        onPress={() =>  navToDeletedPosts()}
                                    >
                                        <Feather name="trash-2" size={28} color={'#505050'} marginBottom={height * 0.019} />
                                    </TouchableOpacity>
                                    
                                </View>
                                <View style={{ flexDirection: 'row'}}>
                                <TouchableOpacity
                                        onPress={() =>  navToPrivacy()}
                                    >
                                        <Feather name="lock" size={28} color={'#505050'} marginBottom={height * 0.019} />
                                </TouchableOpacity>
                                </View>
                            </View>
                    </View>
                    <View style = {styles.aboutContainer}>
                        <Text style={styles.about}>ABOUT</Text>
                            <Text style={styles.share}>Share Redwood</Text>
                            <Text style={styles.rate}>Rate Redwood</Text>
                            <Text style={styles.help}>Help</Text>
                            <Text style={styles.us}>About Us</Text>
                            <View style = {styles.icons2Container}>
                                <View style={{ flexDirection: 'row'}}>
                                    <TouchableOpacity
                                    onPress={onShare}
                                        >
                                            <Feather name="share" size={28} color={'#505050'} marginBottom={height * 0.017} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row'}}>
                                <TouchableOpacity
                                onPress={StoreReview.requestReview}
                                    >
                                        <Feather name="star" size={28} color={'#505050'} marginBottom={height * 0.019}/>
                                </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row'}}>
                                <TouchableOpacity
                                    >
                                        <Feather name="help-circle" size={28} color={'#505050'} marginBottom={height * 0.019}/>
                                </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row'}}>
                                <TouchableOpacity
                                    >
                                        <Feather name="info" size={28} color={'#505050'}marginBottom={height * 0.019}/>
                                </TouchableOpacity>
                                </View>
                            </View>
                    </View>
                    <View style = {styles.logoutContainer}>
                        <Text style={styles.logoutBig}>LOG OUT</Text>
                            <Text style={styles.logoutSmall}>Log Out</Text>
                            <View style = {styles.icons3Container}>
                                <View style={{ flexDirection: 'row'}}>
                                    <TouchableOpacity
                                        onPress={() =>  logout()}
                                    >
                                        <Feather name="log-out" size={28} color={'#505050'} marginBottom={height * 0.019} />
                                    </TouchableOpacity>
                                </View>
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
        height: height * 0.22,
        width: width * 0.7,
    },
    icons1Container: {
        marginTop: -height * 0.158,
        width: width * 0.07
    },
    personal: {
        fontSize: 15,
        fontFamily: 'Helvetica',
        fontWeight: 600,
        color: '#505050',
        marginBottom: height * 0.015,
    },
    profile: {
        fontSize: 17.5,
        fontFamily: 'Helvetica',
        fontWeight: 600,
        color: '#505050',
        marginBottom: height * 0.03,
        marginLeft: width * 0.15,
    },
    deleted: {
        fontSize: 17.5,
        fontFamily: 'Helvetica',
        fontWeight: 600,
        color: '#505050',
        marginBottom: height * 0.03,
        marginLeft: width * 0.15,
    },
    privacy: {
        fontSize: 17.5,
        fontFamily: 'Helvetica',
        fontWeight: 600,
        color: '#505050',
        marginBottom: height * 0.03,
        marginLeft: width * 0.15,
    },
    aboutContainer: {
        height: height * 0.28,
        width: width * 0.7,
    },
    icons2Container: {
        marginTop: -height * 0.2,
        width: width * 0.07
    },
    about: {
        fontSize: 15,
        fontFamily: 'Helvetica',
        fontWeight: 600,
        color: '#505050',
        marginBottom: height * 0.015,
    },
    share: {
        fontSize: 17.5,
        fontFamily: 'Helvetica',
        fontWeight: 600,
        color: '#505050',
        marginBottom: height * 0.027,
        marginLeft: width * 0.15,
    },
    rate: {
        fontSize: 17.5,
        fontFamily: 'Helvetica',
        fontWeight: 600,
        color: '#505050',
        marginBottom: height * 0.027,
        marginLeft: width * 0.15,
    },
    help: {
        fontSize: 17.5,
        fontFamily: 'Helvetica',
        fontWeight: 600,
        color: '#505050',
        marginBottom: height * 0.027,
        marginLeft: width * 0.15,
    },
    us: {
        fontSize: 17.5,
        fontFamily: 'Helvetica',
        fontWeight: 600,
        color: '#505050',
        marginBottom: height * 0.027,
        marginLeft: width * 0.15,
    },
    logoutContainer: {
        height: height * 0.235,
        width: width * 0.7,
    },
    logoutBig: {
        fontSize: 15,
        fontFamily: 'Helvetica',
        fontWeight: 600,
        color: '#505050',
        marginBottom: height * 0.015,
    },
    icons3Container: {
        marginTop: -height * 0.05,
        width: width * 0.07,
    },
    logoutSmall: {
        fontSize: 17.5,
        fontFamily: 'Helvetica',
        fontWeight: 600,
        color: '#505050',
        marginBottom: height * 0.027,
        marginLeft: width * 0.15,
    },
})
