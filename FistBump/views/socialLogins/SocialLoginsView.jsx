
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useHandlers } from './handlers/useHandlers';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import CountryCodePicker from './components/CountryCodePicker';


const cgetMyStringValue = async (key,navigation) => {
  try {
  
      navigation.navigate('Profile', { name: 'Jane' })
    
  } catch(e) {
    // read error
  }

  console.log('Done.')
}


export function SocialLoginsView({ navigation }) {
  useEffect( () => {
    console.log('Inidetime')
    //GoogleSignin.signOut();
    cgetMyStringValue('user',navigation).catch(console.error)
   
   // error reading value
 
},[navigation]);
  //const linkedRef = React.useRef()
  const { onAppleButtonPress } = useHandlers(navigation)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
<CountryCodePicker/> 

      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigation.navigate('Profile', { name: 'Jane' })
        }
      />
      
      <AppleButton
        style={styles.appleButton}
        cornerRadius={5}
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.CONTINUE}
        onPress={() => onAppleButtonPress()}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  appleButton: {
    width: 200,
    height: 60,
    margin: 10,
  },
  header: {
    margin: 10,
    marginTop: 30,
    fontSize: 18,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  horizontal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});