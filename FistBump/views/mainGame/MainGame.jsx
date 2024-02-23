import { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ImageBackground, Platform } from "react-native";
import { MainGameSparing, HitLeft, HitRight, TrumpBiden, BidenTrump, backBtn, PlayHeader } from "../../resources";
import { customStyles } from '../components/styles';

export function MainGame({ navigation }) {
    const [actionImage, setActionAnimation] = useState({ image: MainGameSparing });
    let [elementsVisibility, setElementsVisibility] = useState(true);
    let elementVisible = elementsVisibility ? styles.visible : styles.hidden;

    setActionImage = (actionImage, duration) => {
        setActionAnimation(actionImage);
        setElementsVisibility(false);
        setTimeout(() => {
            setElementsVisibility(true);
            setActionAnimation({ image: MainGameSparing });
        }, duration)
    };

    return (
        <View style={[styles.container, customStyles.fullStretch]}>
            <ImageBackground style={customStyles.fullStretch} source={actionImage.image}>
                <View style={customStyles.buttonNavBackContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
                        <Image source={backBtn}>
                        </Image>
                    </TouchableOpacity>
                </View>
                <View style={[styles.playHeaderContent]}>
                    <View style={[styles.playHeaderContainer]}>
                        <ImageBackground style={customStyles.fullStretch} source={PlayHeader}></ImageBackground>
                    </View>
                </View>
                <View style={[styles.actionButton, styles.buttonHitTrump]}>
                    <TouchableOpacity onPress={() => this.setActionImage({ image: TrumpBiden }, 2500)} style={elementVisible} >
                        <Image source={HitLeft} style={customStyles.animationActionButton}>
                        </Image>
                    </TouchableOpacity>
                </View>
                <View style={[styles.actionButton, styles.buttonHitBiden]}>
                    <TouchableOpacity onPress={() => this.setActionImage({ image: BidenTrump }, 1750)} style={elementVisible}>
                        <Image source={HitRight} style={customStyles.animationActionButton}>
                        </Image>
                    </TouchableOpacity>
                </View>
            </ImageBackground >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    landingContent: {
        flex: 1,
        flexDirection: 'row'
    },
    landingContentPlayers: {
        flex: 2,
        height: '100%'
    },
    landingPlayers: {
        width: 250,
        height: 350
    },
    actionButton: {
        position: 'absolute',
        bottom: '10%'
    },
    buttonHitBiden: {
        right: '10%'
    },
    buttonHitTrump: {
        left: '10%'
    },
    emptyContainer: {
        flex: 2
    },
    playHeaderContent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '25%',
        width: '100%',
        ...customStyles.headers
    },
    playHeaderContainer: {
        width: '30%'
    },
    visible: {
        display: 'flex'
    },
    hidden: {
        display: 'none'
    }
})