import { View, Modal, TouchableOpacity, Image, StyleSheet, Text, ScrollView, BackHandler, ImageBackground, Dimensions } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { tickBtn, declineBtn } from "../../resources";
import { useActions } from "./useActions";
import { useNavigation } from "@react-navigation/native";
import { clickSound, handleClick } from "../logo/LogoView";
import { useDispatch, useSelector } from "react-redux";
import { setBidenVote, setTrumpVote, setVote } from "../../store/userSlice";

export function VoteModal(props) {
    const { handleVoteFlow } = useActions();
    const dispatch = useDispatch();
    const {candidate,close,show}=props
    const navigation = useNavigation();
    const [voteText, setVoteText] = useState('');
    const [elementsVisibility, setElementsVisibility] = useState(true);
    const testingMode = useSelector((state) => state.user.testingMode);
    let elementVisible = elementsVisibility ? styles.visible : styles.hidden;

    const [navElementVisiblity, setNavElementVisiblity] = useState(false);
    let navElementVisible = navElementVisiblity ? styles.visible : styles.hidden;

    useEffect(() => {
        setVoteText(`Are you sure you want to vote ${candidate} ?`);
    }, [candidate]);


    const vote = useCallback(async () => {
       handleClick()
        setVoteText(`Successfully voted ${candidate}! ${"\n"}You might want to check Stats View.`);
        setElementsVisibility(false);
        setNavElementVisiblity(true);
        console.log('Vote: ' + candidate);
        // if(testingMode)
        // {
        //     dispatch(setVote(candidate))
        //     dispatch(candidate=='Trump'?setTrumpVote():setBidenVote())
        //     navigation.navigate('Landing')
        // }
        // else{
       await handleVoteFlow(candidate);
        //}
    }, [candidate]);

    const navToHomePage = useCallback(() => {
        handleClick()
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
        ...Platform.select({
            ios: { fontFamily: 'Super Funky' },
            android: { fontFamily: 'SuperFunky-lgmWw' }
        })
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