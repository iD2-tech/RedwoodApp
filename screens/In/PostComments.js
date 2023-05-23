import { StyleSheet, Text, View, Dimensions, FlatList, Share } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageBackButton from '../../components/PageBackButton'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import EachFriend from '../../components/EachFriend'
import { TouchableOpacity } from 'react-native-gesture-handler'
import EachComment from '../../components/EachComment'


const { width, height } = Dimensions.get('window')
const PostComments = (props) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(parseComments(props.route.params.comments));
  }, [])

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

  const parseComments = (comments) => {
    let parsedComments = [];
    let key = 0;
    comments.forEach(comment => {
      let divIndexStart = comment.indexOf('|div|');
      let divIndexEnd = divIndexStart + 5;
      let commentUser = comment.slice(0, divIndexStart);
      let commentContent = comment.slice(divIndexEnd);
      let feed = { username: commentUser, comment: commentContent, key: key };
      key++;
      parsedComments.push(feed);
    });
    return parsedComments;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <PageBackButton onPress={() => navBack()} />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Comments</Text>
      </View>
      <View style={{ height: height * 0.57, marginTop: height * 0.02 }}>
        <FlatList
          data={comments}
          keyExtractor={item => item.key}
          renderItem={({ item }) => <EachFriend name={item.username} username={item.comment} showX={false} onPress={() => { }} />}
          showsVerticalScrollIndicator={false}
        />
      </View>

    </View>
  )
}

export default PostComments

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