import { StyleSheet, Text, View, Animated, Dimensions, ImageBackground, Alert, Scrollview, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";
import { FlatList, ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window')


const EachComment = (props) => {
    return (
        <View style={styles.container}>
                <Text style={styles.username}>{props.username}</Text>
                <Text style={styles.comment}>{props.comment}</Text>
        </View>
    )
}

export default EachComment;

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        marginBottom: height * 0.013,
        borderBottomWidth: 1,
        paddingBottom: height * 0.013,
        borderBottomColor: '#C3A699',
    },
    username: {
        fontFamily: 'Lato-Bold',
        fontSize: 13,
        color: '#785444',
        paddingBottom: height * 0.003,
    },

    comment: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: '#785444',
    }
})