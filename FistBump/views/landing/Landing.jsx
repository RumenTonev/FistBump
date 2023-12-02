import { View, TouchableOpacity, Image, StyleSheet, Text, ScrollView, BackHandler, ImageBackground } from "react-native";
import { LandingPlayers, Play, Stats, LandingBackground, BindenHome, TrumpHome, Vote } from "../../resources";

export function Landing({ navigation }) {
    const exitApp = () => {
        BackHandler.exitApp();
    }

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.landingBackground} source={LandingBackground}>
                <View style={styles.landingContent}>
                    <View style={styles.landingContentPlayers}>
                        <Image style={styles.landingPlayers} source={TrumpHome}>
                        </Image>
                    </View>
                    <View style={styles.actionsContainer}>
                        <View style={styles.emptyContainer}></View>
                        <View style={styles.action}>
                            <TouchableOpacity onPress={() => navigation.navigate('MainGame')} style={styles.button}>
                                <Image source={Play} style={styles.button}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.action}>
                            <TouchableOpacity onPress={() => exitApp()} >
                                <Image source={Stats} style={styles.button}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.action}>
                            <TouchableOpacity onPress={() => exitApp()} >
                                <Image source={Vote} style={styles.button}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.emptyContainer}></View>
                    </View>
                    <View style={styles.landingContentPlayers}>
                        <Image style={styles.landingPlayers} source={BindenHome}>
                        </Image>
                    </View>
                </View>
            </ImageBackground>
            {/* <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Landing')} style={styles.button}>
                    <Image source={Accept} style={styles.button}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => exitApp()} >
                    <Image source={PrivacyPolicy} style={styles.button}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => exitApp()} >
                    <Image source={Decline} style={styles.button}>
                    </Image>
                </TouchableOpacity>
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%'
    },
    landingBackground: {
        aspectRatio: 16 / 9
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
    actionsContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    action: {
        flex: 1
    },
    button: {
        width: 250,
        height: 90
    },
    emptyContainer: {
        flex: 2
    }
})