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
                <Image source={VoteHeader} style={styles.header}>
                </Image>
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
    header: {
        position: 'absolute',
        top: 10,
        left: '40%'
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
    }
})