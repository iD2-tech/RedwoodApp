import React, { useState, useEffect, useContext, useRef } from 'react'
import {SafeAreaView, StatusBar, LayoutAnimation, Button, Keyboard, StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, ImageBackground, Animated, I18nManager, Alert, TextInput, ActivityIndicator } from 'react-native'
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
    const [show, setShow] = useState(false);

    const navToSettings = () => {
        navigation.navigate("Settings");
    }

    // const showornoshow = () => {
    //     setShow(!show);
    // }

    // const [editable, setEditable] = useState(false);
    // const [editable2, setEditable2] = useState(false);
    const [editableField, setEditableField] = useState(null);

    useEffect(() => {
        if (editableField === 'username') {
            ref_input1.current.focus();
        } else if (editableField === 'name') {
            ref_input2.current.focus();
        }
      }, [editableField]);
      
      const handleEditPress = () => {
        setEditableField('username');
        setShow(true);
      };
      
      const handleEditPress2 = () => {
        setEditableField('name');
        setShow(true);
      };

    
    // const handleEditPress = () => {
    //     //setEditable(true);
    //     setShow(true);
    //     ref_input1.current.focus();
    //     editPress1 = true;
    // };

    // const handleEditPress2 = () => {
    //     //setEditable2(true);
    //     setShow(true);
    //     ref_input2.current.focus();
    //     editPress2 = true;
    // };
    useEffect(() => {
        const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
            setShow(false);
            setEditableField(false);
            //setEditable2(false);
        });
    
        return () => {
            keyboardWillHideListener.remove();
        };
    }, []);

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
        return () => {
          unsubscribe1();
        };
      }, []);

    const [text, setText] = useState('');
    const [text2,setText2] = useState('');

    return (
        <View style = {styles.container}>
            <View style={{marginRight: width * 0.78, marginTop: height * 0.08,}}>
                <PageBackButton onPress={navToSettings}/>
            </View>
            <View style = {styles.myProfileContainer}>
                <Text style={styles.myProfile}>My Profile</Text>
                    <View style = {styles.UserNameInput}>
                        <Text style={styles.names}>Username</Text>
                        <View style={{ flexDirection: 'row'}}>
                            <TextInput
                                ref={ref_input1}
                                defaultValue={user?.username}
                                onChangeText={setText}
                                editable={editableField === 'username'}
                                style={{width: width * 0.61, marginLeft: 3, fontSize: 18, fontFamily: 'Margarine', color: '#785444', marginRight: width * 0.03}}
                            />
                            <Feather
                                name="edit"
                                size={23}
                                color={'#785444'}
                                onPress={handleEditPress}
                            />
                        </View>
                        <View style={{height: 1.5, backgroundColor: '#785444', marginTop: height * 0.009, marginBottom: height * 0.0288, fontWeight: '500' }} />
                    </View>
                    <View style = {styles.NameInput}>
                    <Text style={styles.names}>Name</Text>
                        <View style={{ flexDirection: 'row'}}>
                        <TextInput 
                                ref={ref_input2}
                                defaultValue={user?.name}
                                onChangeText={setText2}
                                editable={editableField === 'name'}
                                style={{width: width * 0.61, marginLeft: 3, fontSize: 18, fontFamily: 'Margarine', color: '#785444', marginRight: width * 0.03}}
                            />
                            <Feather
                                name="edit"
                                size={23}
                                color={'#785444'}
                                onPress={handleEditPress2}
                            />
                        </View>
                        <View style={{height: 1.5, backgroundColor: '#785444', marginTop: height * 0.009, marginBottom: height * 0.0288, fontWeight: '500' }} />
                    </View>
                </View>
                {
                    show ? 
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => {setShow(!show); Keyboard.dismiss(); Alert.alert('Saved!'); setEditableField(false)}}>
                            <Text style={styles.buttonText}>SAVE CHANGES</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View></View>
                }
            </View>
    )
};

export default MyProfile;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECDCD1',
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
        fontSize: 29,
        fontFamily: 'Margarine',
        fontWeight: 'bold',
        color: '#505050',
        paddingBottom: '3%',
    },
    names: {
        fontSize: 18,
        fontFamily: 'Margarine',
        fontWeight: 800,
        color: '#A47C69',
        marginBottom: height * 0.015,
    },
    buttonContainer: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#785444',
        height: height * 0.05,
        width: width * 0.72,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: height * 0.32,
        borderRadius: 35,
        shadowColor: 'rgba(60, 60, 60, 0.4)',
        shadowOpacity: 2,
        elevation: 2,
        shadowRadius: 10,
        shadowOffset : { width: 1, height: 13},
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Margarine',
        fontWeight: 'bold',
    },
})
