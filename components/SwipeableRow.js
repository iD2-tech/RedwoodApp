import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, ImageBackground, Animated, I18nManager, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext, useRef } from 'react'
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useNavigation } from '@react-navigation/native';
import EachJournal from './EachJournal';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";
import { close } from 'react-native-redash';

const { width, height } = Dimensions.get('window')

const SwipeableRow = (props) => {

    const swipeableRef = useRef(null);
  
    var userId = firebase.auth().currentUser.uid;

    const navigation = useNavigation();

    // const closeSwipeable = (swipeableRef) => {
    //   swipeableRef.current.close()
    // }

    const deleteOP = (item) => { 
     firestore().collection('Posts').doc(userId).collection('userPosts').doc(item.id).delete().then(() => {
      
     })     
    }

    const deletePost = (item) => {
        Alert.alert('DELETING POST', 'Are you sure?', [
            {
                text: 'Cancel',
                onPress: () => console.log('canceled'),
                style: 'cancel'
            },
            {
                text: 'Ok',
                onPress: () => deleteOP(item),
            }
        ])
    }

    const pinItem = (item) => {
      firestore().collection('Posts').doc(userId).collection('userPosts').doc(item.id).update({
        pinned: "1"
      }).then(() => {
        swipeableRef.current.close();
      })
    }

    const unpinItem = (item) => {
      firestore().collection('Posts').doc(userId).collection('userPosts').doc(item.id).update({
        pinned: "0"
      }).then(() => {
        swipeableRef.current.close();
      })
    }

    renderRightAction = (
        text,
        color,
        x,
        progress,
        item,
        swipeableRef
      ) => {
        const trans = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [x, 0],
        });

        const pressHandler = () => {

            if (text === "Pin") {
              if (item.pinned === '1') {
                unpinItem(item);
              } else {
                pinItem(item);  
              
              }

            } else {
              deletePost(item);    
            }
            swipeableRef.current.close();
          };

        return (
       
            (item.pinned === '1') ? 
            <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
            { (text === "Pin") ? 
            
            <RectButton style={styles.swipeContainer} onPress={pressHandler}>
                <FontAwesome name="thumb-tack" size={25} color="black"/>
                <Text style={styles.swipeText}>UNPIN</Text>
            </RectButton>
            : 
            <RectButton style={styles.swipeContainer} onPress={pressHandler}>
                <Feather name="trash-2" size={25} color="black"/>
                <Text style={styles.swipeText}>DELETE</Text>
            </RectButton>
            }
            
          </Animated.View>
            : 
            <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
            { (text === "Pin") ? 
            
            <RectButton style={styles.swipeContainer} onPress={pressHandler}>
                <FontAwesome name="thumb-tack" size={25} color="black"/>
                <Text style={styles.swipeText}>PIN</Text>
            </RectButton>
            : 
            <RectButton style={styles.swipeContainer} onPress={pressHandler}>
                <Feather name="trash-2" size={25} color="black"/>
                <Text style={styles.swipeText}>DELETE</Text>
            </RectButton>
            }
            
          </Animated.View>
            
     
        );
      };
    
      renderRightActions = (
        progress,
        _dragAnimatedValue,
        item,
        swipeableRef
      ) => (
        <View
          style={{
            width: 192,
            flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
          }}>
          {renderRightAction('Pin', '#C8C7CD', 192, progress, item, swipeableRef)}
          {renderRightAction('Delete', '#ffab00', 128, progress, item, swipeableRef)}
        </View>
      );

      const onItemPress = (item) => {
        navigation.navigate("DisplayPost", {
          date: item.date,
          id: item.id,
          text: item.text,
          title: item.title,
          user: item.user,
          verse: item.verse,
          verseText: item.verseText
        });
      }

      
      
    return (
      <Swipeable
        ref={swipeableRef}
        key={props.item.id}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, props.item, swipeableRef)}>
          <TouchableOpacity onPress={() => 
            onItemPress(props.item)}>
            <EachJournal user={props.item.user} date={props.item.date} title={props.item.title} verseText={props.item.verseText} verse={props.item.verse} text={props.item.text} pinned={props.item.pinned}/>
          </TouchableOpacity>
        </Swipeable>
    )
}

export default SwipeableRow

const styles = StyleSheet.create({


 swipeContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: width * 0.22,
    borderWidth: 1,
    height: height * 0.107,
    borderColor: "#E4E4E4",
    borderRadius: 15
 },

 swipeText: {
    fontFamily: 'Lato-Bold',
        fontSize: 12,
        color: '#505050',
        marginTop: height * 0.01
 }
});