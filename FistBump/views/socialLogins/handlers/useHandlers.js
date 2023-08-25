import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { useCallback, useEffect } from "react";
import { Button } from "react-native";
import { LoginResult, Profile } from "react-native-fbsdk-next";
import { appleAuth } from '@invertase/react-native-apple-authentication';

export function useHandlers(navigation) {
    const signInFacebook = useCallback((error, data) => {
        if (data) {
            console.log(data)
            const currentProfile = Profile.getCurrentProfile().then(
                function (currentProfile) {
                    if (currentProfile) {
                        console.log("USER NAME :" + currentProfile.email)
                    }
                }
            )
            navigation.navigate('Profile', { name: 'Jane' })
        }
        if (error) {
            console.log('ERROR  ' + error)
        }
        //Alert.alert(JSON.stringify(error||data,null,2))
    }, [])

    const signInGoogle = useCallback(async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            navigation.navigate('Profile', { name: 'Jane' })
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
    }, [])

    const onSuccessLinkedin = useCallback(async (token) => {
        try {
            navigation.navigate('Profile', { name: 'Jane' });
            const { access_token, authentication_code } = token
            //const emailRespone=await fetch('https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))',
            const emailRespone = await fetch('https://api.linkedin.com/v2/userinfo',
                {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + access_token
                    }
                })
            console.log(emailRespone)
            const emailObj = await emailRespone.json()
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
    }, [])


    useEffect(() => {
        // Use `setOptions` to update the button that we previously specified
        // Now the button includes an `onPress` handler to update the count
        navigation.setOptions({
            headerLeft: () => (
                <Button onPress={() => navigation.goBack()} title='' />
            ),
        });
    }, [navigation]);


    // async function fetchAndUpdateCredentialState(updateCredentialStateForUser) {
    //     if (user === null) {
    //       updateCredentialStateForUser('N/A');
    //     } else {
    //       const credentialState = await appleAuth.getCredentialStateForUser(user);
    //       if (credentialState === appleAuth.State.AUTHORIZED) {
    //         updateCredentialStateForUser('AUTHORIZED');
    //       } else {
    //         updateCredentialStateForUser(credentialState);
    //       }
    //     }
    //   }
      
      /**
       * Starts the Sign In flow.
       */
      async function onAppleButtonPress() {
        console.warn('Beginning Apple Authentication');
      
        // start a login request
        try {
          const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
          });
      
          console.log('appleAuthRequestResponse', appleAuthRequestResponse);
      
          const {
            user: newUser,
            email,
            nonce,
            identityToken,
            realUserStatus /* etc */,
          } = appleAuthRequestResponse;
      
          //user = newUser;
      
        //   fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
        //     updateCredentialStateForUser(`Error: ${error.code}`),
        //   );
      
          if (identityToken) {
            // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
            console.log(nonce, identityToken);
          } else {
            // no token - failed sign-in?
          }
      
          if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
            console.log("I'm a real person!");
          }
      
          console.warn(`Apple Authentication Completed, ${email}`);
        } catch (error) {
          if (error.code === appleAuth.Error.CANCELED) {
            console.warn('User canceled Apple Sign in.');
          } else {
            console.error(error);
          }
        }
      }
      







    return {
        signInGoogle,
        onSuccessLinkedin,
        signInFacebook,
        onAppleButtonPress
    }
}