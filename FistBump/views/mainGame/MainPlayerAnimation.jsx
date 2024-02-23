import { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Image } from "react-native";
import { backBtn } from "../../resources";
import { customStyles } from '../components/styles';

export function MainPlayerAnimation({ route, navigation }) {
    const { playerAnimation } = route.params;
    return (
        <View style={[styles.container, custom.fullStretch]}>
            <ImageBackground style={custom.fullStretch} source={playerAnimation}>
                <View style={[styles.actionButton]}>
                    <TouchableOpacity onPress={() => navigation.navigate('MainGame')} >
                        <Image source={backBtn} style={customStyles.animationActionButton}>
                        </Image>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    actionButton: {
        position: 'absolute',
        top: '10%',
        left: '10%'
    }
})