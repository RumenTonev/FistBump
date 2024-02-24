import { View, TouchableOpacity, Image, StyleSheet, Text, ScrollView, BackHandler, ImageBackground, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { VoteBackground, backBtn, VoteHeader, tickBtn } from "../../resources";
import { customStyles } from '../components/styles';

import { useActions } from "./useActions";
import { useNavigation } from "@react-navigation/native";

export function VoteView() {
    const{handleVoteFlow}=useActions()
    const navigation =useNavigation()
    return (
        <View style={styles.container}>
            <ImageBackground source={VoteBackground} style={styles.backgroundContainer}>
                <View style={customStyles.buttonNavBackContainer}>
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
                <TouchableOpacity onPress={()=>handleVoteFlow('Trump')} style={styles.voteTrump}>
                    <Image source={tickBtn}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleVoteFlow('Byden')} style={styles.voteBiden}>
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
})