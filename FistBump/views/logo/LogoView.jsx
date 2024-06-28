import { useRef, useEffect, useCallback } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native'
import { Logo } from '../../resources';
import { useSelector } from 'react-redux';
import { useGetUserOnLoad } from '../../store/hooks/useGetUserOnLoad';
import { useNavigation } from '@react-navigation/native';
import Sound from 'react-native-sound';

Sound.setCategory('Playback')

const initialSound = new Sound('intro.mp3', Sound.MAIN_BUNDLE, (error => {
    if (error) {
        console.log('failed to load sound ' + error)
        return
    }
    initialSound.play(success => {
        if (success) {
            console.log('successfully finished playing');
        } else {
            console.log('playback failed due to audio decoding errors');
        }

        initialSound.release();
    });

}
))
initialSound.setNumberOfLoops(-1)
initialSound.setVolume(1)

export const handleClick = useCallback(() => {
    const clickSound = new Sound('click.mp3', Sound.MAIN_BUNDLE, (error => {
        if (error) {
            console.log('failed to load sound ' + error)
            return
        }
        clickSound.play(success => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }

            clickSound.release();
        });
    }
    ))
}, [])




initialSound.setVolume(1)
export function LogoView() {
    const fadeInitial = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation()
    const user = useSelector((state) => state.user.user);

    //const status = useGetUserOnLoad()
    //console.log(status)
    const screenAnimation = () => {
        console.log('called')

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
                    initialSound.stop()
                    if (finished ) {
                        user?.confirmedTerms ? navigation.navigate('Landing') : navigation.navigate("EULA");
                        fadeInitial.current = new Animated.Value(0);
                    }
                    initialSound.release()
                });
            }
        });
    };

    useEffect(() => {
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
        flex: 1,
        alignItems: 'center',
    },
    imgContainer: {
        width: '60%'
    },
    logoImage: {
        marginTop: '1%',
        width: '100%',
        height: '100%'
    }
})