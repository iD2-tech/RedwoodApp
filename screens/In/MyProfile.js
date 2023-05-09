import React, { useState, useEffect, useContext, useRef } from 'react'
import { Keyboard, StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, ImageBackground, Animated, I18nManager, Alert, TextInput, ActivityIndicator } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import PageBackButton from '../../components/PageBackButton';
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";

const { width, height } = Dimensions.get('window')

const MyProfile = () => {
    const navigation = useNavigation();
    var userId = firebase.auth().currentUser.uid;
    const { logout } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [posts, setPosts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState('');
    const [user, setUser] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selected, setSelected] = useState('title');
    const ref_input1 = useRef();
    const ref_input2 = useRef();
    const [cursorPosition, setCursorPosition] = useState(null);
    
    const navToSettings = () => {
        navigation.navigate("Settings");
    }

    const [editable, setEditable] = useState(false);
    const [editable2, setEditable2] = useState(false);
    const [text, setText] = useState('Johnslee');
    const [text2,setText2] = useState('John Lee');

    const handleEditPress = () => {
        //setEditable(true);
        ref_input1.current.focus();
    };

    const handleEditPress2 = () => {
        //setEditable2(true);
        ref_input2.current.focus();
    };

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
      }, []);


    return (
        <View style = {styles.container}>
            <View style={{marginRight: width * 0.78, marginTop: height * 0.08,}}>
                <PageBackButton onPress={navToSettings}/>
            </View>
            <View style = {styles.myProfileContainer}>
                <Text style={styles.myProfile}>My Profile</Text>
                    <View style = {styles.UserNameInput}>
                        <Text style={styles.Username}>Username</Text>
                        <View style={{ flexDirection: 'row'}}>
                            <TextInput
                                ref={ref_input1}
                                value={text}
                                onChangeText={setText}
                                //editable={editable}
                                style={{width: width * 0.61, marginLeft: 3, fontSize: 16, fontFamily: 'Helvetica', color: '#505050', marginRight: width * 0.03}}
                            />
                            <Feather
                                name="edit"
                                size={20}
                                color={'#505050'}
                                onPress={handleEditPress}
                            />
                        </View>
                        <View style={{height: 2, backgroundColor: '#505050', marginTop: height * 0.009, marginBottom: height * 0.0288 }} />
                    </View>
                    <View style = {styles.NameInput}>
                    <Text style={styles.Name}>Name</Text>
                        <View style={{ flexDirection: 'row'}}>
                        <TextInput 
                                value={text2}
                                onChangeText={setText2}
                                //editable={editable2}
                                style={{width: width * 0.61, marginLeft: 3, fontSize: 16, fontFamily: 'Helvetica', color: '#505050', marginRight: width * 0.03}}
                                ref={ref_input2}
                            />
                            <Feather
                                name="edit"
                                size={20}
                                color={'#505050'}
                                onPress={handleEditPress2}
                            />
                        </View>
                        <View style={{height: 2, backgroundColor: '#505050', marginTop: height * 0.009, marginBottom: height * 0.0288 }} />
                    </View>
                </View>
            </View>
    )
};

export default MyProfile;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    myProfileContainer: {
        flex: 1,
        width: width * 0.7,
        alignitems: 'center',          
        marginTop: height * 0.07,
        marginBottom: height * 0.07,
    },
    myProfile: {
        marginTop: height * -0.055,
        marginBottom: height * 0.04,
        fontSize: 25,
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        color: '#505050',
        paddingBottom: '3%',
    },
    Username: {
        fontSize: 13,
        fontFamily: 'Helvetica',
        fontWeight: 800,
        color: '#505050',
        marginBottom: height * 0.01,
    },
    Name: {
        fontSize: 13,
        fontFamily: 'Helvetica',
        fontWeight: 800,
        color: '#505050',
        marginBottom: height * 0.01,
    },
})
