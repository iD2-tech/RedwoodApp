import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList, SafeAreaView, ImageBackground, RefreshControl} from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../../navigation/AuthProvider';
import EachPost from '../../components/EachPost';
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';

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
    date: '04/01/2023',
    title: 'Eye on Jesus',
    verseText: 'Then Peter got down out of the boat, walked on the water and came toward Jesus. But when he saw the wind, he was afraid and, beginning to sink, cried out, "Lord, save me!',
    verse: 'Matthew 14:29-30',
    text: 'I realize the importance of starting the day off with God and spending time with him on the daily and keeping my eyes on him. When I begin lacking in my efforts to spend time with God, I find myself falling, living life with worldly vision, indulging in worldly pleasures. Live everyday with my eyes fixed on Jesus, because quite frankly, the world we live in is a storm in itself and once my eyes begin to be distracted with the situations and everything around me, I sink. Following Jesus requires complete focus on him.'
  },
  {
    id: '3',
    user: 'Collin Kim',
    date: '04/01/2023',
    title: 'Rejoice in the Lord!',
    verseText: 'Rejoice in the Lord always. I will say it again: Rejoice!',
    verse: 'Philippians 4:4',
    text: 'How can I expect to win my battles entering the battlefield with zero preparation? No armor, no weapon, vulnerable. If I went to war in real life like that Id die in seconds! As it is with my spiritual warfare.' +
    'I need to spend time with God, dwell and read his word every given opportunity I have, and put on the armor of God if I want to win my battles.'
  },
  {
    id: '4',
    user: 'David Hyun',
    date: '04/01/2023',
    title: 'Calling from God',
    verseText: 'Create in me a pure heart, O God, and renew a steadfast spirit within me. Do not cast me from your presence or take your Holy Spirit from me. Restore to me the joy of your salvation and grant me a willing spirit, to sustain me',
    verse: 'Psalm 51:10-12',
    text: 'How can I expect to win my battles entering the battlefield with zero preparation? No armor, no weapon, vulnerable. If I went to war in real life like that Id die in seconds! As it is with my spiritual warfare.'
    + 'I need to spend time with God, dwell and read his word every given opportunity I have, and put on the armor of God if I want to win my battles.',
  },
  {
    id: '5',
    user: 'Hanara Nam',
    date: '04/01/2023',
    title: 'Eye on Jesus',
    verseText: 'Then Peter got down out of the boat, walked on the water and came toward Jesus. But when he saw the wind, he was afraid and, beginning to sink, cried out, "Lord, save me!',
    verse: 'Matthew 14:29-30',
    text: 'I realize the importance of starting the day off with God and spending time with him on the daily and keeping my eyes on him. When I begin lacking in my efforts to spend time with God, I find myself falling, living life with worldly vision, indulging in worldly pleasures. Live everyday with my eyes fixed on Jesus, because quite frankly, the world we live in is a storm in itself and once my eyes begin to be distracted with the situations and everything around me, I sink. Following Jesus requires complete focus on him.'
  },
  {
    id: '6',
    user: 'Collin Kim',
    date: '04/01/2023',
    title: 'Rejoice in the Lord!',
    verseText: 'Rejoice in the Lord always. I will say it again: Rejoice!',
    verse: 'Philippians 4:4',
    text: 'How can I expect to win my battles entering the battlefield with zero preparation? No armor, no weapon, vulnerable. If I went to war in real life like that Id die in seconds! As it is with my spiritual warfare.' +
    'I need to spend time with God, dwell and read his word every given opportunity I have, and put on the armor of God if I want to win my battles.'
  },


]



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
          friendArr.push({username: relationshipArr[1], name: nameArr[1], ids: idArr[1]});
        } else {
          friendArr.push({username: relationshipArr[0],  name: nameArr[0], ids: idArr[0]});
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
      <ImageBackground source={require('../../tree.jpg')} resizeMode="cover" style={styles.image}>
      <MaskedView
        style={styles.flatContainer}
        maskElement=
        {<LinearGradient style={{ flex: 1, }} colors={['transparent', 'white']} locations={[0, 0.22]}/>}
      >
       <FlatList
          contentContainerStyle={{ paddingTop: height * 0.15}}
          data={posts}
          keyExtractor={item => item.id}
          renderItem={({item}) => 
            <EachPost user={item.user} date={item.date} title={item.title} verseText={item.verseText} verse={item.verse} text={item.text}/>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        />
       
    </MaskedView>
    </ImageBackground>
    
  )
}

export default Feed

const styles = StyleSheet.create({
  flatContainer: {
    marginTop: height * 0.12,
    marginLeft: width * 0.095,
    justifyContent: 'center',
    alignContent: 'center'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  }, 
})