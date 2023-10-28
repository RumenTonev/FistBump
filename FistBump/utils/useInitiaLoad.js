import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect } from "react";

export function useInitialLoad(){
    useEffect(() => {
        GoogleSignin.configure({
          iosClientId:
          process.env.REACT_APP_IOS_CLIENTID,
        
          forceCodeForRefreshToken: true,
        });
      },[]);

}
