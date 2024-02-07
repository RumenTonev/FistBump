import { View, TouchableOpacity, Image, StyleSheet, Text, ScrollView, BackHandler, ImageBackground, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { VoteBackground, backBtn, VoteHeader, tickBtn } from "../../resources";

export function VoteView({ navigation }) {

    return (
        <View style={styles.container}>
            <ImageBackground source={VoteBackground} style={styles.backgroundContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Landing')} style={styles.buttonContainer}>
                    <Image source={backBtn} style={styles.button}>
                    </Image>
                </TouchableOpacity>
                <View style={[styles.voteHeaderContent]}>
                    <View style={[styles.voteHeaderContainer]}>
                        <ImageBackground style={styles.voteHeader} source={VoteHeader}></ImageBackground>
                    </View>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Landing')} style={styles.voteTrump}>
                    <Image source={tickBtn} style={styles.voteTrumpBtn}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Landing')} style={styles.voteBiden}>
                    <Image source={tickBtn} style={styles.voteBiden}>
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
        width: '100%',
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