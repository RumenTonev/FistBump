import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect } from "react";

export function useInitialLoad(){
    useEffect(() => {
        GoogleSignin.configure({
          iosClientId:
          GOOGLE_LOGIN_URL,
        
          forceCodeForRefreshToken: true,
        });
      },[]);

}
