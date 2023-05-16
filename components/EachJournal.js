import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native'
import React, {useState} from 'react'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get('window')
const EachJournal = (props) => {

//   const dateArray = props.date.split("/");
 const monthNames = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

 var dateObj = new Date(props.date.seconds * 1000);
 const date = dateObj.getDate();
 const month = monthNames[dateObj.getMonth()];
 const year = dateObj.getFullYear();

  return (
    <View 
        style={styles.container}
    >
        <View style={styles.dateContainer}>
            <Text style={styles.dateNum}>{date}</Text>
            <Text style={styles.dateVal}>{month}</Text>
            <Text style={styles.dateVal}>{year}</Text>
        </View>

        <View style={styles.textContainer}>
                {
                    (props.pinned === "1") ? 
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <FontAwesome name="thumb-tack" size={15} color="black"/>
                            <Text style={styles.titlePinned}>{props.title}</Text>
                        </View>
                    :

                    <Text style={styles.title}>{props.title}</Text>
                }

            <Text style={styles.verse}>{props.verse}</Text>
        </View>

        <View style={styles.buttonContainer}>
            <Feather name="chevron-right" size={25} color="#505050"/>
        </View>
    </View>
  )
}

export default EachJournal

const styles = StyleSheet.create({
    container: {
        width: '91.9%',
        marginBottom: '3%',
        // height: 30,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#DCC6BB',
        // paddingBottom: 30,
        // borderBottomColor: 'black',
        // borderBottomWidth: 1,
        // alignItems: 'center' 
        borderWidth: 1,
        padding: 15,
        borderColor: "#C3A699",
        borderRadius: 15,
        marginLeft: width * 0.02
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
        justifyContent: 'center',
    },

    dateNum: {
        fontFamily: 'Margarine',
        fontWeight: '300',
        fontSize: 17,
        color: '#785444',
        marginBottom: '7%'
    },

    dateVal: {
        fontFamily: 'Margarine',
        fontSize: 15,
        color: '#785444',
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
        fontFamily: 'Margarine',
        fontSize: 18,
        fontWeight: 700,
        color: '#785444',
        marginBottom: '5%'
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
        fontFamily: 'Margarine',
        fontSize: 14,
        color: '#785444', 
        marginBottom: '5%',
    },

    text: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: '#505050', 
    }

    

})