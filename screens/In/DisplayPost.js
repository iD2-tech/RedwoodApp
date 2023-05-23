import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native'
import React, { useState } from 'react'
import PageBackButton from '../../components/PageBackButton'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

const DisplayPost = (props) => {
    const navigation = useNavigation();

    const navBack = () => {
        navigation.navigate("Home")
    }

    return (
        <View style={styles.container}>
            <PageBackButton onPress={navBack} />
            <Text>{props}</Text>
        </View>
    )
}

export default DisplayPost

const styles = StyleSheet.create({
    container: {
        width: width * 0.8,
        marginBottom: width * 0.2,
    },

    name: {
        fontFamily: 'Lato-Bold',
        fontSize: 16.5,
        color: '#505050',
        marginBottom: '1%'
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
    }
})