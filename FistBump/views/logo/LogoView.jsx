import { useRef, useEffect } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native'
import { Logo } from '../../resources';

export function LogoView({ navigation }) {
    const fadeInitial = useRef(new Animated.Value(0)).current;

    const screenAnimation = ({ navigation }) => {
        Animated.timing(fadeInitial, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true
        }).start(({ finished }) => {
            if (finished) {
                Animated.timing(fadeInitial, {
                    toValue: 0,
                    duration: 5000,
                    useNativeDriver: true
                }).start(({ finished }) => {
                    if (finished) {
                        navigation.navigate("EULA");
                        fadeInitial.current = new Animated.Value(0);
                    }
                });
            }
        });
    };

    useEffect(() => {
        screenAnimation({ navigation });
    }, []);

    return (
        <Animated.View style={[styles.container, {
            opacity: fadeInitial
        }]}>
            <View style={styles.imgContainer}>
                <Image source={Logo} style={[styles.logoImage]} >
                </Image> 
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
    },
    imgContainer: {
        width:'50%',
        padding: 25
    },
    logoImage: {
        width: '100%',
        height: '100%'
    }
})