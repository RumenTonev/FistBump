import { View, TouchableOpacity, Image, StyleSheet, Text, ScrollView, BackHandler, ImageBackground, Dimensions } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { VoteBackground, backBtn, VoteHeader, tickBtn, voted, onlyInUs } from "../../resources";
import { customStyles } from '../components/styles';
import { VoteModal } from "./VoteModal";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { clickSound, handleClick } from "../logo/LogoView";

export function VoteView() {
    const user = useSelector((state) => state.user);
    const navigation = useNavigation();
    const [modalVisibility, setModalVisibility] = useState(false);
    const [candidate, setCandidate] = useState('');

    console.log(user.user.VoteFor);
    let voteOnlyInUsVisibility = !user.user.isUs ? styles.visible : styles.hidden;
    let baseElementVisibility = modalVisibility ? styles.hidden : styles.visible;
    let elementVisible = !user.user.isUs ? styles.hidden : user.user.VoteFor || user.user.VoteFor === '' ? styles.hidden : baseElementVisibility;
    let votedVisibilityElement = (user.user.VoteFor && user.user.VoteFor !== '') && user.user.isUs ? user.user.VoteFor == 'Biden' ? styles.voteBidenPositionStyle : user.user.VoteFor == 'Trump' ? styles.voteTrumpPositionStyle : styles.hidden : styles.hidden;

    const renderModal = useCallback((modalVisibilityProp, candidate) => {
        setModalVisibility(modalVisibilityProp);
        setCandidate(candidate);
    }, []);

    const navigateBack = useCallback(() => {
        handleClick()
        navigation.navigate('Landing')
    }, []);


    return (
        <View style={styles.container}>
            <ImageBackground source={VoteBackground} style={styles.backgroundContainer}>
                <View style={[customStyles.buttonNavBackContainer, baseElementVisibility]}>
                    <TouchableOpacity onPress={navigateBack}>
                        <Image source={backBtn}>
                        </Image>
                    </TouchableOpacity>
                </View>
                <View style={[styles.voteHeaderContent]}>
                    <View style={[styles.voteHeaderContainer]}>
                        <ImageBackground style={styles.voteHeader} source={VoteHeader}></ImageBackground>
                    </View>
                </View>
                <VoteModal show={modalVisibility} candidate={candidate} close={() => renderModal(false)}></VoteModal>
                <View style={[styles.voteOnlyInUsContainer, voteOnlyInUsVisibility]}>
                    <Image style={[styles.voteOnlyInUsSize]} source={onlyInUs}>
                    </Image>
                </View>
                <Image style={[styles.votedContainer, votedVisibilityElement]} source={voted}>
                </Image>
                <TouchableOpacity onPress={() => renderModal(true, 'Trump')} style={[styles.voteTrumpPositionStyle, elementVisible]} >
                    <Image source={tickBtn}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => renderModal(true, 'Biden')} style={[styles.voteBidenPositionStyle, elementVisible]}>
                    <Image source={tickBtn}>
                    </Image>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%'
    },
    backgroundContainer: {
        width: '100%',
        height: '100%'
    },
    button: {
        position: 'absolute',
        top: 10,
        left: 10
    },
    voteBidenPositionStyle: {
        position: 'absolute',
        bottom: '15%',
        right: '15%'
    },
    voteTrumpPositionStyle: {
        position: 'absolute',
        bottom: '15%',
        left: '15%'
    },
    voteHeaderContent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '25%',
        marginTop: '2%'
    },
    voteHeaderContainer: {
        width: '30%'
    },
    voteHeader: {
        height: '100%',
        width: '100%'
    },
    visible: {
        display: 'flex'
    },
    hidden: {
        display: 'none'
    },
    votedContainer: {
        width: '25%',
        height: '25%'
    },
    voteOnlyInUsSize: {
        width: '25%',
        height: '55%',
        marginTop: '5%'
    },
    voteOnlyInUsContainer: {
        flex: 1,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
    }
})