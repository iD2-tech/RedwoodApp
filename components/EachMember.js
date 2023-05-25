import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";

const { width, height } = Dimensions.get('window')
const EachMember = (props) => {
    const [friendStatus, setFriendStatus] = useState();
    const userId = firebase.auth().currentUser.uid;
    const [reqID, setReqID] = useState(''); 

    useEffect(() => {
        
        setFriendStatus(props.friendStatus);
        if (props.friendStatus == 2 || props.friendStatus == 3) {
            props.idArray.forEach(element => {
                if (element.includes(props.name + "|div|")) {
                    let index = element.indexOf("|div|") + 5;
                    setReqID(element.substring(index));
                }
            });
        }
    }, [])
    

    useEffect(() => {

    }, [friendStatus])

    const sendRequest = () => {
        if (props.requests.has(props.name)) {
            Alert.alert('They already requested you!');
            return;
        }
        firestore().collection('FriendRequests').doc(userId + '' + props.memberId).set({
            source: userId + '',
            sourceUsername: props.user.username + "",
            sourceName: props.user.name + "",
            target: props.memberId + '',
            targetUsername: props.name + '',
            targetName: props.name + '',
            status: '0'
          }).then(() => {
            setFriendStatus(3);
          })
        
    }

    const acceptRequest = () => {
        const friendArray = [];
        const nameArray = [];
        const idArray = [];
        friendArray.push(props.name);
        nameArray.push(props.memberName);
        idArray.push(props.memberId);
        friendArray.push(props.user.username);
        nameArray.push(props.user.name);
        idArray.push(userId);
        firestore().collection('Friends').add({
            ids: idArray,
            relationship: friendArray,
            names: nameArray,
        })
        firestore().collection('FriendRequests').doc(reqID).delete().then(() => {
            console.log(reqID);
            console.log("deleted");
        });
        // setFriendStatus(1);
    }

    if (friendStatus == 0) {
        return (
            <View style={styles.container}>
                <FontAwesome name="user-circle-o" size={height * 0.055} color="#C3A699" />
                <View style={styles.nameContainer}>
                    <Text style={styles.usernameText}>{props.name}</Text>
                    <Text style={styles.requestedText}> </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => sendRequest()}>
                        <Feather name='plus-circle' size={22} color='#C3A699' />
                    </TouchableOpacity>
                </View>

            </View>
        )
    } else if (friendStatus == 1) {
        return (
            <View style={styles.container}>
                <FontAwesome name="user-circle-o" size={height * 0.055} color="#C3A699" />
                <View style={styles.nameContainer}>
                    <Text style={styles.usernameText}>{props.name}</Text>
                    <Text style={styles.friendsLabel}>♡friends♡</Text>
                </View>
                <View style={styles.buttonContainer}>
                </View>
            </View>
        )
    } else if (friendStatus == 2) {
        return (
            <View style={styles.container}>
                <FontAwesome name="user-circle-o" size={height * 0.055} color="#C3A699" />
                <View style={styles.nameContainer}>
                    <Text style={styles.usernameText}>{props.name}</Text>
                    <Text style={styles.friendsLabel}>has requested you</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => acceptRequest()}>
                        <Feather name='check' size={22} color='#C3A699' />
                    </TouchableOpacity>
                </View>

            </View>
        )
    } else if (friendStatus == 3) {
        return (
            <View style={styles.container}>
                <FontAwesome name="user-circle-o" size={height * 0.055} color="#C3A699" />
                <View style={styles.nameContainer}>
                    <Text style={styles.usernameText}>{props.name}</Text>
                    <Text style={styles.friendsLabel}>requested</Text>
                </View>
                <View style={styles.buttonContainer}>
                </View>

            </View>
        )
    } else {
        return (<></>)
    }

    /*
return (
            <View style={styles.container}>
                <FontAwesome name="user-circle-o" size={height * 0.055} color="#C3A699" />
                <View style={styles.nameContainer}>
                    <Text style={styles.usernameText}>{props.name}</Text>
                    {props.friendStatus == 1 ?
                        <Text style={styles.friendsLabel}>♡friends♡</Text>
                        :
                        <View>
                            {requested == true ?
                                <Text style={styles.requestedText}>requested</Text>
                                :
                                <Text style={styles.requestedText}> </Text>
                            }
                        </View>
                    }
                </View>
                <View style={styles.buttonContainer}>
                    {props.friendStatus === 0 ?
                        <View>
                            {requested == false ?
                                <TouchableOpacity onPress={() => sendRequest()}>
                                    <Feather name='plus-circle' size={22} color='#C3A699' />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => removeRequest()}>
                                    <Feather name='x-circle' size={22} color='#C3A699' />
                                </TouchableOpacity>
                            }
                        </View>
                        :
                        <></>
                    }


                </View>

            </View>
        )

    */
}

export default EachMember

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: height * 0.015,
        width: width * 0.83,
    },

    nameContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: width * 0.04,
        width: width * 0.45,
    },

    usernameText: {
        fontFamily: 'Quicksand-Bold',
        fontSize: height * 0.022,
        color: '#785444',
    },

    friendsLabel: {
        fontFamily: 'Quicksand-Regular',
        color: '#A47C69',
        fontSize: height * 0.017,
    },

    buttonContainer: {
        width: width * 0.22,
        justifyContent: 'center',
        alignItems: 'center',
    },

    requestedText: {
        fontFamily: 'Quicksand-Regular',
        color: '#A47C69',
        fontSize: height * 0.017,
    }

})