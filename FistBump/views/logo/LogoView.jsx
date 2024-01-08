import { useRef, useEffect } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native'
import { Logo } from '../../resources';
import { useSelector } from 'react-redux';

export function LogoView({ navigation }) {
    console.log('Fuckit')
    const fadeInitial = useRef(new Animated.Value(0)).current;
console.log('Fuckit')
    const user = useSelector((state) => state.user.user);
    
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
                        user?.id?navigation.navigate("Landing"):navigation.navigate("EULA");
                        //navigation.navigate("EULA");
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
        flex:1,
        alignItems: 'center',
    },
    imgContainer: {
        width:'60%'
    },
    logoImage: {
        marginTop: '1%',
        width: '100%',
        height: '100%'
    }
})