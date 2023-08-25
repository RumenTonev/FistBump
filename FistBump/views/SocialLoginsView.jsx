
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import React from 'react';
import { LoginButton } from 'react-native-fbsdk-next';
import {
  Button,
  View,
  StyleSheet
} from 'react-native';
import { useHandlers } from './socialLogins/handlers/useHandlers';
import { AppleButton } from '@invertase/react-native-apple-authentication';


export function SocialLoginsView({ navigation }) {
  const linkedRef = React.useRef()
  const { signInGoogle, signInFacebook,onAppleButtonPress } = useHandlers(navigation)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigation.navigate('Profile', { name: 'Jane' })
        }
      />
      <GoogleSigninButton
        style={{ width: 192, height: 48, marginTop: 30 }}
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