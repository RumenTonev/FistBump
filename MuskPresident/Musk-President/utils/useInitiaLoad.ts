import { useEffect } from "react";
import { Platform } from "react-native";
import Purchases,{ LOG_LEVEL } from "react-native-purchases";

export function useInitialLoad(){
    useEffect(() => {

      Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
    
      if (Platform.OS === 'ios') {
         Purchases.configure({apiKey:'appl_oITEuRedxvdqSCInLYKhNjiqSZi',usesStoreKit2IfAvailable:true});
      } else if (Platform.OS === 'android') {
         Purchases.configure({apiKey: 'goog_oUeggpotKBoWsExTKGdIqyvauRG'});
         //Purchases.purchaseStoreProduct()
        
        // OR: if building for Amazon, be sure to follow the installation instructions then:
         //Purchases.configure({ apiKey: <public_amazon_sdk_key>, useAmazon: true });
      }


        // c
      },[]);

}
