import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect } from "react";

export function useInitialLoad(){
    useEffect(() => {
        GoogleSignin.configure({
          iosClientId:
            '79644514365-n2v7gii0ps085lvl97futgipkjd8oucm.apps.googleusercontent.com',
        
          forceCodeForRefreshToken: true,
        });
      },[]);

}
