import { View, TouchableOpacity, Image, StyleSheet, ImageBackground, Dimensions } from "react-native";
import { PlayBtn, StatsBtn, BidenHome, TrumpHome, VoteBtn, bottomLanding, preBottomLanding, mediumLanding, preTopLanding, topLanding } from "../../resources";
import { useState } from "react";
import { customStyles } from '../components/styles';


export function Landing({ navigation }) {
    const screen = Dimensions.get('screen');
    const orientation = screen.height > screen.width ? 'portrait' : 'landscape';
    const baseWidth = 35;
    const baseHeight = 90;
    const basePercentage = 100;
    
    const [height, setHeight] = useState(() => {
        return orientation == 'portrait' ? (screen.width * baseHeight) / basePercentage : (screen.height * baseHeight) / basePercentage;
    });
    const [width, setWidth] = useState(() => {
        return orientation == 'portrait' ? (screen.height * baseWidth) / basePercentage : (screen.width * baseWidth) / basePercentage;
    });

    return (
        <View style={styles.container}>
            <View style={[styles.landingContentPlayerTrump]}>
                <Image style={{ height: height, width: width }} source={TrumpHome}>
                </Image>
            </View>
            <View style={[styles.actionsContainer, customStyles.fullStretch]}>
                <View id="topLanding" style={styles.topBackgroundElement}>
                    <ImageBackground source={topLanding} style={styles.topLanding}></ImageBackground>
                </View>
                <View id="preTopLanding" style={styles.backgroundElement}>
                    <ImageBackground source={preTopLanding} style={[styles.backgroundElementImage]}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('Vote')} style={styles.buttonContainer}>
                                <Image source={VoteBtn} style={styles.button}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
                <View id="mediumLanding" style={styles.backgroundElement}>
                    <ImageBackground source={mediumLanding} style={[styles.backgroundElementImage]}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('MainGame')} style={styles.buttonContainer}>
                                <Image source={PlayBtn} style={styles.button}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
                <View id="preBottomLanding" style={styles.backgroundElement}>
                    <ImageBackground source={preBottomLanding} style={[styles.backgroundElementImage]}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('Stats')} style={styles.buttonContainer}>
                                <Image source={StatsBtn} style={styles.button}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
                <View id="bottomLanding" style={styles.backgroundElement}>
                    <ImageBackground source={bottomLanding} style={styles.backgroundElementImage}></ImageBackground>
                </View>
            </View>
            <View style={styles.landingContentPlayerBIden}>
                <Image style={{ height: height, width: width }} source={BidenHome}>
                </Image>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topBackgroundElement: {
        height: '30%',
    },
    topLanding: {
        flex: 1
    },
    backgroundElement: {
        height: '20%',
    },
    backgroundElementImage: {
        height: '100%'
    },
    landingContentPlayerTrump: {
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
        left: 0
    },
    landingContentPlayerBIden: {
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
        right: 0
    },
    actionsContainer: {
        position: 'absolute',
        zIndex: 0,
        top: 0,
        left: 0
    },
    buttonContainerFlex: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
    },
    button: {
        flex: 1,
        width: '100%',
        resizeMode: 'contain'
    }
})