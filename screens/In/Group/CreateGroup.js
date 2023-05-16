import { StyleSheet, Text, View, Dimensions, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import PageBackButton from '../../../components/PageBackButton'
import { useNavigation } from '@react-navigation/native'
import OnboardButton from '../../../components/OnboardButton'
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";
import { RotationGestureHandler } from 'react-native-gesture-handler'


const { width, height } = Dimensions.get('window')
const CreateGroup = ({ route }) => {

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  const { user } = route.params


  const navBack = () => {
    navigation.navigate("GroupMain")
  }


  const createGroup = () => {
    const userId = firebase.auth().currentUser.uid;
    const groupRef = firebase.firestore().collection('Groups').doc(code);
    groupRef.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        Alert.alert("code taken")
      } else {
        const moderator = [];
        moderator.push(user.username)
        const memberIds = [];
        memberIds.push(userId)
        firestore().collection('Groups').doc(code).set({
          name: name,
          description: description,
          moderators: moderator,
          members: moderator,
          numMembers: 1,
          memberIds: memberIds
        }).then(() => {
          navigation.navigate('GroupMain')
        })

      }
    });
  }



  return (
    <View style={styles.container}>
      <View style={{
        width: width * 0.85,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: height * 0.1
      }}>
        <PageBackButton onPress={() => navBack()} />
      </View>

      <View style={{
        width: width * 0.75,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: height * 0.01,
        // alignItems: 'center'
      }}>
        <Text style={{
            fontFamily:'Quicksand-Bold',
            fontSize: 25,
            color:"#785444"
        }}>CREATE A CODE</Text>
        <Text style={{
           fontFamily:'Quicksand-Bold',
           fontSize: 15,
           color:"#785444",
           marginTop: height * 0.005
        }}>
          to make a new group!
        </Text>
      </View>
      <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Group Name"
                    value={name}
                    onChangeText={text => {setName(text)}}
                    style={styles.input}                 
                />
                
                <TextInput 
                    placeholder="Group Code (5 characters)"
                    maxLength={5}
                    value={code}
                    onChangeText={text => {setCode(text)}}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Group Description..."
                    multiline
                    numberOfLines={4}
                    style={styles.input2}
                    value={description}
                    onChangeText={text => { setDescription(text) }}
                  />
            </View>
            <OnboardButton buttonColor="#785444" fontFamily= "Quicksand-Bold" textColor="#FFFFFF" text="CREATE" onPress={createGroup}/>
    </View>
  )
}

export default CreateGroup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ECDCD1',
    alignItems: 'center'
},
inputContainer: {
  width: width * 0.8,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: height * 0.05,
  marginTop: height * 0.02
},
input: {
  backgroundColor: '#ECDCD1',
  paddingHorizontal: 5,
  paddingVertical: 10,
  marginTop: height * 0.02,
  marginBottom: height * 0.008,
  width: width * 0.77,
  borderStyle: 'solid',
  borderBottomColor: '#785444',
  borderBottomWidth: 1,
  borderColor: 'black',
  opacity: 50,
  fontFamily: 'Quicksand-Bold'
},
input2: {
  backgroundColor: '#ECDCD1',
  paddingHorizontal: 5,
  paddingVertical: 10,
  marginTop: height * 0.03,
  marginBottom: height * 0.008,
  width: width * 0.77,
  borderStyle: 'solid',
  borderBottomColor: '#785444',
  borderBottomWidth: 1,
  borderColor: 'black',
  opacity: 50,
  fontFamily: 'Quicksand-Bold'
},

})