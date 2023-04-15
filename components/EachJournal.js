import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'


const EachJournal = (props) => {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    return (
        <View
            style={styles.container}
        >
            <View style={styles.dateContainer}>
                <Text style={styles.dateNum}>{props.date.getDate()}</Text>
                <Text style={styles.dateVal}>{props.date.toLocaleString('default', { month: 'long' })}</Text>
                <Text style={styles.dateVal}>{props.date.getFullYear()}</Text>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.verse}>{props.verse}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Feather name="chevron-right" size={25} color="#5C4033" />
            </View>
        </View>
    )
}

export default EachJournal

const styles = StyleSheet.create({
    container: {
        width: '95%',
        marginBottom: '5%',
        // height: 30,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // paddingBottom: 30,
        // borderBottomColor: 'black',
        // borderBottomWidth: 1,
        // alignItems: 'center' 
        borderWidth: 1,
        padding: 15,
        borderColor: "#E4E4E4",
        borderRadius: 15
    },

    textContainer: {
        justifyContent: 'center',
        width: '60%',
    },

    dateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonContainer: {
        justifyContent: 'center'
    },

    dateNum: {
        fontFamily: 'Lato-Regular',
        fontWeight: '300',
        fontSize: 17,
        color: 'black',
        marginBottom: '7%'
    },

    dateVal: {
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        color: 'black',
        // marginBottom: '5%'
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
        fontSize: 18,
        color: 'black',
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
        marginBottom: '5%',
    },

    text: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: '#505050',
    }



})