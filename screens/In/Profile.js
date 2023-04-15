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


const { width, height } = Dimensions.get('window')


const DATA = [
  {
    id: '1',
    user: 'David Hyun',
    date: '04/01/2023',
    title: 'Calling from God',
    verseText: 'Create in me a pure heart, O God, and renew a steadfast spirit within me. Do not cast me from your presence or take your Holy Spirit from me. Restore to me the joy of your salvation and grant me a willing spirit, to sustain me',
    verse: 'Psalm 51:10-12',
    text: 'How can I expect to win my battles entering the battlefield with zero preparation? No armor, no weapon, vulnerable. If I went to war in real life like that Id die in seconds! As it is with my spiritual warfare.'
      + 'I need to spend time with God, dwell and read his word every given opportunity I have, and put on the armor of God if I want to win my battles.',
  },
  {
    id: '2',
    user: 'Hanara Nam',
    date: '04/02/2023',
    title: 'Eye on Jesus',
    verseText: 'Then Peter got down out of the boat, walked on the water and came toward Jesus. But when he saw the wind, he was afraid and, beginning to sink, cried out, "Lord, save me!',
    verse: 'Matthew 14:29-30',
    text: 'I realize the importance of starting the day off with God and spending time with him on the daily and keeping my eyes on him. When I begin lacking in my efforts to spend time with God, I find myself falling, living life with worldly vision, indulging in worldly pleasures. Live everyday with my eyes fixed on Jesus, because quite frankly, the world we live in is a storm in itself and once my eyes begin to be distracted with the situations and everything around me, I sink. Following Jesus requires complete focus on him.'
  },
  {
    id: '3',
    user: 'Collin Kim',
    date: '04/03/2023',
    title: 'Rejoice in the Lord!',
    verseText: 'Rejoice in the Lord always. I will say it again: Rejoice!',
    verse: 'Philippians 4:4',
    text: 'How can I expect to win my battles entering the battlefield with zero preparation? No armor, no weapon, vulnerable. If I went to war in real life like that Id die in seconds! As it is with my spiritual warfare.' +
      'I need to spend time with God, dwell and read his word every given opportunity I have, and put on the armor of God if I want to win my battles.'
  },
  {
    id: '4',
    user: 'David Hyun',
    date: '04/04/2023',
    title: 'Calling from God',
    verseText: 'Create in me a pure heart, O God, and renew a steadfast spirit within me. Do not cast me from your presence or take your Holy Spirit from me. Restore to me the joy of your salvation and grant me a willing spirit, to sustain me',
    verse: 'Psalm 51:10-12',
    text: 'How can I expect to win my battles entering the battlefield with zero preparation? No armor, no weapon, vulnerable. If I went to war in real life like that Id die in seconds! As it is with my spiritual warfare.'
      + 'I need to spend time with God, dwell and read his word every given opportunity I have, and put on the armor of God if I want to win my battles.',
  },
  {
    id: '5',
    user: 'Hanara Nam',
    date: '04/05/2023',
    title: 'Eye on Jesus',
    verseText: 'Then Peter got down out of the boat, walked on the water and came toward Jesus. But when he saw the wind, he was afraid and, beginning to sink, cried out, "Lord, save me!',
    verse: 'Matthew 14:29-30',
    text: 'I realize the importance of starting the day off with God and spending time with him on the daily and keeping my eyes on him. When I begin lacking in my efforts to spend time with God, I find myself falling, living life with worldly vision, indulging in worldly pleasures. Live everyday with my eyes fixed on Jesus, because quite frankly, the world we live in is a storm in itself and once my eyes begin to be distracted with the situations and everything around me, I sink. Following Jesus requires complete focus on him.'
  },
  {
    id: '6',
    user: 'Collin Kim',
    date: '04/06/2023',
    title: 'Rejoice in the Lord!',
    verseText: 'Rejoice in the Lord always. I will say it again: Rejoice!',
    verse: 'Philippians 4:4',
    text: 'How can I expect to win my battles entering the battlefield with zero preparation? No armor, no weapon, vulnerable. If I went to war in real life like that Id die in seconds! As it is with my spiritual warfare.' +
      'I need to spend time with God, dwell and read his word every given opportunity I have, and put on the armor of God if I want to win my battles.'
  },
  {
    id: '7',
    user: 'David Hyun',
    date: '04/01/2023',
    title: 'Calling from God',
    verseText: 'Create in me a pure heart, O God, and renew a steadfast spirit within me. Do not cast me from your presence or take your Holy Spirit from me. Restore to me the joy of your salvation and grant me a willing spirit, to sustain me',
    verse: 'Psalm 51:10-12',
    text: 'How can I expect to win my battles entering the battlefield with zero preparation? No armor, no weapon, vulnerable. If I went to war in real life like that Id die in seconds! As it is with my spiritual warfare.'
      + 'I need to spend time with God, dwell and read his word every given opportunity I have, and put on the armor of God if I want to win my battles.',
  },
  {
    id: '8',
    user: 'Hanara Nam',
    date: '04/01/2023',
    title: 'Eye on Jesus',
    verseText: 'Then Peter got down out of the boat, walked on the water and came toward Jesus. But when he saw the wind, he was afraid and, beginning to sink, cried out, "Lord, save me!',
    verse: 'Matthew 14:29-30',
    text: 'I realize the importance of starting the day off with God and spending time with him on the daily and keeping my eyes on him. When I begin lacking in my efforts to spend time with God, I find myself falling, living life with worldly vision, indulging in worldly pleasures. Live everyday with my eyes fixed on Jesus, because quite frankly, the world we live in is a storm in itself and once my eyes begin to be distracted with the situations and everything around me, I sink. Following Jesus requires complete focus on him.'
  },
  {
    id: '9',
    user: 'Collin Kim',
    date: '04/01/2023',
    title: 'Rejoice in the Lord!',
    verseText: 'Rejoice in the Lord always. I will say it again: Rejoice!',
    verse: 'Philippians 4:4',
    text: 'How can I expect to win my battles entering the battlefield with zero preparation? No armor, no weapon, vulnerable. If I went to war in real life like that Id die in seconds! As it is with my spiritual warfare.' +
      'I need to spend time with God, dwell and read his word every given opportunity I have, and put on the armor of God if I want to win my battles.'
  },


]


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
  const allSubscriptions = realm.subscriptions;

  const posts = useQuery(Post);

  const usersPosts = posts.filtered(
    `username == "${user.id}"`
  )

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const usersPostsSubQuery = realm
        .objects('Post')
        .filtered(`user == "${user.id}"`);

      mutableSubs.add(usersPostsSubQuery, { name: 'usersPosts' });
    }).then(() => {
      console.log(allSubscriptions.length);
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

    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View style={styles.nameTop}>
          <Text style={styles.nameText}>name coming...</Text>
          <TouchableOpacity
            onPress={() => logout()}
          >
            <Feather name="log-out" size={25} color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={styles.nameBot}>
          <Text style={styles.userText}>@${user.id}</Text>
        </View>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={usersPosts}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => onItemPress(item)}>
              <EachJournal user={item.user} date={item.createdAt} title={item.title} verseText={item.bibleVerses} verse={item.book + " " + item.chapter + ":" + item.verse} text={item.text} />
            </TouchableOpacity>
          }
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
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
    color: '#505050',
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