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

  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const monthNames = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
    renderFriends();
    console.log(friends);
    renderPosts();
    console.log(posts)
  }, [friends])


  const onRefresh = () => {
    setRefreshing(true);
    // Fetch new data here and set it using setData
    renderPosts();
    setRefreshing(false);
  };

  const renderFriends = () => {
    const userId = firebase.auth().currentUser.uid;
    const friendCollection = firestore().collection('Friends');
    const friend1Query = friendCollection.where('ids', 'array-contains', userId);
    const unsubscribe = friend1Query.onSnapshot((querySnapshot) => {
      const friendArr = [];
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
      console.log(friendArr);
      if (friends === null) {
        setFriends(friendArr);
      }
    })

    return () => unsubscribe();
  }


  const renderPosts = () => {
    if (friends != null) {
      const postArr = [];
      const unsubscribeFunctions = [];
      for (let i = 0; i < friends.length; i++) {
        const userPostRef = firestore().collection('Posts').doc(friends[i].ids).collection('userPosts').where('date', '>', getStartofToday());
        const unsubscribe = userPostRef.onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var verses = doc.data().book + " " + doc.data().chapter + ":" + doc.data().verse;

            var dateObj = new Date(doc.data().date.seconds * 1000);
            const date = dateObj.getDate();
            const month = monthNames[dateObj.getMonth()];
            const year = dateObj.getFullYear();

            const dateString = date + " " + month + " " + year;

            postArr.push({
              user: friends[i].username,
              id: friends[i].ids,
              date: dateString,
              title: doc.data().title,
              verseText: doc.data().verses,
              verse: verses,
              text: doc.data().text,
            })
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


  return (
    <View style={styles.image}>
      {/* <MaskedView
        style={styles.flatContainer}
        maskElement=
        {<LinearGradient style={{ flex: 1, }} colors={['transparent', 'white']} locations={[0, 0.22]} />}
      > */}
      <View style={styles.flatContainer}>
        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <EachPost user={item.user} date={item.date} title={item.title} verseText={item.verseText} verse={item.verse} text={item.text} />
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        />

      {/* </MaskedView> */}
      </View>
    </View>

  )
}

export default Feed

const styles = StyleSheet.create({
  flatContainer: {
    // marginTop: height * 0.12,
    // marginLeft: width * 0.095,
    // justifyContent: 'center',
    // alignContent: 'center'
    // height: height,
    width: width,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
})