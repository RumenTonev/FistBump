import { View, TouchableOpacity, Image, StyleSheet, Text, ImageBackground, Platform } from "react-native";
import { TrumpStatsHolder, BidenStatsHolder, StatsBackgroundPlain, TrumpStatsHeader, StatsHeader, BidenStatsHeader, backBtn } from "../../resources";
import { RFPercentage } from "react-native-responsive-fontsize";
import { customStyles } from '../components/styles';
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useGetStatsOnLoad } from "../../store/hooks/useGetStatsOnLoad";
import { useCallback } from "react";
import {  handleClick } from "../logo/LogoView";

export function Stats() {
    const stats = useSelector((state) => state.user.results);
    const {BidenCount,TrumpCount}= stats
    const navigation=useNavigation()
    //SPINNER???
    const status=useGetStatsOnLoad()

    const navigateBack = useCallback(() => {
        
handleClick()
        navigation.navigate('Landing')
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.landingContentStatsBackground} source={StatsBackgroundPlain}>
                <View style={customStyles.buttonNavBackContainer}>
                    <TouchableOpacity onPress={navigateBack} >
                        <Image source={backBtn}>
                        </Image>
                    </TouchableOpacity>
                </View>
                <View style={[styles.statsHeaderContent]}>
                    <View style={[styles.statsHeaderContainer, styles.statsHeaderPaddingTop]}>
                        <ImageBackground style={styles.statsHeader} source={TrumpStatsHeader}></ImageBackground>
                    </View>
                    <View style={[styles.statsHeaderContainer, styles.statsHeaderPaddingBottom]}>
                        <ImageBackground style={styles.statsHeader} source={StatsHeader}></ImageBackground>
                    </View>
                    <View style={[styles.statsHeaderContainer, styles.statsHeaderPaddingTop]}>
                        <ImageBackground style={styles.statsHeader} source={BidenStatsHeader}></ImageBackground>
                    </View>
                </View>
                <View style={styles.statsContent}>
                    <View style={styles.statsContainer}>
                        <ImageBackground source={TrumpStatsHolder} style={[styles.centerStat, styles.trumpStatsHolder]} >
                            <View style={styles.statValueContainer}>
                                <Text style={styles.statValue}>{TrumpCount}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.emptyStatsContainer}>
                    </View>
                    <View style={styles.statsContainer}>
                        <ImageBackground source={BidenStatsHolder} style={[styles.bidenStatsHolder, styles.centerStat]}>
                            <View style={styles.statValueContainer}>
                                <Text style={styles.statValue}>{BidenCount}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    landingContentStatsBackground: {
        flex: 1,
        height: '100%',
        width: '100%'
    },
    statsHeaderContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: '35%',
        width: '100%'
    },
    statsContent: {
        height: '60%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    statsContainer: {
        width: '35%'
    },
    emptyStatsContainer: {
        width: '10%'
    },
    trumpStatsHolder: {
        width: '100%',
        height: '100%'
    },
    bidenStatsHolder: {
        width: '100%',
        height: '100%'
    },
    statsHeaderContainer: {
        width: '30%'
    },
    statsHeader: {
        height: '100%',
        width: '100%'
    },
    centerStat: {
        justifyContent: 'center'
    },
    statValue: {
        textAlign: 'center',
        fontSize: RFPercentage(3),
        ...Platform.select({
            ios: { fontFamily: 'Super Funky' },
            android: { fontFamily: 'SuperFunky-lgmWw' }
        })
    }
})