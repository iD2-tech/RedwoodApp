import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import PageBackButton from '../../../components/PageBackButton'
import { useNavigation } from '@react-navigation/native'



const { width, height } = Dimensions.get('window')
const EachGroup = (props) => {

  const navigation = useNavigation();
    const navBack = () => {
      navigation.navigate("GroupMain")
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
      {/* <Text style={{
        fontFamily: 'Lato-Bold',
        fontSize: 10,
        marginTop: height * 0.03,
      }}>ANNOUNCEMENTS</Text> */}
      <View style={{height: height * 0.52, marginTop: height * 0.05, backgroundColor: '#F4F4F4', borderRadius: 10}}>
      <FlatList
          data={props.item.announcements}
          // keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <View style={{
              width: width * 0.85,
              // borderWidth: 1,
              padding: 20,
              // borderColor: "#505050",
              // borderRadius: 10,
              // marginBottom: height * 0.02
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent:'flex-start'
              }}>
                <Feather name="flag" size={30} color={'#505050'} />
                <Text style={{
                  fontFamily:'Lato-Bold',
                  fontSize: 20,
                  marginLeft: width * 0.03,
                  color: "#505050",
                }}>{item.title}</Text>
              </View>
             
              <Text style={{
                fontFamily:'Lato-Regular',
                fontSize: 15,
                color: "#505050",
                marginTop: height * 0.02,
                
              }}>{item.text}</Text>
            </View>
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