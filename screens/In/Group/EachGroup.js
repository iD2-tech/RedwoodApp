import { StyleSheet, Text, View, Dimensions, FlatList, Alert, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import PageBackButton from '../../../components/PageBackButton'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";
import { TouchableOpacity } from 'react-native-gesture-handler'
import EachGroupPost from '../../../components/EachGroupPost'



const { width, height } = Dimensions.get('window')
const EachGroup = (props) => {
  const monthNames = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const userId = firebase.auth().currentUser.uid;
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (username === '') {
      const userRef = firebase.firestore().collection('Users').doc(userId);
      const unsubscribe = userRef.onSnapshot((doc) => {
        if (doc.exists) {
          const { username } = doc.data();
          setUsername(username);
        }
      });
      return () => {
        unsubscribe();
      }
    }
    renderPosts();
  }, [username])

  const navigation = useNavigation();
  const navBack = () => {
    navigation.navigate("GroupMain")
  }
  const onRefresh = () => {
    setRefreshing(true);
    // Fetch new data here and set it using setData
    renderPosts();
    setRefreshing(false);
  };

  const leaveGroup = () => {
    Alert.alert('LEAVING GROUP', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => console.log('canceled'),
        style: 'cancel'
      },
      {
        text: 'Ok',
        onPress: () => deleteOP(),
      }
    ])
  }

  const deleteOP = () => {
    if (props.item.members.length === 1) {
      firestore().collection('Groups').doc(props.item.id).delete().then(() => {
        navigation.navigate("GroupMain")
      })
    } else {
      firestore().collection('Groups').doc(props.item.id).update({
        members: firebase.firestore.FieldValue.arrayRemove(props.item.currUser),
        memberIds: firebase.firestore.FieldValue.arrayRemove(userId),
      }).then(() => {
        navigation.navigate("GroupMain")
      })
    }
  }

  const navToMembers = () => {
    navigation.navigate("Members");
  }

  const renderPosts = () => {
    const postArr = [];
    const unsubscribeFunctions = [];
    for (let i = 0; i < props.item.memberIds.length; i++) {
      const userPostRef = firestore().collection('Posts').doc(props.item.memberIds[i]).collection('userPosts').where('private', '==', '0').where('date', '>', getStartofToday());
      const unsubscribe = userPostRef.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var verses = doc.data().book + " " + doc.data().chapter + ":" + doc.data().verse;

          var dateObj = new Date(doc.data().date.seconds * 1000);
          const date = dateObj.getDate();
          const month = monthNames[dateObj.getMonth()];
          const year = dateObj.getFullYear();

          const dateString = date + " " + month + " " + year;

          if (doc.data().anonymous === '1') {
            postArr.push({
              user: 'Anonymous Member',
              userId: props.item.memberIds[i].ids,
              date: dateString,
              title: doc.data().title,
              verseText: doc.data().verses,
              verse: verses,
              text: doc.data().text,
              postId: doc.id,
              username: username,
              likes: doc.data().likes,
            })
          } else {
            postArr.push({
              user: props.item.members[i],
              userId: props.item.memberIds[i].ids,
              date: dateString,
              title: doc.data().title,
              verseText: doc.data().verses,
              verse: verses,
              text: doc.data().text,
              postId: doc.id,
              username: username,
              likes: doc.data().likes,
            })
          }
        })
      })
      unsubscribeFunctions.push(unsubscribe);
    }
    setPosts(postArr);
    return () => {
      unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
    };

  }

  function getStartofToday() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const timestamp = firestore.Timestamp.fromDate(now);
    return timestamp;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.backButtonContainer}>


          <PageBackButton onPress={() => navBack()} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.item.name}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.individualButton}>
          <TouchableOpacity onPress={navToMembers}>
            <View style={{alignItems: 'center'}}>
            <Feather name="users" size={20} color={'#785444'} />
            </View>
            
            <Text style={styles.buttonLogo}>members</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.individualButton}>
          <TouchableOpacity >
          <View style={{alignItems: 'center'}}>
            <Feather name="message-circle" size={20} color={'#785444'} />
            </View>
            <Text style={styles.buttonLogo}>chat</Text>
            
          </TouchableOpacity>
        </View>
        <View style={styles.individualButton}>
          <TouchableOpacity >
          <View style={{alignItems: 'center'}}>
            <Feather name="x-circle" size={20} color={'#785444'} />
            </View>
            <Text style={styles.buttonLogo}>leave</Text>
            
          </TouchableOpacity>
        </View>






      </View>
      <View style={{ height: height * 0.62, marginTop: height * 0.05, }}>
        <FlatList
          data={posts}
          keyExtractor={item => item.postId}
          renderItem={({ item }) =>
            <EachGroupPost item={item} user={item.user} likes={item.likes} username={item.username} postId={item.postId} userId={item.userId} date={item.date} title={item.title} verseText={item.verseText} verse={item.verse} text={item.text} />
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        />
      </View>



    </View>
  )
}

export default EachGroup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECDCD1',
    alignItems: 'center',
  },
  numberDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: width * 0.1
  },

  topBar: {
    width: width,
    flexDirection: 'row',
    height: height * 0.13,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: width * 0.03,
    paddingRight: width * 0.03,
  },

  titleContainer: {
    width: width * 0.86,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.045,
  },

  backButtonContainer: {
    width: width * 0.04,
    height: height * 0.045,
  },

  title: {
    fontFamily: 'Quicksand-Bold',
    color: '#785444',
    fontSize: 30
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: height * 0.02,
    width: width * 0.6,

  },

  individualButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },


  buttonLogo: {
    textAlign: 'center',
    fontFamily: 'Quicksand-Regular',
    color: '#785444',
    fontSize: 12,
    marginTop: height * 0.002,
  },
})