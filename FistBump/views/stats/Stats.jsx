import { View, TouchableOpacity, Image, StyleSheet, Text, ScrollView, BackHandler, ImageBackground, Dimensions } from "react-native";
import { StatsBackground, TrumpStatsHolder, BidenStatsHolder, StatsBackgroundPlain, TrumpStatsHeader, StatsBtn, StatsHeader, BidenStatsHeader, backBtn } from "../../resources";
import { useEffect, useState } from "react";

export function Stats({ navigation }) {


    return (
        <View style={styles.container}>
            <ImageBackground style={styles.landingContentStatsBackground} source={StatsBackgroundPlain}>
                <View style={styles.buttonNavBackContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Landing')} style={styles.buttonNavBack}>
                        <Image source={backBtn} style={styles.buttonNavBackImage}>
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
                        <ImageBackground source={TrumpStatsHolder} style={styles.trumpStatsHolder}></ImageBackground>
                    </View>
                    <View style={styles.emptyStatsContainer}>
                    </View>
                    <View style={styles.statsContainer}>
                        <ImageBackground source={BidenStatsHolder} style={styles.bidenStatsHolder}></ImageBackground>
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
        width: '100%',
        marginTop: '2%'
    },
    statsContent: {
        height: '60%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    statsContainer: {
        width: '40%',
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
    statsHeaderPaddingTop: {
        paddingTop: '5%'
    },
    statsHeaderPaddingBottom: {
        paddingBottom: '5%'
    },
    statsHeaderContainer: {
        width: '30%'
    },
    statsHeader: {
        height: '100%',
        width: '100%'
    },
    buttonNavBackContainer: {
        position: 'absolute',
        zIndex: 10,
        top: 10,
        left: 10
    }
})