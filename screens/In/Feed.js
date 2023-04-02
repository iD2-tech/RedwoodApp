import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, ImageBackground, Animated} from 'react-native'
import React, {useContext} from 'react'
import { AuthContext } from '../../navigation/AuthProvider';
import {firebase } from "@react-native-firebase/auth";
import EachPost from '../../components/EachPost';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
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
    user: 'David Hyun',
    date: '04/01/2023',
    title: 'Calling from God',
    verseText: 'Create in me a pure heart, O God, and renew a steadfast spirit within me. Do not cast me from your presence or take your Holy Spirit from me. Restore to me the joy of your salvation and grant me a willing spirit, to sustain me',
    verse: 'Psalm 51:10-12',
    text: 'How can I expect to win my battles entering the battlefield with zero preparation? No armor, no weapon, vulnerable. If I went to war in real life like that Id die in seconds! As it is with my spiritual warfare.'
    + 'I need to spend time with God, dwell and read his word every given opportunity I have, and put on the armor of God if I want to win my battles.',
  },
  {
    id: '3',
    user: 'David Hyun',
    date: '04/01/2023',
    title: 'Calling from God',
    verseText: 'Create in me a pure heart, O God, and renew a steadfast spirit within me. Do not cast me from your presence or take your Holy Spirit from me. Restore to me the joy of your salvation and grant me a willing spirit, to sustain me',
    verse: 'Psalm 51:10-12',
    text: 'How can I expect to win my battles entering the battlefield with zero preparation? No armor, no weapon, vulnerable. If I went to war in real life like that Id die in seconds! As it is with my spiritual warfare.'
    + 'I need to spend time with God, dwell and read his word every given opportunity I have, and put on the armor of God if I want to win my battles.',
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
    user: 'David Hyun',
    date: '04/01/2023',
    title: 'Calling from God',
    verseText: 'Create in me a pure heart, O God, and renew a steadfast spirit within me. Do not cast me from your presence or take your Holy Spirit from me. Restore to me the joy of your salvation and grant me a willing spirit, to sustain me',
    verse: 'Psalm 51:10-12',
    text: 'How can I expect to win my battles entering the battlefield with zero preparation? No armor, no weapon, vulnerable. If I went to war in real life like that Id die in seconds! As it is with my spiritual warfare.'
    + 'I need to spend time with God, dwell and read his word every given opportunity I have, and put on the armor of God if I want to win my battles.',
  },
  {
    id: '6',
    user: 'David Hyun',
    date: '04/01/2023',
    title: 'Calling from God',
    verseText: 'Create in me a pure heart, O God, and renew a steadfast spirit within me. Do not cast me from your presence or take your Holy Spirit from me. Restore to me the joy of your salvation and grant me a willing spirit, to sustain me',
    verse: 'Psalm 51:10-12',
    text: 'How can I expect to win my battles entering the battlefield with zero preparation? No armor, no weapon, vulnerable. If I went to war in real life like that Id die in seconds! As it is with my spiritual warfare.'
    + 'I need to spend time with God, dwell and read his word every given opportunity I have, and put on the armor of God if I want to win my battles.',
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


]



const Feed = () => {

  const y = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: {contentOffset: { y }}}], { useNativeDriver: true})

  return (
    
      <ImageBackground source={require('../../tree.jpg')} resizeMode="cover" style={styles.image}>
      <View style={styles.flatContainer}>
        <AnimatedFlatList 
          scrollEventThrottle={16}
          data={DATA}
          renderItem={({item}) => 
            <EachPost id={item.id} y={y} user={item.user} date={item.date} title={item.title} verseText={item.verseText} verse={item.verse} text={item.text}/>
          }
          keyExtractor={item => item.id}
          {...{onScroll}}
          ListFooterComponent={<View style={{height: 150}}/>}
          showsVerticalScrollIndicator={false}
        />
      </View>
      </ImageBackground>
    
  )
}

export default Feed

const styles = StyleSheet.create({
  flatContainer: {
    marginTop: '80%',
    marginLeft: '10%'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
})