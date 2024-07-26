import { useCallback } from "react";
import { Linking } from 'react-native';
import { View, TouchableOpacity, Image, StyleSheet, Text, ScrollView, BackHandler, ImageBackground, Platform, Dimensions } from "react-native";
import { EulaFrame } from "../../resources";
import { tou } from "../../resources/tou.js";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setConfirmedTerms, setPaymentCount } from "../../store/userSlice";
import { RFPercentage } from "react-native-responsive-fontsize";
import Config from 'react-native-config';


export function EulaView() {
    const privacyPolicyUrl = 'https://crazybastards.pro/privacy-policy/';
    const navigation = useNavigation()

    const dispatch = useDispatch();

    const openUrl = async (url) => {
        await Linking.openURL(url);
    };

    const exitApp = () => {
        BackHandler.exitApp();
    };


    const handleOnAccept = useCallback(() => {
        try {
            console.log('COUNTC '+Config.REACT_APP_PAYMENT_COUNT)
            dispatch(setPaymentCount(Config.REACT_APP_PAYMENT_COUNT))
            dispatch(setConfirmedTerms())
            navigation.navigate('Landing')
        }
        catch (e) {
            console.log('Iside Accept ' + e)
        }
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.eulaContent}>
                <ImageBackground style={styles.eulaFrame} source={EulaFrame}>
                    <ScrollView bounces="false" style={styles.textContainer} contentContainerStyle={styles.contentContainer}>
                        <View style={styles.textHeadersContainer}>
                            <Text style={styles.text}>TERMS OF USE</Text>
                            <Text style={styles.text}>27th February 2024</Text>
                        </View>
                        <Text style={styles.text}>{tou}</Text>
                    </ScrollView>
                </ImageBackground>
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity onPress={handleOnAccept} style={[styles.button, styles.acceptBtnBgColor]}>
                    <Text style={[styles.buttonText, styles.customFont]}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openUrl(privacyPolicyUrl)} style={[styles.button, styles.ppBtnBgColor]}>
                    <Text style={[styles.buttonText, styles.customFont]}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => exitApp()} style={[styles.button, styles.rejectBtnBgColor]}>
                    <Text style={[styles.buttonText, styles.customFont]}>Reject</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

let { width, height } = Dimensions.get('window');
let widthCalculated = height;
let heightCalculated = width;
console.log(width);
console.log(height);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center'
    },
    textContainer: {
        top: '12%',
        left: '10%',
        height: '70%',
        width: '80%',
        position: 'absolute',
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingTop: '15%'
    },
    text: {
        color: 'black',
        fontSize: 16
    },
    textHeadersContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    eulaFrame: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    eulaContent: {
        height: '80%',
        width: '80%',
    },
    contentContainer: {
        flexGrow: 1,
        paddingBottom: 100
    },
    customFont: {
        ...Platform.select({
            ios: { fontFamily: 'Super Funky' },
            android: { fontFamily: 'SuperFunky-lgmWw' }
        })
    },
    buttonText: {
        color: 'white',
        fontSize: RFPercentage(2)
    },
    acceptBtnBgColor: {
        backgroundColor: '#d1a728'
    },
    ppBtnBgColor: {
        backgroundColor: '#d1a728'
    },
    rejectBtnBgColor: {
        backgroundColor: '#d1a728'
    },
    button: {
        marginTop: '1.5%',
        height: heightCalculated * 0.10,
        width: widthCalculated * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    bottomContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    }
})