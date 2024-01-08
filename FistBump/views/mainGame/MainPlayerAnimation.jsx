import { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Image } from "react-native";
import { MainGameSparing, TrumpBiden, BidenTrump, backBtn } from "../../resources";

export function MainPlayerAnimation({ route, navigation }) {
    const { playerAnimation } = route.params;
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.landingBackgroundAnimated} source={playerAnimation}>
                <View style={[styles.actionButton]}>
                    <TouchableOpacity onPress={() => navigation.navigate('MainGame')} >
                        <Image source={backBtn} style={styles.button}>
                        </Image>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%'
    },
    landingBackgroundAnimated: {
        width: '100%',
        height: '100%'
    },
    actionButton: {
        position: 'absolute',
        top: '10%',
        left: '10%'
    },
    button: {
        width: 70,
        height: 70
    }
})