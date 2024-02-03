import { View, TouchableOpacity, Image, StyleSheet, Text, ScrollView, BackHandler, ImageBackground, Dimensions } from "react-native";
import { StatsBackground, TrumpStatsHolder, BidenStatsHolder, StatsBackgroundPlain, TrumpStatsHeader, StatsBtn, StatsHeader, BidenStatsHeader, backBtn } from "../../resources";
import { useEffect, useState } from "react";

export function Stats({ navigation }) {


    return (
        <View style={styles.container}>
            <ImageBackground style={styles.landingContentStatsBackground} source={StatsBackgroundPlain}>
                <TouchableOpacity onPress={() => navigation.navigate('Landing')} style={styles.buttonContainer}>
                    <Image source={backBtn} style={styles.buttonNavBack}>
                    </Image>
                </TouchableOpacity>
                <View style={[styles.statsHeaderContent]}>
                    {/* <View style={[styles.statsHeaderContainer]}>
                        <ImageBackground style={styles.statsHeader} source={TrumpStatsHeader}></ImageBackground>
                    </View> */}
                    <View style={[styles.statsHeaderContainer]}>
                        <ImageBackground style={styles.statsHeader} source={StatsHeader}></ImageBackground>
                    </View>
                    {/* <View style={[styles.statsHeaderContainer]}>
                        <ImageBackground style={styles.statsHeader} source={BidenStatsHeader}></ImageBackground>
                    </View> */}
                </View>
                <View style={styles.statsContent}>

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
        justifyContent: 'space-around',
        height: '25%',
        width: '100%',
        marginTop: '2%'
    },
    statsContent: {
        height: '65%',
        width: '100%',
    },
    statsHeaderContainer: {
        width: '30%'
    },
    statsHeader: {
        height: '100%',
        width: '100%'
    },
    buttonNavBack: {
        position: 'absolute',
        top: 10,
        left: 10
    },
})