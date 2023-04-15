import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, ImageBackground } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../navigation/AuthProvider';
import { firebase } from "@react-native-firebase/auth";
import EachPost from '../../components/EachPost';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';


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
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];


  return (
    <ImageBackground source={require('../../tree.jpg')} resizeMode="cover" style={styles.image}>
      

      {/* <MaskedView
        style={styles.flatContainer}
        maskElement=
        {<LinearGradient style={{ flex: 1, }} colors={['transparent', 'white']} locations={[0, 0.3]} />}
      >
        <FlatList
          contentContainerStyle={{ paddingTop: 130 }}
          data={posts}
          renderItem={({ item }) =>
            <EachPost
              user={item.user}
              date={months[item.createdAt.getMonth()] + "/" + item.createdAt.getDate() + "/" + item.createdAt.getFullYear()}
              title={item.title}
              verseText={item.bibleVerses}
              verse={item.book + " " + item.chapter + ":" + item.verse}
              text={item.text} />
          }
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </MaskedView> */}

      
    </ImageBackground>

  )
}

export default Feed

const styles = StyleSheet.create({
  flatContainer: {
    marginTop: '30%',
    marginLeft: '10%',
    justifyContent: 'center',
    alignContent: 'center'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
})