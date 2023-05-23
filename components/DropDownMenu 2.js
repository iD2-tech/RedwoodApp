import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather'

const { width, height } = Dimensions.get('window')
const DropDownMenu = (props) => {
    const data = props.data;
    const onPressItem = (prop) => {
        props.onPressItem(prop);
    }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPressItem(data[0])} style={styles.eachView1}>
        <Feather name={data[0].icon} size={25} color="#505050"/>
        <Text style={styles.text}>{data[0].label}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPressItem(data[1])} style={styles.eachView1}>
        <Feather name={data[1].icon} size={25} color="#505050"/>
        <Text style={styles.text}>{data[1].label}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPressItem(data[2])} style={styles.eachView1}>
        <Feather name={data[2].icon} size={25} color="#505050"/>
        <Text style={styles.text}>{data[2].label}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DropDownMenu

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: width * 0.4,
        height: height * 0.17,
        backgroundColor: '#ECDCD1',
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center'
    },

    eachView1: {
        justifyContent: 'flex-start',
        width: width * 0.3,
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height * 0.014,
        height: height * 0.035,
    },

    text: {
        fontFamily: 'Quicksand-Bold',
        color: '#785444',
        fontSize: 17,
        // borderWidth: 1,
        marginLeft: width * 0.03
        // width: width * 0.25
    }
})