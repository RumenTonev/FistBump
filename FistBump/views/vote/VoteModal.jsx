import { View, Modal, TouchableOpacity, Image, StyleSheet, Text, ScrollView, BackHandler, ImageBackground, Dimensions } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { tickBtn, declineBtn } from "../../resources";
import { useActions } from "./useActions";
import { useNavigation } from "@react-navigation/native";

export function VoteModal(props) {
    const { handleVoteFlow } = useActions();
    const {candidate,close,show}=props
    const navigation = useNavigation();
    const [voteText, setVoteText] = useState('');
    const [elementsVisibility, setElementsVisibility] = useState(true);
    let elementVisible = elementsVisibility ? styles.visible : styles.hidden;

    const [navElementVisiblity, setNavElementVisiblity] = useState(false);
    let navElementVisible = navElementVisiblity ? styles.visible : styles.hidden;

    useEffect(() => {
        setVoteText(`Are you sure you want to vote for ${candidate} ?`);
    }, [candidate]);


    const vote = useCallback(() => {
        setVoteText(`Successfully voted for ${candidate}! ${"\n"}You might want to check Stats View.`);
        setElementsVisibility(false);
        setNavElementVisiblity(true);
        console.log('Vote: ' + candidate);
        handleVoteFlow(candidate);
    }, [candidate]);

    const navToHomePage = useCallback(() => {
        navigation.navigate('Landing')
    }, []);

    return (
        <View style={styles.centeredView}>
            <Modal animationType="slide" visible={show} transparent={true} supportedOrientations={['landscape']}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{voteText}</Text>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity onPress={() => vote()} style={[styles.modalButton, elementVisible]} >
                                <Image source={tickBtn}>
                                </Image>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navToHomePage()} style={[styles.modalButton, navElementVisible]}>
                                <Image source={tickBtn}>
                                </Image>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={close} style={[styles.modalButtonDecline, elementVisible]}>
                                <Image source={declineBtn}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        fontFamily: 'Super Funky',
    },
    modalButtonDecline: {
        marginLeft: 15
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 25
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'black',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        elevation: 5,
    },
    visible: {
        display: 'flex'
    },
    hidden: {
        display: 'none'
    }
})