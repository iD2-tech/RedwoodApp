import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";
import Feather from 'react-native-vector-icons/Feather'
import EachRequest from '../../components/EachRequest';
import { useNavigation } from '@react-navigation/native';
import DismissKeyBoard from '../../components/DissmisskeyBoard';

const { width, height } = Dimensions.get('window');

const Requests = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [requestUser, setRequestUser] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [friendData, setFriendsData] = useState([]);
  const [username, setUsername] = useState('');
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    setUserInfo();
    requestRender();
    friendsRender();
  }, [user])

  const setUserInfo = () => {
    const userId = firebase.auth().currentUser.uid;
    const userRef = firebase.firestore().collection('Users').doc(userId);
    const unsubscribe1 = userRef.onSnapshot((doc) => {
      if (doc.exists) {
        const { name, username } = doc.data();
        if (user === null) {
          setUser({ name, username });
        }
      }
    });
    return () => unsubscribe1();
  }

  const friendsRender = () => {
    if (user != null) {
      const friendCollection = firestore().collection('Friends');
      const friend1Query = friendCollection.where('relationship', 'array-contains', user.username);
      const unsubscribe = friend1Query.onSnapshot((querySnapshot) => {
        const friendArr = [];
        const friendSet = new Set();
        querySnapshot.forEach((doc) => {
          relationshipArr = doc.data().relationship;
          nameArr = doc.data().names;
          if (relationshipArr[0] === user.username) {
            friendArr.push({ username: relationshipArr[1], name: nameArr[1], id: doc.id + "1" });
            friendSet.add(relationshipArr[1]);
          } else {
            friendArr.push({ username: relationshipArr[0], name: nameArr[0], id: doc.id + "0" });
            friendSet.add(relationshipArr[0]);
          }
        })
        setFriendsData(friendArr);
        setFriends(friendSet);
      })
      return () => unsubscribe();
    } else {
    }
  }

  const requestRender = () => {
    const friendCollection = firestore().collection('FriendRequests');
    var userId = firebase.auth().currentUser.uid;
    const requestQuery = friendCollection.where('target', '==', userId).where('status', '==', '0');
    const unsubscribe = requestQuery.onSnapshot((querySnapshot) => {
      const requestArr = [];
      const requestUsers = new Set();
      querySnapshot.forEach((doc) => {
        requestArr.push({
          username: doc.data().sourceUsername,
          id: doc.data().source,
          name: doc.data().sourceName,
          docID: doc.id
        })

        requestUsers.add(doc.data().sourceUsername);
      })
      setRequestUser(requestUsers);
      setRequestData(requestArr);
    })
    return () => unsubscribe();
  }

  const sendRequest = async () => {
    if (friends.has(username)) {
      Alert.alert('Already friends!');
      return;
    }

    if (username.toLowerCase() === user.username.toLowerCase()) {
      Alert.alert('Thats me!');
      return;
    }

    if (requestUser.has(username)) {
      Alert.alert('Cant request someone that requested you!');
      return;
    }

    var unique = true;
    var userFromDatabase = '';
    var usernameCase = false;
    await firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.data().username.toUpperCase() == username.toUpperCase()) {
            setUsername(documentSnapshot.data().username);
            userFromDatabase = documentSnapshot.data().username;
            unique = false;
            if (friends.has(userFromDatabase)) {
              Alert.alert('Already friends!');
              unique = true;
              usernameCase = true;
              return;
            }
          }
        });
      }).then(() => {
        if (!unique && !usernameCase) {
          var userId = firebase.auth().currentUser.uid;
          const postCollection = firestore().collection('Users')
          const postQuery = postCollection.where('username', '==', userFromDatabase)
          const unsubscribe = postQuery.onSnapshot((querySnapshot) => {
            var id;
            var name;
            querySnapshot.forEach((doc) => {
              id = doc.id
              name = doc.data().name;
            })
            firestore().collection('FriendRequests').doc(userId + '' + id).set({
              source: userId + '',
              sourceUsername: user.username + "",
              sourceName: user.name + "",
              target: id + '',
              targetUsername: userFromDatabase + '',
              targetName: name + '',
              status: '0'
            }).then(() => {
              Alert.alert("Successfully requested!");
              unsubscribe();
            })
          })

        } else if (unique && usernameCase) {
        } else {
          Alert.alert('User does not exist!');
        }
      })
  }

  const accept = (item) => {
    const userId = firebase.auth().currentUser.uid;
    const friendArray = [];
    const nameArray = [];
    const idArray = [];
    friendArray.push(item.username);
    nameArray.push(item.name);
    idArray.push(item.id);
    friendArray.push(user.username);
    nameArray.push(user.name);
    idArray.push(userId);
    firestore().collection('Friends').add({
      ids: idArray,
      relationship: friendArray,
      names: nameArray,
    })
    firestore().collection('FriendRequests').doc(item.docID).delete().then(() => {
    })
  }

  const reject = (item) => {
    firestore().collection('FriendRequests').doc(item.docID).delete().then(() => {
    })
  }

  const navBack = () => {
    navigation.navigate('Profile');
  }


  return (
    <DismissKeyBoard>
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={navBack}><Feather name="arrow-right" size={30} color={'black'} /></TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', width: width * 0.89, justifyContent: 'space-between'}}>
      <View style={styles.searchContainer}>
              <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => setUsername(text)}
                value={username}
                underlineColorAndroid="transparent"
                placeholder="Add Friends"
                placeholderTextColor="#FFE3D7"
              />
      </View>
      <TouchableOpacity
        style={{justifyContent: 'center', alignItems: 'center', height: height * 0.06, width: width * 0.17, borderRadius: 10, backgroundColor: '#785444'}}
        onPress={sendRequest}
      ><Text style={{fontFamily: 'Quicksand-Bold', color: 'white', fontSize: 13}}>SEND</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.myFriends}>
        <View>
          <Text style={{fontFamily: 'Quicksand-Bold', color: '#785444'}}>
            FRIEND REQUESTS
          </Text>
        </View>
        <View style={{ height: height * 0.57, }}>
          <FlatList
            data={requestData}
            // keyExtractor={item => item.id}
            renderItem={({ item }) =>
              <EachRequest name={item.name} username={item.username} item={item} currUser={user} onAccept={() => accept(item)} onReject={() => reject(item)} />
            }
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
    </DismissKeyBoard>
  )
}

export default Requests

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ECDCD1',
    alignItems: 'center',
    flexDirection: 'column',
  },

  searchContainer: {
    height: height * 0.06,
    width: width * 0.70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.013,
    overflow: 'hidden',
    backgroundColor:'#C3A699',
    padding:15,
    borderRadius: 10
  },

  textInputStyle: {
    color: '#FFE3D7',
    fontFamily: 'Quicksand-Bold',
    width: width * 0.63,
    height: height * 0.05,
  },

  backContainer: {
    justifyContent: 'flex-end',
    width: width * 0.89,
    marginBottom: height * 0.02,
    flexDirection: 'row',
    marginTop: height * 0.08
  },

  myFriends: {
    width: width * 0.88,
    marginTop: height * 0.01
  },

})