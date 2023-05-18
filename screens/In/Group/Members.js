import { StyleSheet, Text, View, Dimensions, FlatList, Share } from 'react-native'
import React, { useEffect } from 'react'
import PageBackButton from '../../../components/PageBackButton'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import EachFriend from '../../../components/EachFriend'
import { TouchableOpacity } from 'react-native-gesture-handler'


const { width, height } = Dimensions.get('window')
const Members = (props) => {

  const navigation = useNavigation();
  const navBack = () => {
    console.log(props);
    navigation.navigate("Home")
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Donwload Redwood and join my group! My group code is ' + props.item.id + '!',
        url: 'https://google.com'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <PageBackButton onPress={() => navBack()} />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.item.numMembers} Members</Text>
        <TouchableOpacity
          onPress={onShare}
          style={{marginLeft: width * 0.1}}
        >
          <Feather name="share" size={28} color={'#C3A699'} />
        </TouchableOpacity>
      </View>
      <View style={{ height: height * 0.57, marginTop: height * 0.02 }}>
        <FlatList
          data={props.item.members}
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

export default Members

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
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 30,
    color: '#785444'
  },

})