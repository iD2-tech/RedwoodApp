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
import DropDownMenu from '../../components/DropDownMenu';

const { width, height } = Dimensions.get('window')
const DATA = [
  {
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'By Title',
    value: 'title',
    icon: 'type'
  },
  {
    id: '2',
    label: 'By Date',
    value: 'date',
    icon: 'calendar'
  },
  {
    id: '3',
    label: 'By Verse',
    value: 'bible',
    icon: 'book'
  }
];

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
  const [selected, setSelected] = useState(DATA[0]);
  


  
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
        const { title, book, chapter, verse, verses, date, text, pinned, likes, comments } = doc.data();
        postsData.push({
          id: doc.id,
          user: user ? user.name : 'Loading...',
          title,
          date,
          verseText: verses,
          verse: book + " " + chapter + ":" + verse,
          text: text,
          pinned: pinned,
          likes: likes,
          comments: comments,
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

  


  const navToSettings = () => {
    navigation.navigate("Settings");
  }


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

        if (selected.value === 'date') {
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
        } else if (selected.value === 'bible') {
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
    setIsModalVisible(() =>
      !isModalVisible
    )
  }

  const onPressItem = (data) => {
    setSelected(data);
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
      <ImageBackground source={require('../../FeatherLeft.png')} resizeMode="cover" style={{
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
        width: '100%',
        height: '100%',
      }} imageStyle={{
        marginTop: height * 0.02
      }}>
      <View style={styles.nameContainer}>
        <View style={styles.nameTop}>
        <TouchableOpacity onPress={navToFriends} style={styles.buttonContainer}>
          <Feather name="users" size={25} color={'#785444'} style={styles.button} />
          <View style={styles.touchableArea} />
      </TouchableOpacity>
          <Text style={styles.nameText}>
            {user ? user.name : 'Loading...'}
          </Text>
          <TouchableOpacity onPress={navToSettings} style={styles.buttonContainer}>
            <Feather name="settings" size={25} color={'#785444'} style={styles.button} />
            <View style={styles.touchableArea} />
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
          placeholderTextColor={'#FFE3D7'}
          placeholder="Search"
        />
        <TouchableOpacity onPress={handleModal}>
          <Feather name={selected.icon} size={27} color={'#785444'} marginRight={width * 0.04}/>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={filtered}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <SwipeableRow item={item} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {
          isModalVisible ? 
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            // flex: 1,
            top: height * 0.33,
            right: width * 0.3,
            position: 'absolute',
          }}>
          <DropDownMenu onPressItem={onPressItem} data={DATA}/>
          </View>
          : <></>
        }

      </ImageBackground>
    </View>
   


  )

}

export default Profile

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ECDCD1',
    // height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  nameContainer: {
    flexDirection: 'column',
    width: width * 0.8,
    marginBottom: height * 0.04,
    marginTop: height * 0.06,
    justifyContent: 'center',
    // backgroundColor: 'black'
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
    fontFamily: 'Quicksand-Bold',
    color: '#785444',
    // marginLeft: 0
  },

  userText: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Quicksand-Regular',
    color: '#785444',
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
    width: width * 0.85,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.013,


  },

  textInputStyle: {
    width: width * 0.70,
    borderWidth: 1,
    padding: 10,
    paddingLeft: 20,
    height: height * 0.042,
    borderColor: "#C3A699",
    fontSize: 12,
    fontFamily: 'Quicksand-Bold',
    backgroundColor: '#C3A699',
    // color: '#FFE3D7',
    borderRadius: 15,
  },

  filterButton: {
    width: width * 0.5,
    padding: width * 0.02,
    borderRadius: 40,
    alignItems: 'center',
    // marginBottom: height * 0.01,
    borderColor: '#E4E4E4',
    borderWidth: 1,
    backgroundColor: '#C3A699',
    marginTop: height * 0.05,
  },

  filterText: {
    fontSize: 27,
    fontWeight: '800',
    fontFamily: 'Quicksand-Regular',
    color: '#785444',
    textAlign: 'left',
    width: width * 0.44,
    marginBottom: height * 0.03
  },

  buttons: {
    alignItems: 'flex-start',
    fontFamily: 'Lato-Regular',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
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