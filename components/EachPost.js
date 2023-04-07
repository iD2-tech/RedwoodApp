import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native'
import React, {useState, useCallback} from 'react'


const EachPost = (props) => {

    const [textShown, setTextShown] = useState(false); //To show ur remaining Text
    const [lengthMore,setLengthMore] = useState(false); //to show the "Read more & Less Line"
    const toggleNumberOfLines = () => { //To toggle the show text or hide it
        setTextShown(!textShown);
    }

    const onTextLayout = useCallback(e =>{
        setLengthMore(e.nativeEvent.lines.length >=4); //to check the text is more than 4 lines or not
        // console.log(e.nativeEvent);
    },[]);
    

  return (
    <View 
        style={styles.container }
        >
      <Text style={styles.name}>{props.user}</Text>
      <Text style={styles.date}>{props.date}</Text>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.verseText}>" {props.verseText} "</Text>
      <Text style={styles.verse}>{props.verse}</Text>
      <Text style={styles.text}
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : 4}
      >{props.text}</Text>
      {
                  lengthMore ? <Text
                  onPress={toggleNumberOfLines}
                  style={{fontFamily: 'Lato-Regular', color: '#505050', marginTop: '2%', fontSize: 10}}
                 >{textShown ? 'Read less...' : 'Read more...'}</Text>
                  :null
              }
    </View>
  )
}

export default EachPost

const styles = StyleSheet.create({
    container: {
        width: '80%',
        marginBottom: '15%',

        // alignItems: 'center' 
    },

    name: {
        fontFamily: 'Lato-Bold',
        fontSize: 16.5,
        color: '#505050',
        marginBottom: '1%'
    },
    date: {
        fontFamily: 'Lato-Regular',
        fontSize: 10,
        color: '#505050',
        marginBottom: '5%'
    },

    title: {
        fontFamily: 'Lato-Bold',
        fontSize: 23,
        color: '#505050',
        marginBottom: '5%'
    },

    quote: {
        fontFamily: 'Lato-Bold',
        fontSize: 17,
        color: '#505050', 

    },

    verseText: {
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: '#505050', 
        marginBottom: '3%'
    },

    verse: {
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: '#505050', 
        textAlign: 'right',
        marginBottom: '5%',
    },

    text: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: '#505050', 
    }

    

})