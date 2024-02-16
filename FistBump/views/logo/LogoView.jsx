import { useRef, useEffect } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native'
import { Logo } from '../../resources';
import { useSelector } from 'react-redux';
import { useDbHandlers } from '../../utils/useDbHandlers';
import { useGetUserOnLoad } from '../../store/hooks/useGetUserOnLoad';
import { useNavigation } from '@react-navigation/native';

export function LogoView() {
    console.log('Fuckit')
    const fadeInitial = useRef(new Animated.Value(0)).current;
    const navigation=useNavigation()
console.log('Fuckit2')
    const user = useSelector((state) => state.user.user);
    //console.log(user)
const status= useGetUserOnLoad()
   console.log(status)
    const screenAnimation = () => {
        console.log('called')
        Animated.timing(fadeInitial, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true
        }).start(({ finished }) => {
            console.log('kurecami')
            if (finished) {
                Animated.timing(fadeInitial, {
                    toValue: 0,
                    duration: 5000,
                    useNativeDriver: true
                }).start(({ finished }) => {
            
                    if (finished&&status!='pending') {
                        user?.id?navigation.navigate('Landing'):navigation.navigate("EULA");
                       // navigation.navigate("Landing");
                        fadeInitial.current = new Animated.Value(0);
                    }
                });
            }
        });
    };
    
    useEffect(() => {
        console.log('inside')
        screenAnimation();
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