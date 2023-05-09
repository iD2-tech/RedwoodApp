import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, FlatList, Alert, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NavigationContainerRefContext, useNavigation } from '@react-navigation/native'
import OnboardButton from '../../../components/OnboardButton'
import GroupDisplay from '../../../components/GroupDisplay'
import Feather from 'react-native-vector-icons/Feather'
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";

const DATA = [
  {
    id: 1,
    name: 'Redwood Co',
    members: ['Marcus', 'Grace', 'Collin', 'David', 'Nicole', 'John'],
    description: 'Where all Redwood Co members can share their devos!',
    numMembers: 5,
    announcements: [
      {
        title: 'Senior Sendoff!',
        text: 'Senior sendoff is prolly one of the biggest events of the year, and is a place for us to celebrate the end of the year as well as send off our seniors!! It is going to be Monday (5/29) @6pm. Here is an rsvp link for it',
      },
      {
        title: 'Spiritual Formation Retreat',
        text: 'Today is the last day to sign up for spiritual formation retreat!! It is this Saturday from 9:30-3 and I really hope to see yall there! If your free I strongly encourage you to go!! There will be lots of silent time and time for you to spend with God, and is a great opportunity to find spiritual rest in the midst of this busy quarter!',
      }
    ],
    moderators: ['Marcus', 'Grace']
  },
  {
    id: 2,
    numMembers: 20,
    name: 'Small Group',
    members: ['Marcus', 'Grace', 'Collin', 'David', 'Nicole', 'John'],
    description: '2023 Small Group!!',
    announcements: [
      {
        title: 'Senior Sendoff!',
        text: 'Senior sendoff is prolly one of the biggest events of the year, and is a place for us to celebrate the end of the year as well as send off our seniors!! It is going to be Monday (5/29) @6pm. Here is an rsvp link for it',
      },
      {
        title: 'Spiritual Formation Retreat',
        text: 'Today is the last day to sign up for spiritual formation retreat!! It is this Saturday from 9:30-3 and I really hope to see yall there! If your free I strongly encourage you to go!! There will be lots of silent time and time for you to spend with God, and is a great opportunity to find spiritual rest in the midst of this busy quarter!',
      }
    ],
    moderators: ['Marcus', 'Grace']
  },

]



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
      <View style={{ marginTop: height * 0.08, width: width * 0.9, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'Lato-Bold', fontSize: 30, color: "#505050", width: width * 0.82 }}>GROUPS</Text>
        <TouchableOpacity onPress={showornoshow}>
          {
            show ? <Feather name="minus" size={30} color={'#505050'} /> : <Feather name="plus" size={30} color={'#505050'} />
          }
        </TouchableOpacity>
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
                  underlineColorAndroid="transparent"
                  placeholder="Group Code..."
                />
              </View>
              <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'center', height: height * 0.05, width: width * 0.17, borderRadius: 10, backgroundColor: '#505050' }}
                onPress={join}
              ><Text style={{ fontFamily: 'Lato-Regular', color: 'white', fontSize: 13 }}>JOIN</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems: 'center', height: height * 0.05, width: width * 0.9, borderRadius: 10, backgroundColor: '#505050' }}
              onPress={navToCreate}
            ><Text style={{ fontFamily: 'Lato-Regular', color: 'white', fontSize: 13 }}>CREATE</Text>
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
    </View>
  )
}

export default GroupMain

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
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
    backgroundColor: '#F4F4F4',
    padding: 15,
    borderRadius: 10,
  },

  listContainer: {
    height: height * 0.60,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: height * 0.03,
  },

})