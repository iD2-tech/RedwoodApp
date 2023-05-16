import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList, SafeAreaView, ImageBackground, RefreshControl } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../navigation/AuthProvider';
import EachPost from '../../components/EachPost';
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const Feed = () => {
  const [posts, setPosts] = useState(null);
  const [friends, setFriends] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [dateTitle, setDateTitle] = useState('');
  const monthNames = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const userId = firebase.auth().currentUser.uid;
  const [postsExist, setPostsExist] = useState(false);
  let tempDate = new Date() + '';
  let dateUnrendered = tempDate.split(' ')[1] + ' ' + tempDate.split(' ')[2];

  useEffect(() => {
    if (username === '') {
      getUsername();
    }

    // renderFriends().then(() => {
    //   renderPosts().then(() => {
    //     setPostsExist(true);
    //   })
    // })
    renderFriends();
    renderPosts();

  }, [friends, username])

  const getUsername = () => {
    setDateTitle(dateUnrendered);
    const userRef = firebase.firestore().collection('Users').doc(userId);
    const unsubscribe = userRef.onSnapshot((doc) => {
      if (doc.exists) {
        const { username, name } = doc.data();
        setName(name);
        setUsername(username);
      }
    });
    return () => {
      unsubscribe();
    }
  }

  const onRefresh = () => {
    setRefreshing(true);
    // Fetch new data here and set it using setData
    renderPosts();
    console.log(friends);
    setRefreshing(false);
  } 

  const renderFriends = async () => {
    const userId = firebase.auth().currentUser.uid;
    const friendCollection = firestore().collection('Friends');
    const friend1Query = friendCollection.where('ids', 'array-contains', userId);
    const unsubscribe = friend1Query.onSnapshot((querySnapshot) => {
      const friendArr = [];
      friendArr.push({username: username, name: name, ids: userId})
      querySnapshot.forEach((doc) => {
        relationshipArr = doc.data().relationship;
        nameArr = doc.data().names;
        idArr = doc.data().ids;
        if (idArr[0] === userId) {
          friendArr.push({ username: relationshipArr[1], name: nameArr[1], ids: idArr[1] });
        } else {
          friendArr.push({ username: relationshipArr[0], name: nameArr[0], ids: idArr[0] });
        }
      }) 
      if (friends === null) {   
        setFriends(friendArr);
      }

    })
    return () => unsubscribe();
  }

  const renderPosts = async () => {
    if (friends != null) {
      let postArr = [];
      let idArr = [];
      const unsubscribeFunctions = [];
      for (let i = 0; i < friends.length; i++) {
        const userPostRef = firestore().collection('Posts').doc(friends[i].ids).collection('userPosts').where('private', '==', '0').where('date', '>', getStartofToday());
        const unsubscribe = userPostRef.onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var verses = doc.data().book + " " + doc.data().chapter + ":" + doc.data().verse;
            var dateObj = new Date(doc.data().date.seconds * 1000);
            const date = dateObj.getDate();
            const month = monthNames[dateObj.getMonth()];
            const year = dateObj.getFullYear();
            const dateString = date + " " + month + " " + year;

            if (doc.data().anonymous === '1') {
              if (!idArr.includes(doc.id)) {
              idArr.push(doc.id);
              postArr.push({
                user: 'Anonymous',
                userId: friends[i].ids,
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
            } else {
              if (!idArr.includes(doc.id)) {
              idArr.push(doc.id);
              postArr.push({
                user: friends[i].username,
                userId: friends[i].ids,
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
  }


  function getStartofToday() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const timestamp = firestore.Timestamp.fromDate(now);
    return timestamp;
  }

  function CallBack(postId, postedUserId, likes) {
    firestore().collection('Posts').doc(postedUserId).collection('userPosts').doc(postId).update({
      likes: likes,
    });
  }

  return (
    <View style={styles.background}>
      <View style={styles.topBar}>
        <Text style={styles.topText}>{dateTitle}</Text>
      </View>
      <View style={styles.flatContainer}>
        {posts != null ?
          <FlatList
            data={posts}
            keyExtractor={item => item.postId}
            renderItem={({ item }) =>
            <EachPost item={item} handleCallback={CallBack} user={item.user} likes={item.likes} username={item.username} postId={item.postId} userId={item.userId} date={item.date} title={item.title} verseText={item.verseText} verse={item.verse} text={item.text} />
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
          />
          :
          <Text style={styles.noEntryText}>No entries yet, encourage your friends to reflect!</Text>
        }
      </View>
    </View>
  );
}

export default Feed;

const styles = StyleSheet.create({
  background: {
    height: height,
    opacity: 1,
  },

  flatContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    // paddingBottom: height * 0.09,
    height: height * 0.76,
  },

  noEntryText: {
    textAlign: 'center',
    color: '#785444',
    fontFamily: 'Quicksand-Regular',
  },

  topText: {
    textAlign: 'center',
    fontSize: 30,
    color: '#785444',
    fontWeight: '500'
  },

  topBar: {
    height: height * 0.15,
    justifyContent: 'flex-end',
    paddingBottom: height * 0.02,
    fontFamily: 'Quicksand-Regular',
  },

  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECDCD1',
  },
})