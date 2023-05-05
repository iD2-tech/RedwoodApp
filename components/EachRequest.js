import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import  Feather  from 'react-native-vector-icons/Feather'
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";
import { TouchableOpacity } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get('window')
const EachRequest = (props) => {


    // const accept = (item) => { 
    //     console.log(props);
    //     const friendArray = [];
    //     const nameArray = [];
    //     friendArray.push(item.username);
    //     nameArray.push(item.name);
    //     friendArray.push(props.currUser.username);
    //     nameArray.push(props.currUser.name);
    //     firestore().collection('Friends').add({
    //       relationship: friendArray,
    //       names: nameArray,
    //     })
    //     firestore().collection('FriendRequests').doc(item.docID).delete().then(() => {
    //       console.log(item);
    //       // const reqSet = requestSent;
    //       // const index = reqSet.indexOf(username);
    //       // reqSet.splice(index, 1);
    //       // setRequestSent(reqSet);
    //       console.log('deleted');
    //     })
    //   }
  
    //   const reject = (item) => {
    //     firestore().collection('FriendRequests').doc(item.docID).delete().then(() => {
    //       console.log(item);
    //       // const reqSet = requestSent;
    //       // const index = reqSet.indexOf(username);
    //       // reqSet.splice(index, 1);
    //       // setRequestSent(reqSet);
    //       console.log('deleted');
    //     })
    //   }

  return (
    <View style={styles.container}>
    <FontAwesome name="user-circle-o" size={height * 0.055} color="#505050"/>
    <View style={styles.nameContainer}>
        <Text style={{fontFamily:'Lato-Bold', fontSize: height * 0.022}}>{props.name}</Text>
        <Text style={{fontFamily: 'Lato-Regular', fontSize: height * 0.015, color: '#898989'}}>{props.username}</Text>
    </View>
    <View style={styles.buttonsContainer}>
        <TouchableOpacity
            style={{backgroundColor: '#505050', borderRadius: 10, padding: 8, marginRight: width * 0.02}}
            onPress={props.onAccept}
        >
            <Text 
                style={{fontFamily: 'Lato-Bold', fontSize: 12, color: 'white'}}
            >ACCEPT</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={props.onReject}
        >
            <Feather name="x" size={height * 0.02} color="black"/> 
        </TouchableOpacity>
    </View>
      
    </View>
  )
}

export default EachRequest

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        marginTop: height * 0.015
    },

    nameContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: width * 0.04
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width * 0.27
    }

})