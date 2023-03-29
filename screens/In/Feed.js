import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React, {useContext} from 'react'
import { AuthContext } from '../../navigation/AuthProvider';
import {firebase } from "@react-native-firebase/auth";

const Feed = () => {
  var userId =firebase.auth().currentUser.email;

  const {logout} = useContext(AuthContext);
  return (
    <View style = {{backgroundColor: 'white', height: '100%'}}>
      <Text>{userId}</Text>
      <TouchableOpacity
        onPress = {() => logout()}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Feed

const styles = StyleSheet.create({})