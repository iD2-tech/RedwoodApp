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

    const navToAboutUs = () => {
        navigation.navigate("AboutUs");
    }

    const navToFAQ = () => {
        navigation.navigate("FAQ");
    }

    return (
        <View style = {styles.container}>
            <ImageBackground  source={require('../../FeatherNormal.png')} resizeMode="cover" style={{
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
        width: '100%',
        height: '100%',
      }} imageStyle={{
        transform: [
            { scaleY: -1, }, {scaleX: -1}
          ],
          marginLeft: width * 0.2,
        //   marginBottom: height * 0
      }}>
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
                                    <Feather name="user" size={28} color={'#C3A699'}/>
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
                            {/* <View style={{ flexDirection: 'row', alignItems: 'center', height: height * 0.05}}>
                                <TouchableOpacity
                                    onPress={() =>  navToPrivacy()}
                                >
                                    <Feather name="lock" size={28} color={'#C3A699'} />
                                </TouchableOpacity>
                                <Text style={styles.text}>Privacy</Text>
                            </View> */}
                    </View>
                    <View style = {styles.aboutContainer}>
                        <Text style={styles.title}>ABOUT</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', height: height * 0.05}}>
                                <TouchableOpacity
                                onPress={onShare}
                                    >
                                        <Feather name="share" size={28} color={'#C3A699'} />
                                </TouchableOpacity>
                                <Text style={styles.text}>Share Redwood</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', height: height * 0.05}}>
                                <TouchableOpacity
                                onPress={StoreReview.requestReview}
                                    >
                                        <Feather name="star" size={28} color={'#C3A699'}/>
                                </TouchableOpacity>
                                <Text style={styles.text}>Rate Redwood</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', height: height * 0.05}}>
                                <TouchableOpacity
                                        onPress={() =>  navToFAQ()}
                                >
                                        <Feather name="help-circle" size={28} color={'#C3A699'}/>
                                </TouchableOpacity>
                                <Text style={styles.text}>Help</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', height: height * 0.05}}>
                                <TouchableOpacity
                                        onPress={() =>  navToAboutUs()}
                                >
                                        <Feather name="info" size={28} color={'#C3A699'}/>
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
                                        <Feather name="log-out" size={28} color={'#C3A699'}/>
                                    </TouchableOpacity>
                                <Text style={styles.text}>Log Out</Text>
                            </View>
                    </View>
            </View>
            </ImageBackground>
        </View>
    )
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECDCD1',
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
        fontFamily: 'Quicksand-Regular',
        fontWeight: 'bold',
        color: '#785444',
        paddingBottom: '3%',
    },
    personalContainer: {
        height: height * 0.11,
        width: width * 0.7,
    },
    title: {
        fontSize: 15,
        fontFamily: 'Quicksand-Regular',
        fontWeight: 600,
        color: '#785444',
        marginBottom: height * 0.015,
    },
    text: {
        fontSize: 17.5,
        fontFamily: 'Quicksand-Regular',
        fontWeight: 600,
        color: '#785444',
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
