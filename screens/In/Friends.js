import { StyleSheet, Text, View, FlatList, Dimensions, TextInput, Alert, LogBox } from 'react-native'
import React, {useState, useEffect} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";
import OnboardingScreen from '../Auth/OnboardingScreen';
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import EachFriend from '../../components/EachFriend';

LogBox.ignoreAllLogs();


friendsdata = [
  {
    id: '1',
    username: 'ckim'
  },
  {
    id: '2',
    username: 'jxhanara'
  },
]

// requestsdata = [
//   {
//     id: '1',
//     username: 'nicolejoe'
//   },
//   {
//     id: '2',
//     username: 'johnslee'
//   },
//   {
//     id: '3',
//     username: 'irisgkim'
//   },
// ]
const { width, height } = Dimensions.get('window')
const Friends = ({route}) => {

  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [requests, setRequests] = useState([]);
  const [user, setUser] = useState(null);
  const [requestData, setRequestData] = useState([]);
  const [friendData, setFriendsData] = useState([]);
  const [friends, setFriends] = useState([]);
  const [counter, setCounter] = useState(0);
  const [unique, setUnique] = useState(false);
  const [requestUser, setRequestUser] = useState([]);
  // const [requestSent, setRequestSent] = useState([]);

  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log('useEffect run')
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
        if(user === null) {
          setUser({ name, username });
        }     
      }
    });

    return () => unsubscribe1();
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
            friendArr.push({username: relationshipArr[1], name: nameArr[1], id: doc.id});
            friendSet.add(relationshipArr[1]);
          } else {
            friendArr.push({username: relationshipArr[0],  name: nameArr[0], id: doc.id});
            friendSet.add(relationshipArr[0]);
          }
      })
      setFriendsData(friendArr);
      setFriends(friendSet);
    })
    return () => unsubscribe();
  } else {
    console.log('hi')
  }
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
    await firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.data().username.toUpperCase() == username.toUpperCase()) {

            unique = false;
          }
        });
      }).then(() => {
        if(!unique) {
          var userId = firebase.auth().currentUser.uid;
          const postCollection = firestore().collection('Users')
          const postQuery = postCollection.where('username','==', username)
          const unsubscribe = postQuery.onSnapshot((querySnapshot) => {
            var id;
            var name;
            querySnapshot.forEach((doc) => {
              id = doc.id
              name = doc.data().name;
              })
      
              firestore().collection('FriendRequests').doc(userId+''+id).set({
                source: userId + '',
                sourceUsername: user.username+"",
                sourceName: user.name+"",
                target: id+ '',
                targetUsername: username+ '',
                targetName: name+'',
                status: '0'
              })
            })

        } else {
          Alert.alert('User does not exist!')
        }
      })
    }

    const navBack = () => {
      navigation.navigate('Profile');
    }

    const deleteFriend = (item) => {
      firestore().collection('Friends').doc(item.id).delete().then(() => {
        console.log("Friend removed")
      })
    }

  

  return (
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
              />
      </View>
      <TouchableOpacity
        style={{justifyContent: 'center', alignItems: 'center', height: height * 0.06, width: width * 0.17, borderRadius: 10, backgroundColor: '#505050'}}
        onPress={sendRequest}
      ><Text style={{fontFamily: 'Lato-Regular', color: 'white', fontSize: 13}}>SEND</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.myFriends}>
        <View>
          <Text style={{fontFamily: 'Lato-Bold', color: '#505050'}}>
            MY FRIENDS
          </Text>
        </View>
        <View style={{height: height * 0.57}}>
        <FlatList
          data={friendData}
          // keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <EachFriend name={item.name} username={item.username} onPress={() => deleteFriend(item)}/>
          }
          showsVerticalScrollIndicator={false}
        />
        </View>
      </View>
    </View>
  )
}

export default Friends

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: 'white',
      alignItems: 'center',
      flexDirection:'column',
      // alignContent: 'center'
    },

    searchContainer: {
      height: height * 0.06,
      width: width * 0.70,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: height * 0.013,
      overflow: 'hidden',
      // borderWidth: 1,
      backgroundColor:'#F4F4F4',
      padding:15,
      borderRadius: 10
    },

    backContainer: {
      justifyContent:'flex-end',
      width: width * 0.89,
      marginBottom: height * 0.02,
      flexDirection: 'row',
      marginTop: height * 0.08
    },

    myFriends: {
      width: width * 0.88,
      marginTop: height * 0.01
    }

    // friendsContainer: {
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   flexDirection: 'column',
    // },

    // text: {
    //   fontFamily: 'Lato-Bold',
    //   fontSize: 20
    // }

})