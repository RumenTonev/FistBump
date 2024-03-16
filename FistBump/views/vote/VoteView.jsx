import { View, TouchableOpacity, Image, StyleSheet, Text, ScrollView, BackHandler, ImageBackground, Dimensions } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { VoteBackground, backBtn, VoteHeader, tickBtn, voted } from "../../resources";
import { customStyles } from '../components/styles';
import { VoteModal } from "./VoteModal";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export function VoteView() {
    const user = useSelector((state) => state.user);
    const navigation = useNavigation();
    const [modalVisibility, setModalVisibility] = useState(false);
    console.log(user.user.VoteFor);
    let votedVisibilityElement = user.user.VoteFor ? user.user.VoteFor == 'Biden' ? styles.voteBidenPositionStyle : styles.voteTrumpPositionStyle : styles.hidden;
    let baseElementVisibility = modalVisibility ? styles.hidden : styles.visible;
    let elementVisible = user.user.VoteFor ? styles.hidden : baseElementVisibility;
    const [candidate, setCandidate] = useState('');

    const renderModal = useCallback((modalVisibilityProp, candidate) => {
        setModalVisibility(modalVisibilityProp);
        setCandidate(candidate);
    }, []);


    return (
        <View style={styles.container}>
            <ImageBackground source={VoteBackground} style={styles.backgroundContainer}>
                <View style={[customStyles.buttonNavBackContainer, baseElementVisibility]}>
                    <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
                        <Image source={backBtn}>
                        </Image>
                    </TouchableOpacity>
                </View>
                <View style={[styles.voteHeaderContent, elementVisible]}>
                    <View style={[styles.voteHeaderContainer]}>
                        <ImageBackground style={styles.voteHeader} source={VoteHeader}></ImageBackground>
                    </View>
                </View>
                <VoteModal show={modalVisibility} candidate={candidate} close={() => renderModal(false)}></VoteModal>
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
    border: {
        borderWidth: 1,
        borderColor: 'yellow'
    }
})