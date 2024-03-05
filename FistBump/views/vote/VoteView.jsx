import { View, TouchableOpacity, Image, StyleSheet, Text, ScrollView, BackHandler, ImageBackground, Dimensions } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { VoteBackground, backBtn, VoteHeader, tickBtn } from "../../resources";
import { customStyles } from '../components/styles';
import { VoteModal } from "./VoteModal";
import { useNavigation } from "@react-navigation/native";

export function VoteView() {
    const navigation = useNavigation();
    const [modalVisibility, setModalVisibility] = useState(false);
    let elementVisible = modalVisibility ? styles.hidden : styles.visible;
    const [candidate, setCandidate] = useState('');

    const renderModal = useCallback((modalVisibilityProp, candidate) => {
        setModalVisibility(modalVisibilityProp);
        setCandidate(candidate);
    }, []);


    return (
        <View style={styles.container}>
            <ImageBackground source={VoteBackground} style={styles.backgroundContainer}>
                <View style={[customStyles.buttonNavBackContainer, elementVisible]}>
                    <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
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
                <TouchableOpacity onPress={() => renderModal(true, 'Trump')} style={[styles.voteTrump, elementVisible]} >
                    <Image source={tickBtn}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => renderModal(true, 'Biden')} style={[styles.voteBiden, elementVisible]}>
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
    voteBiden: {
        position: 'absolute',
        bottom: '15%',
        right: '15%'
    },
    voteTrump: {
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
    }
})