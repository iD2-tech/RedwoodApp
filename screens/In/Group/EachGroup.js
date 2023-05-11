import { StyleSheet, Text, View, Dimensions, FlatList, Alert, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import PageBackButton from '../../../components/PageBackButton'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";
import { TouchableOpacity } from 'react-native-gesture-handler'
import EachPost from '../../../components/EachPost'



const { width, height } = Dimensions.get('window')
const EachGroup = (props) => {
  const monthNames = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    renderPosts();
  }, [])

  const navigation = useNavigation();
    const navBack = () => {
      navigation.navigate("GroupMain")
    }
    const onRefresh = () => {
      setRefreshing(true);
      // Fetch new data here and set it using setData
      renderPosts();
      setRefreshing(false);
    };

    const leaveGroup = () => {
      Alert.alert('LEAVING GROUP', 'Are you sure?', [
        {
            text: 'Cancel',
            onPress: () => console.log('canceled'),
            style: 'cancel'
        },
        {
            text: 'Ok',
            onPress: () => deleteOP(),
        }
    ])
    }

    const deleteOP =() => {
      const userId = firebase.auth().currentUser.uid;
      if (props.item.members.length === 1) {
        firestore().collection('Groups').doc(props.item.id).delete().then(() => {
          navigation.navigate("GroupMain")
        })
      } else {
      firestore().collection('Groups').doc(props.item.id).update({
        members: firebase.firestore.FieldValue.arrayRemove(props.item.currUser),
        memberIds: firebase.firestore.FieldValue.arrayRemove(userId),
      }).then(() => {
        navigation.navigate("GroupMain")
      })
    }
    }

    const navToMembers = () => {
      navigation.navigate("Members");
    }

    const renderPosts = () => {
        const postArr = [];
        const unsubscribeFunctions = [];
        for (let i = 0; i < props.item.memberIds.length; i++) {
          const userPostRef = firestore().collection('Posts').doc(props.item.memberIds[i]).collection('userPosts').where('private', '==', '0').where('date', '>', getStartofToday());
          const unsubscribe = userPostRef.onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => { 
              var verses = doc.data().book + " " + doc.data().chapter + ":" + doc.data().verse;
  
              var dateObj = new Date(doc.data().date.seconds * 1000);
              const date = dateObj.getDate();
              const month = monthNames[dateObj.getMonth()];
              const year = dateObj.getFullYear();
    
              const dateString = date + " " + month + " " + year;
              
              if (doc.data().anonymous === '1') {
                postArr.push({
                  user: 'Anonymous Member',
                  id: props.item.memberIds[i].ids,
                  date: dateString,
                  title: doc.data().title,
                  verseText: doc.data().verses, 
                  verse: verses,
                  text: doc.data().text,
                }) 
              } else {
                postArr.push({
                  user: props.item.members[i],
                  id: props.item.memberIds[i].ids,
                  date: dateString,
                  title: doc.data().title,
                  verseText: doc.data().verses, 
                  verse: verses,
                  text: doc.data().text,
                }) 
              }
      
            })
    
          })
          unsubscribeFunctions.push(unsubscribe);
        }
        setPosts(postArr); 
        return () => {
          unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
        };
        
    }

    function getStartofToday() {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const timestamp = firestore.Timestamp.fromDate(now);
      return timestamp;
    }
   

  return (
    <View style={styles.container}>
      {/* <Feather name="chevron-left" size={30} color={'#505050'} /> */}
      <View style={{
        width: width * 0.85,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: height * 0.1
      }}>
        <PageBackButton onPress={() => navBack()}/>
      </View>

      <View style={{
        width: width * 0.85,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: height * 0.01,
        alignItems: 'center'
      }}>
        <Text style={{
            fontFamily:'Lato-Bold',
            fontSize: 30,
            color:"black"
        }}>{props.item.name}</Text>
        <View style={styles.numberDisplay }>
          <TouchableOpacity onPress={navToMembers}><Feather name="users" size={20} color={'#505050'} /></TouchableOpacity>
                
                <Text style={{fontSize: 20, marginLeft: width * 0.01, fontFamily: 'Lato-Regular'}}>{props.item.numMembers}</Text>
        </View>
        <TouchableOpacity ><Feather name="message-circle" size={20} color={'#505050'} /></TouchableOpacity>
        <TouchableOpacity onPress={leaveGroup}><Feather name="x-circle" size={20} color={'#505050'} /></TouchableOpacity>
        

       
      </View>
      {/* <Text style={{
        fontFamily: 'Lato-Bold',
        fontSize: 10,
        marginTop: height * 0.03,
      }}>ANNOUNCEMENTS</Text> */}
      <View style={{height: height * 0.62, marginTop: height * 0.05,  }}>
      <Text style={{
        fontFamily: 'Lato-bold', fontSize: 20, marginBottom: height * 0.03
      }}>Today's Posts!</Text>
      <FlatList
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
      </View>

     

    </View> 
  )
}

export default EachGroup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    numberDisplay: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: width * 0.1
    },
})