import { StyleSheet, Text, View, Dimensions, FlatList, Share } from 'react-native'
import React, { useEffect } from 'react'
import PageBackButton from '../../components/PageBackButton'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import EachFriend from '../../components/EachFriend'
import { TouchableOpacity } from 'react-native-gesture-handler'


const { width, height } = Dimensions.get('window')
const PostLikes = (props) => {

  const navigation = useNavigation();
  const navBack = () => {
    navigation.navigate("DisplayPost", {
        date: props.route.params.date,
        id: props.route.params.id,
        text: props.route.params.text,
        title: props.route.params.title,
        user: props.route.params.user,
        verse: props.route.params.verse,
        verseText: props.route.params.verseText,
        likes: props.route.params.likes,
        comments: props.route.params.comments,
      });
  }



  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <PageBackButton onPress={() => navBack()} />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Likes</Text>
      </View>
      <View style={{ height: height * 0.57, marginTop: height * 0.02 }}>
        <FlatList
          data={props.route.params.likes}
          // keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <EachFriend name={item} onPress={() => { }} showX={false} />
          }
          showsVerticalScrollIndicator={false}
        />
      </View>

    </View>
  )
}

export default PostLikes

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
    alignItems: 'center',
    marginTop: height * 0.02
  },
  title: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 30,
    color: '#785444'
  },

})