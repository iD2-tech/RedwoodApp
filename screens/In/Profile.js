import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, ImageBackground, Animated, I18nManager, Alert, TextInput, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from "@react-native-firebase/auth";
import { AuthContext } from '../../navigation/AuthProvider';
import Feather from 'react-native-vector-icons/Feather'
import EachJournal from '../../components/EachJournal';
import firestore from '@react-native-firebase/firestore';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import SwipeableRow from '../../components/SwipeableRow';
import Modal from "react-native-modal";
import RadioGroup from 'react-native-radio-buttons-group';

const { width, height } = Dimensions.get('window')

const Profile = ( {route} ) => {
  var userId = firebase.auth().currentUser.uid;

  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selected, setSelected] = useState('title');



  const [radioButtons, setRadioButtons] = useState([
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Search by Title',
      value: 'title'
    },
    {
      id: '2',
      label: 'Search by Date',
      value: 'date'
    },
    {
      id: '3',
      label: 'Search by Bible Verse',
      value: 'bible'
    }
  ]);


  
  useEffect(() => {
    // const {name, username} = route.params;
    // setUser({name,username})
    const userId = firebase.auth().currentUser.uid;
    const userRef = firebase.firestore().collection('Users').doc(userId);
    const unsubscribe1 = userRef.onSnapshot((doc) => {
      if (doc.exists) {
        const { name, username } = doc.data();
        setUser({ name, username });
      }
    });

    const postCollection = firestore().collection('Posts').doc(userId).collection('userPosts');
    const postQuery = postCollection.orderBy('pinned', 'desc').orderBy('date', 'desc');
    const unsubscribe = postQuery.onSnapshot((querySnapshot) => {
      const postsData = [];
      querySnapshot.forEach((doc) => {
        const { title, book, chapter, verse, verses, date, text, pinned } = doc.data();
        postsData.push({
          id: doc.id,
          user: user ? user.name : 'Loading...',
          title,
          date,
          verseText: verses,
          verse: book + " " + chapter + ":" + verse,
          text: text,
          pinned: pinned
        })
      })

      setPosts(postsData);
      setFiltered(postsData);
    })
    return () => {
      unsubscribe1();
      unsubscribe();
    };
  }, []);





  const navToFeed = () => {
    navigation.navigate("Post");
  }

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = posts.filter(function (item) {
        // Applying filter for the inserted text in search bar

        if (selected === 'date') {
          const monthNames = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

          var dateObj = new Date(item.date.seconds * 1000);
          const date = dateObj.getDate();
          const month = monthNames[dateObj.getMonth()];
          const year = dateObj.getFullYear(); 

          const dateString = date + " " + month + " " + year;

          const itemData = item.date
            ? dateString.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        } else if (selected === 'bible') {
          const itemData = item.verse
            ? item.verse.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        } else {
          const itemData = item.title
            ? item.title.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setFiltered(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFiltered(posts);
      setSearch(text);
    }
  };

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  }


  const handleModal = () => {
    let selectedButton = radioButtons.find(e => e.selected == true);
    selectedButton = selectedButton ? selectedButton.value : radioButtons[0].label;
    setSelected(selectedButton);
    setIsModalVisible(() =>
      !isModalVisible
    )
  }

  const navToFriends = () => {
    navigation.navigate("FriendStack")
  }

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  return (


    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View style={styles.nameTop}>
        <TouchableOpacity onPress={navToFriends}><Feather name="users" size={25} color={'black'} /></TouchableOpacity>
          <Text style={styles.nameText}>
            {user ? user.name : 'Loading...'}
          </Text>
          <TouchableOpacity
            onPress={() => logout()}
          >
            <Feather name="log-out" size={25} color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={styles.nameBot}>
          <Text style={styles.userText}>{user ? `@${user.username}` : 'Loading...'}</Text>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <TouchableOpacity onPress={handleModal}>
          <Feather name="menu" size={25} color={'black'} />
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={filtered}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) =>
            <SwipeableRow item={item} />
          }
          showsVerticalScrollIndicator={false}
        />
      </View>

      <Modal
        isVisible={isModalVisible}
      >
        <View style={{ height: height * 0.4, width: width * 0.7, backgroundColor: 'white', alignSelf: 'center', borderRadius: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.filterText}>Filter</Text>

          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
            containerStyle={styles.buttons}
          />


          <TouchableOpacity onPress={handleModal} style={styles.filterButton}>
            <Text style={{
              color: "#505050",
              fontFamily: 'Lato-Regular',
              fontWeight: '500'
            }}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    marginBottom: height * 0.04,
    marginTop: height * 0.06
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
    justifyContent: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: height * 0.01
    // backgroundColor: 'black'
  },

  searchContainer: {
    height: height * 0.04,
    width: width * 0.89,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.013,
    overflow: 'hidden',
  },

  textInputStyle: {
    width: width * 0.75,
    borderWidth: 1,
    padding: 10,
    height: height * 0.04,
    borderColor: "#D2D2D2",
    borderRadius: 7,
    fontSize: 12,
    fontFamily: 'Lato-Regular'
    //   shadowColor: '#000',
    //       shadowOffset: { width: 1, height: 1 },
    //       shadowOpacity:  0.4,
    //       shadowRadius: 3,
    //       elevation: 5,

  },

  filterButton: {
    width: width * 0.5,
    padding: width * 0.02,
    borderRadius: 40,
    alignItems: 'center',
    // marginBottom: height * 0.01,
    borderColor: '#E4E4E4',
    borderWidth: 1,
    backgroundColor: '#E4E4E4',
    marginTop: height * 0.05
  },

  filterText: {
    fontSize: 27,
    fontWeight: '800',
    fontFamily: 'Lato-Regular',
    color: '#505050',
    textAlign: 'left',
    width: width * 0.44,
    marginBottom: height * 0.03
  },

  buttons: {
    alignItems: 'flex-start',
    fontFamily: 'Lato-Regular',
  }


})