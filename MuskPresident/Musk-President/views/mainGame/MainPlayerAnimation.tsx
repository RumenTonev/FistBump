import { useCallback, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Image } from "react-native";
import { backBtn } from "../../resources";
import { customStyles } from '../components/styles';
import { useNavigation } from '@react-navigation/native';
import { handleClick } from '../logo/LogoView';

export function MainPlayerAnimation({ route}) {
    const { playerAnimation } = route.params;
    const navigation=useNavigation()

    const handBack = useCallback(() => {
        handleClick()
        navigation.navigate('MainGame')
    }, [])
    return (
        <View style={[styles.container, custom.fullStretch]}>
            <ImageBackground style={custom.fullStretch} source={playerAnimation}>
                <View style={[styles.actionButton]}>
                    <TouchableOpacity onPress={handBack} >
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