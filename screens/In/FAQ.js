import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, Switch, StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, ImageBackground, Animated, I18nManager, Alert, TextInput, ActivityIndicator } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import PageBackButton from '../../components/PageBackButton';
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";


const { width, height } = Dimensions.get('window')

const FAQ = () => {
    const navigation = useNavigation();
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const navToSettings = () => {
        navigation.navigate("Settings");
    }
    const toggleQuestion = (questionId) => {
        setSelectedQuestion(questionId === selectedQuestion ? null : questionId);
    };
    const renderChevronIcon = (questionId) => {
        if (questionId === selectedQuestion) {
            return <Feather name="chevron-down" size={25} color="#785444" style={{ alignItems: 'flex-end' }} />;
        } else {
            return <Feather name="chevron-right" size={25} color="#785444" style={{ justifyContent: 'flex-end' }} />;
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ marginRight: width * 0.78, marginTop: height * 0.08, }}>
                <PageBackButton onPress={navToSettings} />
            </View>
            <View style={styles.faqContainer}>
                <Text style={styles.faq}>FAQ</Text>
                <View style={{ flexGrow: 1 }}>
                    <ScrollView
                        contentContainerStyle={styles.scrollViewContent}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.textContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => { toggleQuestion(1) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', height: height * 0.05 }}>
                                    <Text style={styles.buttonText}>How can I view devotionals from other users on the app?</Text>
                                    {renderChevronIcon(1)}
                                </View>
                            </TouchableOpacity>
                            {selectedQuestion === 1 && (
                                <View style={styles.answerContainer}>
                                    <Text style={styles.faqtext}>
                                        To view devotionals from other users on the app, you can follow these simple steps:{"\n"}{"\n"}
                                        1. Search for the username of the user whose devotionals you want to see.{"\n"}
                                        2. Send a friend request to that user by searching their username and clicking on the designated "send" button on their profile.{"\n"}
                                        3. Once the user accepts your friend request, their devotionals will start appearing on your feed.{"\n"}
                                        4. You can scroll through your feed to read and engage with the devotionals shared by your friends.{"\n"}{"\n"}
                                        By adding friends with their usernames and receiving their acceptance, you will have access to their devotionals and be able to enjoy a broader range of content within the app.{"\n"}{"\n"}
                                    </Text>
                                </View>
                            )}
                            <TouchableOpacity style={styles.button} onPress={() => { toggleQuestion(2) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', height: height * 0.05 }}>
                                    <Text style={styles.buttonText}>Are there any community features for users to connect?</Text>
                                    {renderChevronIcon(2)}
                                </View>
                            </TouchableOpacity>
                            {selectedQuestion === 2 && (
                                <View style={styles.answerContainer2}>
                                    <Text style={styles.faqtext}>Yes, our app provides community features to foster connections among users. Currently, we offer a group feature that allows users to join and participate in various discussion forums. Here's how you can access and engage with these groups:{"\n"}{"\n"}
                                        1. Go to the groups page within the app.{"\n"}
                                        2. Click on the "Create" button to start your own group or explore existing groups.{"\n"}
                                        3. When creating a group, give it a name that reflects its purpose or topic. You can also add a group description to provide more information.{"\n"}
                                        4. As part of the group creation process, you'll be prompted to generate a group code. This code will serve as an identifier for your group.{"\n"}
                                        5. If you wish to join an existing group, simply enter the specific group code and click "Join."{"\n"}{"\n"}
                                        These groups offer a great opportunity to connect with like-minded individuals, seek support, and deepen your understanding of faith-related topics. Feel free to explore different groups, participate actively, and build meaningful connections within our app's community.
                                    </Text>
                                </View>
                            )}
                            <TouchableOpacity style={styles.button} onPress={() => { toggleQuestion(3) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', height: height * 0.05 }}>
                                    <Text style={styles.buttonText}>Is there a notification feature to remind me to read devotionals daily?</Text>
                                    {renderChevronIcon(3)}
                                </View>
                            </TouchableOpacity>
                            {selectedQuestion === 3 && (
                                <View style={styles.answerContainer3}>
                                    <Text style={styles.faqtext}>Yes, our app includes a notification feature to help you stay on track with your daily devotionals. You will receive a daily reminder. We understand the importance of consistency in nurturing your spiritual journey. To assist you with this, our app sends out a daily reminder at 12 PM every day. This reminder is designed to encourage you to prioritize your daily devotional time, fostering a deeper relationship with God and a sense of community. We aim to keep you engaged and motivated, ensuring that you don't miss out on your daily devotionals.
                                    </Text>
                                </View>
                            )}
                            <TouchableOpacity style={styles.button} onPress={() => { toggleQuestion(4) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', height: height * 0.05 }}>
                                    <Text style={styles.buttonText}>Are there any privacy settings to control who can see my devotionals?
                                    </Text>
                                    {renderChevronIcon(4)}
                                </View>
                            </TouchableOpacity>
                            {selectedQuestion === 4 && (
                                <View style={styles.answerContainer4}>
                                    <Text style={styles.faqtext}> Yes, our app provides privacy settings that allow you to control who can see your devotionals. You have three options to choose from:{"\n"}{"\n"}
                                        1. Public Posts: When you create a public post, it will be visible to all of your friends on the app. Your name will be displayed, and others can engage with and comment on your post.{"\n"}{"\n"}
                                        2. Private Posts: If you prefer to keep your devotionals private, you can create a private post. This post will only be visible to you and will appear solely on your profile. It is a personal reflection space where you can record your thoughts and experiences.{"\n"}{"\n"}
                                        3. Anonymous Posts: Anonymity can be important in certain situations. With anonymous posts, you can share your devotionals with all your friends on the app, but your name will not be shown. This option allows you to freely express yourself while maintaining your privacy.{"\n"}{"\n"}

                                        These privacy settings give you the flexibility to choose the level of visibility you desire for your devotionals, ensuring that you have control over who can see and engage with your content.
                                    </Text>
                                </View>
                            )}
                            <TouchableOpacity style={styles.button} onPress={() => { toggleQuestion(5) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', height: height * 0.05 }}>
                                    <Text style={styles.buttonText}>Can I share Redwood to others outside of the app?</Text>
                                    {renderChevronIcon(5)}
                                </View>
                            </TouchableOpacity>
                            {selectedQuestion === 5 && (
                                <View style={styles.answerContainer5}>
                                    <Text style={styles.faqtext}> Yes, you can easily share Redwood with others outside of the app. Here's how:{"\n"}{"\n"}
                                        1. Navigate to your settings page within the app.{"\n"}{"\n"}
                                        2. Select the "Share Redwood" option, located in the settings menu{"\n"}{"\n"}
                                        3. When you select "Share Redwood," various sharing options will appear, including messaging.{"\n"}{"\n"}
                                        4. Choose the messaging option and select the contacts you want to share Redwood with.{"\n"}{"\n"}
                                        5. You can send a text message containing the information and link to download the app to anyone you'd like.{"\n"}

                                    </Text>
                                </View>
                            )}
                            <TouchableOpacity style={styles.button} onPress={() => { toggleQuestion(6) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', height: height * 0.05 }}>
                                    <Text style={styles.buttonText}>How can I provide feedback or suggestions for improving the app?</Text>
                                    {renderChevronIcon(6)}
                                </View>
                            </TouchableOpacity>
                            {selectedQuestion === 6 && (
                                <View style={styles.answerContainer6}>
                                    <Text style={styles.faqtext}>
                                        Providing feedback and suggestions for improving the app is highly valued. Here's how you can do it:{"\n"}{"\n"}

                                        1. On the settings page of the app, you will find a "Rate Redwood" option. By clicking on this option, you can rate the app and share your overall experience.{"\n"}{"\n"}
                                        2. For suggestions and detailed feedback, we have a dedicated feedback form that we encourage you to use. You can access the feedback form by visiting the following link: Feedback Form{"\n"}{"\n"}

                                        This form allows you to provide specific suggestions, share your thoughts on improving the app, and offer any other feedback you may have. We appreciate your input and look forward to hearing from you as we continue to enhance and refine the Redwood app based on user feedback.{"\n"}{"\n"}


                                        Feel free to drop any more questions in the Feedback Form!
                                    </Text>
                                </View>
                            )}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
};

export default FAQ;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECDCD1',
        height: height * 0.91,
        alignItems: 'center',
        justifyContent: 'center',
    },

    faqContainer: {
        flex: 1,
        marginTop: height * 0.03,
        marginBottom: height * 0.07,
    },

    faq: {
        marginTop: height * -0.02,
        fontSize: 29,
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
        color: '#785444',
    },

    text: {
        fontSize: 12.3,
        fontFamily: 'Quicksand',
        fontWeight: '400',
        color: '#785444',
    },

    scrollViewContent: {
        paddingTop: height * 0.04,
        paddingBottom: height * 0.08,
    },

    button: {
        backgroundColor: '#DCC6BB',
        height: height * 0.07,
        width: width * 0.795,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: height * 0.02,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#C3A699',
        paddingHorizontal: 10,
    },
    buttonText: {
        color: '#785444',
        fontSize: 14,
        fontFamily: 'Quicksand',
        fontWeight: '600',
        justifyContent: 'flex-start',
        width: width * 0.717,
        paddingHorizontal: 20,
    },

    answerContainer: {
        height: height * 0.17,
        marginTop: height * 0.3,
        marginLeft: width * 0.02,
        width: width * 0.75,
    },

    answerContainer2: {
        height: height * 0.34,
        marginTop: height * 0.3,
        marginLeft: width * 0.02,
        width: width * 0.75,
    },

    answerContainer3: {
        marginTop: height * 0.3,
        marginLeft: width * 0.02,
        width: width * 0.75,
        height: height * 0.02
    },

    answerContainer4: {
        height: height * 0.38,
        marginTop: height * 0.3,
        marginLeft: width * 0.02,
        width: width * 0.75,
    },

    answerContainer5: {
        marginTop: height * 0.3,
        marginLeft: width * 0.02,
        width: width * 0.75,
        height: height * 0.15,
    },

    answerContainer6: {
        height: height * 0.3,
        marginTop: height * 0.3,
        marginLeft: width * 0.02,
        width: width * 0.75,
    },

    faqtext: {
        color: '#785444',
        fontSize: 14.5,
        fontFamily: 'Quicksand',
        fontWeight: '400',
        marginTop: -height * 0.3,
    },
})