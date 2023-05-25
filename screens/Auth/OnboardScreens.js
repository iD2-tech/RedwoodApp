import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';
import React from 'react'

const { width, height } = Dimensions.get('window')
const OnboardScreens = () => {
    const navigation = useNavigation();
    const imageWidth = Dimensions.get('window').width * 1.25; // Adjust the desired width
    const imageHeight = imageWidth * 1.2;
  return (
    <Onboarding
    //To handle the navigation to the Homepage if Skip is clicked
onSkip={() => navigation.replace("Onboarding")}

//To handle the navigation to the Homepage after Done is clicked
onDone={() => navigation.replace("Onboarding")}
imageContainerStyles = {styles.imageContainerStyle}
containerStyles={styles.containerStyles}
titleStyles={{fontFamily: 'Quicksand-Bold', fontSize: height *0.034, color: '#785444', marginTop: height * 0.15}}
subTitleStyles={{fontFamily: 'Quicksand-Regular', fontSize: height *0.018, color: '#785444', width: width * 0.7}}
    pages={[
    {
    backgroundColor: '#ECDCD1',
    image: (
        <View style={styles.imageContainerStyles}>
          <Image
            source={require('../../GroupOnboard.png')}
            style={{ width: imageWidth, height: imageHeight, marginTop: height * 0.5, marginRight: width * 0.02}}
          />
        </View>
      ),
    title: '',
    subtitle: '',
    },
    {
        backgroundColor: '#ECDCD1',
        image: (<View style={styles.imageContainerStyles}>
        <Image
          source={require('../../JournalOnboard.jpg')}
          style={{ width: imageWidth, height: imageHeight }}
        />
      </View>),
        title: 'Friends.',
        subtitle: 'Add your friends and view/interact with their devotionals!',
    },
    {
        backgroundColor: '#ECDCD1',
        image:(<View style={styles.imageContainerStyles}>
        <Image
          source={require('../../JournalOnboard.jpg')}
          style={{ width: imageWidth, height: imageHeight }}
        />
      </View>),
        title: 'Community.',
        subtitle: 'Create/Join groups and keep each other accountable!',
    },
    ]}
/>
  )
}

export default OnboardScreens

const styles = StyleSheet.create({
    containerStyles: {
		// backgroundColor: 'yellow',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: 0,
		marginBottom: 0,
		paddingBottom: 0,
		paddingTop: 0
	},
	imageContainerStyles: {
		flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
	},
    imageContainerStyle: {
		// flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: height*0.5,
        width: width * 0.8
	},
	// titleStyles: {
	// 	// backgroundColor: 'red'
	// },
	// subTitleStyles: {
	// 	// backgroundColor: 'pink'
	// }
})