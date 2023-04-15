import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, ImageBackground } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from "@react-native-firebase/auth";
import { AuthContext } from '../../navigation/AuthProvider';
import Feather from 'react-native-vector-icons/Feather'
import EachJournal from '../../components/EachJournal';
import { useQuery, useRealm } from '../../database/RealmConfig';
import { useApp, useUser } from '@realm/react';
import Post from '../../database/Models/Post';



const { width, height } = Dimensions.get('window');

const Profile = ({ route }) => {
  var userId = firebase.auth().currentUser.email;
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);


  const app = useApp();
  const customData = app.currentUser.customData;
  console.log(app.currentUser);
  console.log(customData);
  const user = useUser();
  console.log(user.id);
  const realm = useRealm();

  /*
  const allSubscriptions = realm.subscriptions;

  const posts = useQuery(Post);
  const usersPosts = posts.filtered(
    `user == "${user.id}"`
  )
  */

  // const usersPosts = useQuery('Post').filtered(`user == "${user.id}"`);

  const usersPosts = realm.objects('Post').filtered(`user == "${user.id}"`);


  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const usersPostsSubQuery = realm
        .objects('Post')
        .filtered(`user == "${user.id}"`);
      mutableSubs.add(usersPostsSubQuery, { name: 'usersPosts' });

      // mutableSubs.add(usersPosts);
      console.log(usersPostsSubQuery);
    }).then(() => {
      console.log(usersPosts);
    })
  });

  const navToFeed = () => {
    navigation.navigate("Post");
  }

  const onItemPress = (item) => {
    navigation.navigate("DisplayPost", {
      date: item.date,
      id: item.id,
      text: item.text,
      title: item.title,
      user: item.user,
      verse: item.book + " " + item.chapter + ":" + item.verse,
      verseText: item.bibleVerses
    });
  }


  return (

  <View style = {styles.container}>
    <View style={styles.nameContainer}>
      <View style={styles.nameTop}>
        <Text style={styles.nameText}>name coming...</Text>
        <TouchableOpacity
        onPress = {() => logout()}
         >
        <Feather name="log-out" size={25} color={'#5C4033'}/>
        </TouchableOpacity>
      </View>
      <View style={styles.nameBot}>
        <Text style={styles.userText}>@${user.id}</Text>
      </View>

    <View style={styles.listContainer}>
      <FlatList
          data={usersPosts}
          renderItem={({item}) => 
          <TouchableOpacity onPress={() => onItemPress(item)}>
            <EachJournal user={item.user} date={item.createdAt} title={item.title} verseText={item.bibleVerses} verse={item.book + " " + item.chapter + ":" + item.verse} text={item.text}/>
            </TouchableOpacity>
          }
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
    </View>

  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  nameContainer: {
    flexDirection: 'column',
    width: '80%',
    marginBottom: height * 0.05,
    marginTop: height * 0.07
  },

  nameTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '1%',
    alignItems: 'center'
  },

  nameBot: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%'
  },

  nameText: {
    // marginBottom: 30,
    fontSize: 30,
    fontWeight: '800',
    fontFamily: 'Lato-Regular',
    color: '#5C4033',
    // marginLeft: 0
  },

  userText: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Lato-Regular',
    color: '#ABABAB',
  },

  listContainer: {
    height: height * 0.60,
  }



})