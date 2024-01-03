import { useCallback, useEffect } from "react";
import { appleAuth } from '@invertase/react-native-apple-authentication';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDbHandlers } from "../../../utils/useDbHandlers";
import { CosmosClient } from "@azure/cosmos";

export function useHandlers(navigation) {
  
  const{handleGet,handleUpsert}=useDbHandlers()
    
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
            if(email){
            console.log('EMAILLLL' +email)
            //handleGet(email)}
            }
          else{
            
          }
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
  
        onAppleButtonPress
    }
}