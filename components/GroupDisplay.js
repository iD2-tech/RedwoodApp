import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native'
import React, {useState} from 'react'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get('window')
const GroupDisplay = (props) => {

  return (
    <View 
        style={styles.container}
    >
        <View style={styles.textContainer}>
            <Text style={styles.title}>{props.name}</Text>
            <View style={styles.numberDisplay}>
                <Feather name="users" size={15} color={'#505050'} />
                <Text style={{fontSize: 15, marginLeft: width * 0.006}}>{props.numMembers}</Text>
            </View>
        </View>
        <Text style={{
            marginTop: height * 0.01,
            fontFamily: 'Lato-Regular',
            color: '#505050',
            fontSize: 12,
            width: width * 0.35,
        }}>
            {props.description}
        </Text>


    </View>
  )
}

export default GroupDisplay

const styles = StyleSheet.create({
    container: {
        width: width * 0.45,
        marginBottom: height * 0.01,
        // height: 30,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        // paddingBottom: 30,
        // borderBottomColor: 'black',
        // borderBottomWidth: 1,
        // alignItems: 'center' 
        borderWidth: 1,
        // padding: 15,
        borderColor: "#E4E4E4",
        borderRadius: 10,
        marginLeft: width * 0.01,
        height: height * 0.18,
        alignItems: 'center'
    },

    numberDisplay: {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    textContainer: {
        justifyContent: 'space-between',
        width: width * 0.35,
        flexDirection: 'row',
        marginTop: height * 0.02
        // backgroundColor: 'black'
    },


    title: {
        fontFamily: 'Lato-Bold',
        fontSize: 13,
        color: 'black',
        width: width * 0.2
        // marginBottom: '5%'
    },

    titlePinned: {
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: 'black',
        marginBottom: '5%',
        marginLeft: width * 0.02
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