import { StyleSheet, Text, View, Dimensions, FlatList, Share } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageBackButton from '../../../components/PageBackButton'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import EachMember from '../../../components/EachMember'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";

const { width, height } = Dimensions.get('window')
const Members = (props) => {
  let globalIDArray = [];
  let globalRequestsToUser = [];
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState(null);
  const [requestIDs, setRequestIDs] = useState([]);
  const [friendsData, setFriendsData] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [requestsToUser, setRequestsToUser] = useState([]);
  const [requestsFromUser, setRequestsFromUser] = useState([]);
  const [requests, setRequests] = useState([]);
  
  useEffect(() => {

    setUserInfo();
    requestRender();
    requestRenderFromUser();
    console.log("test");

  }, [user, friends, relationships]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Donwload Redwood and join my group! My group code is ' + props.item.id + '!',
        url: 'https://google.com'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  const requestRender = async () => {
    let idArray = [];
    const friendCollection = firestore().collection('FriendRequests');
    var userId = firebase.auth().currentUser.uid;
    const requestQuery = friendCollection.where('target', '==', userId).where('status', '==', '0');
    const unsubscribe = requestQuery.onSnapshot((querySnapshot) => {
      const requestUsers = new Set();
      querySnapshot.forEach((doc) => {
        idArray.push(doc.data().sourceUsername + "|div|" + doc.id)
        requestUsers.add(doc.data().sourceUsername);
      })
      setRequests(requestUsers);
      globalIDArray = idArray;
      globalRequestsToUser = requestUsers;
      if (JSON.stringify(requestsToUser) != JSON.stringify(requestUsers)) {
        setRequestsToUser(requestUsers);
      }
      
    })
    return () => unsubscribe();
  }

  const requestRenderFromUser = async () => {
    let idArray = [];
    const friendCollection = firestore().collection('FriendRequests');
    var userId = firebase.auth().currentUser.uid;
    const requestQuery = friendCollection.where('source', '==', userId).where('status', '==', '0');
    const unsubscribe = requestQuery.onSnapshot((querySnapshot) => {
      const requestUsers = new Set();
      querySnapshot.forEach((doc) => {
        idArray.push(doc.data().targetUsername + "|div|" + doc.id);
        requestUsers.add(doc.data().targetUsername);
      })
      setRequestsFromUser(requestUsers);
      const temp = globalIDArray.concat(idArray);
      setRequestIDs(temp);
      setFriendsInfo(requestUsers);
    })
    return () => unsubscribe();
  }

  const setUserInfo = async () => {
    const userId = firebase.auth().currentUser.uid;
    const userInfo = await firestore().collection('Users').doc(userId).get();
    const { name, username } = userInfo.data();
    if (user === null) {
      setUser({ name, username });
    }
  }

  const setFriendsInfo = async (requestsFromUserParam) => {
    if (user != null && requestsToUser != null) {
      const friendCollection = firestore().collection('Friends');
      const friend1Query = friendCollection.where('relationship', 'array-contains', user.username);
      const unsubscribe = friend1Query.onSnapshot((querySnapshot) => {
        const friendArr = [];
        const friendSet = new Set();
        querySnapshot.forEach((doc) => {
          relationshipArr = doc.data().relationship;
          nameArr = doc.data().names;
          if (relationshipArr[0] === user.username) {
            friendArr.push({ username: relationshipArr[1], name: nameArr[1], id: doc.id });
            friendSet.add(relationshipArr[1]);
          } else {
            friendArr.push({ username: relationshipArr[0], name: nameArr[0], id: doc.id });
            friendSet.add(relationshipArr[0]);
          }
        })
        if (JSON.stringify(friends) != JSON.stringify(friendSet)) {
          setFriendsData(friendArr);
          setFriends(friendSet);
        }
        let relArray = [];
        let index = 0;
        props.item.members.forEach(friend => {
          // already friends
          if (friendSet.has(friend) || user.username == friend) {
            relArray.push({ member: friend, friendStatus: 1, id: index, memberId: props.item.memberIds[index], memberName: props.item.memberNames[index] });

            // that member has requested current user
          } else if (globalRequestsToUser.length != 0 && globalRequestsToUser.has(friend)) {
            relArray.push({ member: friend, friendStatus: 2, id: index, memberId: props.item.memberIds[index], memberName: props.item.memberNames[index] });

            // current user has requested that member
          } else if (requestsFromUserParam.length != 0 && requestsFromUserParam.has(friend)) {
            relArray.push({ member: friend, friendStatus: 3, id: index, memberId: props.item.memberIds[index], memberName: props.item.memberNames[index] });

            // no requests between users
          } else {
            relArray.push({ member: friend, friendStatus: 0, id: index, memberId: props.item.memberIds[index], memberName: props.item.memberNames[index] });
          }
          index++;
        });
        if (JSON.stringify(relationships) != JSON.stringify(relArray)) {
          setRelationships(relArray);
        }

      })
      return () => unsubscribe();
    }
  }

  const navBack = () => {
    navigation.navigate("Home")
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <PageBackButton onPress={() => navBack()} />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.item.numMembers} Members</Text>
        <TouchableOpacity
          onPress={() => onShare()}
          style={{ marginLeft: width * 0.1 }}
        >
          <Feather name="share" size={28} color={'#C3A699'} />
        </TouchableOpacity>
      </View>
      <View style={{ height: height * 0.69, marginTop: height * 0.02 }}>
        <FlatList
          data={relationships}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <EachMember name={item.member} friendStatus={item.friendStatus} memberId={item.memberId} user={user} idArray={requestIDs} memberName={item.memberName} requests={requests}/>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>

    </View>
  )
}

export default Members

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ECDCD1',
    alignItems: 'center'
  },
  numberDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: width * 0.2
  },
  topBar: {
    width: width * 0.85,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: height * 0.08
  },
  titleContainer: {
    width: width * 0.85,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 30,
    color: '#785444'
  },

})
