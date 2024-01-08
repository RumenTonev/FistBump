
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';
import { LoginButton } from 'react-native-fbsdk-next';
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useHandlers } from './handlers/useHandlers';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryCodePicker from './components/CountryCodePicker';


const cgetMyStringValue = async (key,navigation) => {
  try {
    const value=await AsyncStorage.getItem(key)
    console.log(key+' USER '+value)
    if (value) {
      navigation.navigate('Profile', { name: 'Jane' })
    }
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
  const linkedRef = React.useRef()
  const { signInGoogle, signInFacebook,onAppleButtonPress } = useHandlers(navigation)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
<CountryCodePicker/> 

      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigation.navigate('Profile', { name: 'Jane' })
        }
      />
      
      <GoogleSigninButton
        style={{ width: 192, height: 48, marginTop: 30 ,marginBottom:30}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signInGoogle}
      />
  
      <LoginButton
        testID='facebook-login'
        permissions={['email', 'public_profile', 'openid']}
        onLoginFinished={signInFacebook}

      />
      <AppleButton
        style={styles.appleButton}
        cornerRadius={5}
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.CONTINUE}
        onPress={() => onAppleButtonPress()}
      />
      {/* <LinkedInModal
         ref={linkedRef}
         clientID="78jx520vqfzskv"
         clientSecret="h7kXliVSwS9SydjZ"
         permissions={['openid','profile','email','r_emailaddress']}
         redirectUri="https://oauth.pstmn.io/v1/callback"
         onSuccess={onSuccessLinkedin}
       />
       <Button title="Log Out" onPress={linkedRef?.current?.logoutAsync()} />
      */}

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