import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native'
import React, {useEffect} from 'react'
import PageBackButton from '../../../components/PageBackButton'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import EachFriend from '../../../components/EachFriend'


const { width, height } = Dimensions.get('window')
const Members = (props) => {

    const navigation = useNavigation();
    const navBack = () => {
        navigation.navigate("Home")
      }

  return (
    <View style={styles.container}>
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
        justifyContent: 'flex-start',
        marginTop: height * 0.01,
        alignItems: 'center'
      }}>
        <Text style={{
            fontFamily:'Lato-Bold',
            fontSize: 30,
            color:"black"
        }}>{props.item.name}</Text>
        <View style={styles.numberDisplay}>
                <Feather name="users" size={20} color={'#505050'} />
                <Text style={{fontSize: 20, marginLeft: width * 0.01, fontFamily: 'Lato-Regular'}}>{props.item.numMembers}</Text>
        </View>
      </View>
      <View style={{height: height * 0.57, marginTop: height * 0.02}}>
        <FlatList
          data={props.item.members}
          // keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <EachFriend name={item} onPress={() => {}}/>
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
        backgroundColor: 'white',
        alignItems: 'center'
    },
    numberDisplay: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: width * 0.1
    },
})