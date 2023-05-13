import React, { useState, useEffect, useContext } from 'react'
import {Switch, StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, ImageBackground, Animated, I18nManager, Alert, TextInput, ActivityIndicator } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import PageBackButton from '../../components/PageBackButton';
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";


const { width, height } = Dimensions.get('window')

const Privacy = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const navigation = useNavigation();

    const navToSettings = () => {
        navigation.navigate("Settings");
    }

    return (
        <View style = {styles.container}>
            <View style={{marginRight: width * 0.78, marginTop: height * 0.08,}}>
                <PageBackButton onPress={navToSettings}/>
            </View>
            <View style = {styles.privacyContainer}>
                <Text style={styles.privacy}>Privacy</Text>
                <View style = {styles.accountPrivacyContainer}>
                    <Text style={styles.accountPrivacy}>Account Privacy</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                            >
                                <Feather name="lock" size={25} color={'#505050'} />
                        </TouchableOpacity>
                        <Text style={styles.privateAccount}>Private Account</Text>
                    </View>
                    <View style = {styles.switch}> 
                        <Switch 
                            trackColor={{false: '#767577', true: '#5C4033'}}
                            thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                            ios_backgroundColor="#A59E9E"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
};

export default Privacy;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    privacyContainer: {
        flex: 1,
        width: width * 0.7,
        alignitems: 'center',          
        marginTop: height * 0.07,
        marginBottom: height * 0.07,
    },
    privacy: {
        marginTop: height * -0.055,
        marginBottom: height * 0.04,
        fontSize: 29,
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        color: '#505050',
        paddingBottom: '3%',
    },
    accountPrivacyContainer: {
        height: height * 0.23,
        width: width * 0.9,
    },
    accountPrivacy: {
        fontSize: 18,
        fontFamily: 'Helvetica',
        fontWeight: 600,
        color: '#505050',
        marginBottom: height * 0.02,
    },
    privateAccount: {
        fontSize: 16.5,
        fontFamily: 'Helvetica',
        fontWeight: 600,
        color: '#505050',
        marginLeft: width * 0.09,
        marginRight: width * 0.2
    },
    switch: {
        transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }],
        marginTop: -height * 0.0315,
        marginLeft: width * 0.54,
    },
})