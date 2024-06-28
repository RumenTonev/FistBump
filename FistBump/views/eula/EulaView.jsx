import { useCallback } from "react";
import { Linking } from 'react-native';
import { View, TouchableOpacity, Image, StyleSheet, Text, ScrollView, BackHandler, ImageBackground } from "react-native";
import { Accept, Decline, PrivacyPolicy, EulaFrame } from "../../resources";
import { tou } from "../../resources/tou.js";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setConfirmedTerms, setPaymentCount } from "../../store/userSlice";


export function EulaView() {
    const privacyPolicyUrl = 'https://crazybastards.pro/privacy-policy/';
    const navigation=useNavigation()
  
  const dispatch = useDispatch();

    const openUrl = async (url) => {
        await Linking.openURL(url);
    };

    const exitApp = () => {
        BackHandler.exitApp();
    };


    const handleOnAccept = useCallback(() => {
        try{
        dispatch(setPaymentCount(3))
        dispatch(setConfirmedTerms())
        navigation.navigate('Landing')
        }
        catch(e)
        {
            console.log('Iside Accept '+e)
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
            <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={handleOnAccept} style={styles.buttonContainer}>
                    <Image source={Accept} style={styles.button}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openUrl(privacyPolicyUrl)} style={styles.buttonContainer}>
                    <Image source={PrivacyPolicy} style={styles.button}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => exitApp()} style={styles.buttonContainer}>
                    <Image source={Decline} style={styles.button}>
                    </Image>
                </TouchableOpacity>
            </View>
        </View>
    );
}

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
    actionsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonContainer: {
        flex: 1
    },
    button: {
        width: 'auto',
        height: '100%'
    },
    contentContainer: {
        flexGrow: 1,
        paddingBottom: 100
    }
})