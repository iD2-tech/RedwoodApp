import { StyleSheet, Text, View, Image } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';
import React from 'react'


const OnboardScreens = () => {
    const navigation = useNavigation();
  return (
    <Onboarding
    //To handle the navigation to the Homepage if Skip is clicked
onSkip={() => navigation.replace("Onboarding")}

//To handle the navigation to the Homepage after Done is clicked
onDone={() => navigation.replace("Onboarding")}

    pages={[
    {
    backgroundColor: '#ECDCD1',
    image: <Image source={require('../../logo.jpg')} />,
    title: 'Journal',
    subtitle: 'Easily log your devos and view your past journals!',
    },
    {
        backgroundColor: '#ECDCD1',
        image: <Image source={require('../../logo.jpg')} />,
        title: 'Friends',
        subtitle: 'Add your friends and view/interact with their devotionals!',
    },
    {
        backgroundColor: '#ECDCD1',
        image: <Image source={require('../../logo.jpg')} />,
        title: 'Community',
        subtitle: 'Create/Join groups and keep each other accountable!',
    },
    ]}
/>
  )
}

export default OnboardScreens

const styles = StyleSheet.create({})