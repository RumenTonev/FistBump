import { View, TouchableOpacity, Image, StyleSheet, Text, ScrollView, BackHandler, ImageBackground, Dimensions } from "react-native";
import { LandingPlayers, PlayBtn, StatsBtn, LandingBackground, BidenHome, TrumpHome, VoteBtn, bottomLanding, preBottomLanding, mediumLanding, preTopLanding, topLanding } from "../../resources";
import { useEffect, useState } from "react";

export function Landing({ navigation }) {
    //For tablet devices we need to add additional check, 
    //since only percetage won't fully work on all devices 
    const [height, setHeight] = useState((Dimensions.get('window').height * 80) / 100);
    const [width, setWidth] = useState((Dimensions.get('window').width * 35) / 100);

    return (
        <View style={styles.container}>
            <View style={[styles.landingContentPlayerTrump]}>
                <Image style={{ height: height, width: width }} source={TrumpHome}>
                </Image>
            </View>
            <View style={styles.actionsContainer}>
                <View id="topLanding" style={styles.topBackgroundElement}>
                    <ImageBackground source={topLanding} style={styles.topLanding} resizeMode="cover"></ImageBackground>
                </View>
                <View id="preTopLanding" style={styles.backgroundElement}>
                    <ImageBackground source={preTopLanding} style={[styles.backgroundElementImage, styles.buttonContainerFlex]}>
                        <View style={styles.emptyButtonContainer}></View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('Vote')} style={styles.buttonContainer}>
                                <Image source={VoteBtn} style={styles.button}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.emptyButtonContainer}></View>
                    </ImageBackground>
                </View>
                <View id="mediumLanding" style={styles.backgroundElement}>
                    <ImageBackground source={mediumLanding} style={[styles.backgroundElementImage, styles.buttonContainerFlex]}>
                        <View style={styles.emptyButtonContainer}></View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('MainGame')} style={styles.buttonContainer}>
                                <Image source={PlayBtn} style={styles.button}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.emptyButtonContainer}></View>
                    </ImageBackground>
                </View>
                <View id="preBottomLanding" style={styles.backgroundElement}>
                    <ImageBackground source={preBottomLanding} style={[styles.backgroundElementImage, styles.buttonContainerFlex]}>
                        <View style={styles.emptyButtonContainer}></View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('Stats')} style={styles.buttonContainer}>
                                <Image source={StatsBtn} style={styles.button}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.emptyButtonContainer}></View>
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
        flex: 1,
        height: '100%',
        width: '100%',
        position: 'relative'
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
        width: '100%',
        height: '100%',
        zIndex: 0,
        top: 0,
        left: 0
    },
    buttonContainerFlex: {
        flex: 1,
        flexDirection: 'row',
    },
    emptyButtonContainer: {
        flex: 0.5,
    },
    buttonContainer: {
        flex: 1,
    },
    button: {
        flex: 1,
        width: '100%',
        resizeMode: 'center'
    },
    emptyContainer: {
        flex: 2
    }
})