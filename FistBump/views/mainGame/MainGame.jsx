import { useEffect, useCallback, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ImageBackground } from "react-native";
import { MainGameSparing, MainGameIntro, HitLeft, HitRight, TrumpBiden, BidenTrump, backBtn, PlayHeader } from "../../resources";
import { customStyles } from '../components/styles';
import { useNavigation } from '@react-navigation/native';
import {  handleClick} from '../logo/LogoView';
import Sound from 'react-native-sound';

// export const punchSound=new Sound('punch.mp3',Sound.MAIN_BUNDLE,(error=>{
//     if(error)
//     {
//         console.log('failed to load sound '+error)
//         return
//     }
// }
// ))

export const handlePunch = useCallback(() => {
    const punchSound=new Sound('punch.mp3',Sound.MAIN_BUNDLE,(error=>{
        if(error)
        {
            console.log('failed to load sound '+error)
            return
        }
        punchSound.play(success => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
            
            punchSound.release();
          }); 
    }
    ))
  }, [])

export const bellSound=new Sound('bell.mp3',Sound.MAIN_BUNDLE,(error=>{
    if(error)
    {
        console.log('failed to load sound '+error)
        return
    }
}
))



// export const gameIntro=new Sound('gameIntro.mp3',Sound.MAIN_BUNDLE,(error=>{
//     if(error)
//     {
//         console.log('failed to load sound '+error)
//         return
//     }
//     gameIntro.play(success => {
//         if (success) {
//           console.log('successfully finished playing');
//         } else {
//           console.log('playback failed due to audio decoding errors');
//         }
        
//         gameIntro.release();
//       });

// }
// ))



export function MainGame() {
    const [actionImage, setActionAnimation] = useState({ image: MainGameIntro });
    let [elementsVisibility, setElementsVisibility] = useState(false);
    let elementVisible = elementsVisibility ? styles.visible : styles.hidden;
    const navigation = useNavigation();

    const triggerAnimation = useCallback((animationImage, duration) => {
        setTimeout(() => {
            
            setElementsVisibility(true);
            setActionAnimation(animationImage);
            //initialSound.release()
        }, duration)
    }, []);

    const setActionImage = useCallback((actionImage, duration) => {
        console.log(actionImage.image)
        setActionAnimation(actionImage);
        setElementsVisibility(false);
        bellSound.play(success => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
            
            bellSound.release();
          });
        setTimeout(() => {
            
           bellSound.stop()
            //initialSound.release()
        }, 1000)
        setTimeout(() => {
            handlePunch()
        }, actionImage.image==19?1000:100)
        
        setTimeout(() => {
            
            setElementsVisibility(true);
            setActionAnimation({ image: MainGameSparing });
        }, duration)
    }, []);

useEffect(()=>{
    const gameIntro=new Sound('gameintro.mp3',Sound.MAIN_BUNDLE,(error=>{
        if(error)
        {
            console.log('failed to load sound '+error)
            return
        }
        gameIntro.play(success => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
            
            gameIntro.release();
          });
    
    }
    ))
},[]);


    useEffect(() => {
        triggerAnimation({ image: MainGameSparing }, 2500);
    }, []);

    const handBack = useCallback(() => {
        handleClick()
        navigation.navigate('Landing')
    }, [])

    return (
        <View style={[styles.container, customStyles.fullStretch]}>
            <ImageBackground style={customStyles.fullStretch} source={actionImage.image}>
                <View style={customStyles.buttonNavBackContainer}>
                    <TouchableOpacity onPress={handBack} style={elementVisible}>
                        <Image source={backBtn}>
                        </Image>
                    </TouchableOpacity>
                </View>
                <View style={[styles.playHeaderContent, elementVisible]}>
                    <View style={[styles.playHeaderContainer]}>
                        <ImageBackground style={customStyles.fullStretch} source={PlayHeader}></ImageBackground>
                    </View>
                </View>
                <View style={[styles.actionButton, styles.buttonHitTrump]}>
                    <TouchableOpacity onPress={() => setActionImage({ image: TrumpBiden }, 2500)} style={elementVisible} >
                        <Image source={HitLeft} style={customStyles.animationActionButton}>
                        </Image>
                    </TouchableOpacity>
                </View>
                <View style={[styles.actionButton, styles.buttonHitBiden]}>
                    <TouchableOpacity onPress={() => setActionImage({ image: BidenTrump }, 1750)} style={elementVisible}>
                        <Image source={HitRight} style={customStyles.animationActionButton}>
                        </Image>
                    </TouchableOpacity>
                </View>
            </ImageBackground >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    actionButton: {
        position: 'absolute',
        bottom: '10%'
    },
    button: {
        width: 70,
        height: 70
    },
    buttonNavBack: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10
    },
    buttonHitBiden: {
        right: '10%'
    },
    buttonHitTrump: {
        left: '10%'
    },
    emptyContainer: {
        flex: 2
    },
    playHeaderContent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '25%',
        width: '100%',
        ...customStyles.headers
    },
    playHeaderContainer: {
        width: '30%'
    },
    visible: {
        display: 'flex'
    },
    hidden: {
        display: 'none'
    }
})