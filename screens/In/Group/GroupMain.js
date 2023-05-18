import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, FlatList, Alert, RefreshControl, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NavigationContainerRefContext, useNavigation } from '@react-navigation/native'
import OnboardButton from '../../../components/OnboardButton'
import GroupDisplay from '../../../components/GroupDisplay'
import Feather from 'react-native-vector-icons/Feather'
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";

const { width, height } = Dimensions.get('window')
const GroupMain = () => {
  const [user, setUser] = useState(null);
  const [groupCode, setGroupCode] = useState('');
  const [show, setShow] = useState(false);
  const [groups, setGroups] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    console.log('run')
    const userId = firebase.auth().currentUser.uid;
    const userRef = firebase.firestore().collection('Users').doc(userId);
    const unsubscribe1 = userRef.onSnapshot((doc) => {
      if (doc.exists) {
        const { name, username } = doc.data();
        if (user === null) {
          setUser({ name, username });
        }
      }
    });

    groupRender();

    return () => unsubscribe1();
  }, [user])

  const onRefresh = () => {
    setRefreshing(true);
    // Fetch new data here and set it using setData
    groupRender();
    setRefreshing(false);
  };

  const groupRender = () => {
    if (user != null) {

      const groupCollection = firestore().collection('Groups');
      const groupQuery = groupCollection.where('members', 'array-contains', user.username);
      const unsubscribe2 = groupQuery.onSnapshot((querySnapshot) => {
        const groupArr = [];
        querySnapshot.forEach((doc) => {
          const {description, members, moderators, name, memberIds } = doc.data();
          groupArr.push({
            id: doc.id,
            description: description,
            name: name,
            numMembers: members.length,
            members: members,
            moderators: moderators,
            currUser: user.username,
            memberIds: memberIds,
          })
        })

        setGroups(groupArr);
      })

      return () => unsubscribe2();
    }
  }

  const navToGroup = (item) => {
    navigation.navigate('EachGroup',
      { item: item,
      }
    );
  }

  const showornoshow = () => {
    setShow(!show);
  }

  const navToCreate = () => {
    navigation.navigate('CreateGroup', {
      user: user,
    });
  }

  const join = () => {
    const userId = firebase.auth().currentUser.uid;
    const groupRef = firebase.firestore().collection('Groups').doc(groupCode);
    groupRef.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        groupRef.update({
          members: firebase.firestore.FieldValue.arrayUnion(user.username),
          memberIds:  firebase.firestore.FieldValue.arrayUnion(userId),
          numMembers: firebase.firestore.FieldValue.increment(1)
        })
      } else {
        Alert.alert("Code doesn't exist!")
      }
    });
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../FeatherGroup.png')}  resizeMode="cover" style={{
        // justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
        width: '100%',
        height: '100%',
      }} imageStyle={{
        marginTop: height * 0.02,
        transform: [
          { scaleX: -1 }
        ]
      }}>
      <View style={{ marginTop: height * 0.1, width: width * 0.9, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 30, color: "#785444", width: width * 0.82 }}>GROUPS</Text>
        {<TouchableOpacity onPress={showornoshow} style={styles.buttonContainer}>
          {
            show ? <Feather name="minus" size={30} color={'#785444'} style={styles.button} /> : <Feather name="plus" size={30} color={'#785444'} style={styles.button} />
          }
          <View style={styles.touchableArea} />
        </TouchableOpacity>}
        {/* <TouchableOpacity onPress={showornoshow}>
          {
            show ? <Feather name="minus" size={30} color={'#785444'} /> : <Feather name="plus" size={30} color={'#785444'} />
          }
        </TouchableOpacity> */}
      </View>
      {
        show ?
          <View>
            <View style={{ flexDirection: 'row', width: width * 0.89, justifyContent: 'space-between', marginTop: height * 0.02 }}>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={(text) => setGroupCode(text)}
                  maxLength={5}
                  value={groupCode}
                  placeholderTextColor='#FFE3D7'
                  underlineColorAndroid="transparent"
                  placeholder="Group Code..."
                />
              </View>
              <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'center', height: height * 0.05, width: width * 0.17, borderRadius: 10, backgroundColor: '#785444' }}
                onPress={join}
              ><Text style={{ fontFamily: 'Quicksand-Bold', color: 'white', fontSize: 13 }}>JOIN</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems: 'center', height: height * 0.05, width: width * 0.9, borderRadius: 10, backgroundColor: '#785444' }}
              onPress={navToCreate}
            ><Text style={{ fontFamily: 'Quicksand-Bold', color: 'white', fontSize: 13 }}>CREATE</Text>
            </TouchableOpacity>
          </View>
          :
          <View></View>
      }

      <View style={styles.listContainer}>
        <FlatList
          data={groups}
          columnWrapperStyle={{
            flex: 0.5,
            justifyContent: 'flex-start'
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          //   keyExtractor={item => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => navToGroup(item)}>
              <GroupDisplay name={item.name} numMembers={item.numMembers} description={item.description} />
            </TouchableOpacity>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
      </ImageBackground>
    </View>
  )
}

export default GroupMain

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ECDCD1',
    alignItems: 'center'
},

searchContainer: {
    height: height * 0.05,
    width: width * 0.70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.01,
    overflow: 'hidden',
    // borderWidth: 1,
    backgroundColor:'#C3A699',
    padding:15,
    borderRadius: 10,
  },

  listContainer: {
    height: height * 0.60,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: height * 0.03
    // backgroundColor: 'black'
  },

  textInputStyle: {
    color: 'white',
    fontFamily: 'Quicksand-Bold',
},

buttonContainer: {
  position: 'relative',
},

button: {
  zIndex: 1,
},

touchableArea: {
  position: 'absolute',
  top: -height * 0.01,
  left: -width * 0.035,
  right: -width * 0.035,
  bottom: -height * 0.01,
  zIndex: 2,
  opacity: 0,
}
})