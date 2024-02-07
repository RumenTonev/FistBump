import { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ImageBackground } from "react-native";
import { MainGameSparing, HitLeft, HitRight, TrumpBiden, BidenTrump, backBtn, PlayHeader } from "../../resources";

export function MainGame({ navigation }) {
    const [actionImage, setActionAnimation] = useState({ image: MainGameSparing });

    setActionImage = (actionImage) => {
        setActionAnimation(actionImage);
    };

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.landingBackgroundAnimated} source={actionImage.image}>
                <TouchableOpacity onPress={() => navigation.navigate('Landing')} style={styles.buttonContainer}>
                    <Image source={backBtn} style={styles.buttonNavBack}>
                    </Image>
                </TouchableOpacity>
                <View style={[styles.playHeaderContent]}>
                    <View style={[styles.playHeaderContainer]}>
                        <ImageBackground style={styles.playHeader} source={PlayHeader}></ImageBackground>
                    </View>
                </View>
                <View style={[styles.actionButton, styles.buttonHitTrump]}>
                    <TouchableOpacity onPress={() => this.setActionImage({ image: TrumpBiden })} >
                        <Image source={HitLeft} style={styles.button}>
                        </Image>
                    </TouchableOpacity>
                </View>
                <View style={[styles.actionButton, styles.buttonHitBiden]}>
                    <TouchableOpacity onPress={() => this.setActionImage({ image: BidenTrump })} >
                        <Image source={HitRight} style={styles.button}>
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
    button: {
        width: 70,
        height: 70
    },
    buttonNavBack: {
        position: 'absolute',
        top: 10,
        left: 10
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
        marginTop: '2%'
    },
    playHeaderContainer: {
        width: '30%'
    },
    playHeader: {
        height: '100%',
        width: '100%'
    }
})