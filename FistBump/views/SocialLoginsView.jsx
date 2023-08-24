
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import React, { FC } from 'react';
import {LoginButton, Profile, Settings} from 'react-native-fbsdk-next';
import {
  Button,
  View,
} from 'react-native';
import LinkedInModal, { LinkedInToken } from '@symhomendra21/react-native-linkedin';


export function SocialLoginsView({navigation}){
    const linkedRef=React.useRef()
   const signIn = async () => {
     try {
       await GoogleSignin.hasPlayServices();
       const userInfo = await GoogleSignin.signIn();
       navigation.navigate('Profile', {name: 'Jane'})
       console.log(userInfo.user.email);
     } catch (error) {
       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
         console.log('User cancelled the login flow');
       } else if (error.code === statusCodes.IN_PROGRESS) {
         console.log('Signing in');
       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
         console.log('Play services not available');
       } else {
         console.log('Some other error happened');
         console.log(error.message);
         console.log(error.code);
       }
     }
   };
 
   const onSuccessLinkedin = async (token) => {
     try {
       navigation.navigate('Profile', {name: 'Jane'});
       const{access_token,authentication_code}=token
       //const emailRespone=await fetch('https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))',
       const emailRespone=await fetch('https://api.linkedin.com/v2/userinfo',
       {
         method:'GET',
         headers:{
           Authorization:'Bearer '+ access_token
         }
       })
       console.log(emailRespone)
       const emailObj=await emailRespone.json()
       console.log(emailObj)
     } catch (error) {
       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
         console.log('User cancelled the login flow');
       } else if (error.code === statusCodes.IN_PROGRESS) {
         console.log('Signing in');
       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
         console.log('Play services not available');
       } else {
         console.log('Some other error happened');
         console.log(error.message);
         console.log(error.code);
       }
     }
   };
 
 
 React.useEffect(() => {
   // Use `setOptions` to update the button that we previously specified
   // Now the button includes an `onPress` handler to update the count
   navigation.setOptions({
     headerLeft: () => (
       <Button onPress={() => navigation.goBack()} title=''/>
     ),
   });
 }, [navigation]);
 
   return (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
           
           <Button
      title="Go to Jane's profile"
        onPress={() =>
          navigation.navigate('Profile', {name: 'Jane'})
       }
     />
      <GoogleSigninButton
         style={{width: 192, height: 48, marginTop: 30}}
         size={GoogleSigninButton.Size.Wide}
         color={GoogleSigninButton.Color.Dark}
         onPress={signIn}
       />
       <LoginButton
       testID='facebook-login'
       permissions={['email','public_profile','openid']}
       onLoginFinished={(error,data)=>{
         if(data){
           console.log(data)
           const currentProfile=Profile.getCurrentProfile().then(
 
 
 
             function(currentProfile){
               if(currentProfile){
                 console.log("USER NAME :"+currentProfile.email)
               }
             }
           )
           navigation.navigate('Profile', {name: 'Jane'})
 
         }
         
 if(error){
   console.log('ERROR  ' +error)
 }
         //Alert.alert(JSON.stringify(error||data,null,2))
       }}
       />
       {/* <LinkedInModal
         ref={linkedRef}
         clientID=LINKEDIN_CLIENTID
         clientSecret=LINKEDIN_CLIENTSECRET
         permissions={['openid','profile','email','r_emailaddress']}
         redirectUri="https://oauth.pstmn.io/v1/callback"
         onSuccess={onSuccessLinkedin}
       />
       <Button title="Log Out" onPress={linkedRef?.current?.logoutAsync()} />
      */}
   
 </View>
   );
 }