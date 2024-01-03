import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import Purchases,{CustomerInfo, PurchasesStoreProduct} from 'react-native-purchases';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
//import { ENTITLEMENT_ID } from '../../constants';

// interface Props{
// product:PurchasesStoreProduct
// setIsPurchasing:any
// }

export const PackageItem = (props) => {
  const {
  
    product: { title, description, priceString },
    setIsPurchasing
  } = props;

  //const navigation = useNavigation<any>();
  const navigation = useNavigation();

  const onSelection = async () => {
    setIsPurchasing(true);
    try {
      const { customerInfo } = await Purchases.purchaseStoreProduct(props.product);
       //const kur:CustomerInf
     // if (typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined') {
      navigation.navigate('Profile',{ name: 'Jane' })
      //}
    } catch (e) {
      
      if (!e.userCancelled) {
        Alert.alert('Error purchasing package', e.message);
      }
      else {
        Alert.alert('User cancelled');
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <Pressable onPress={onSelection} style={styles.container}>
      <View >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.terms}>{description}</Text>
      </View>
      <Text style={styles.title}>{priceString}</Text>
    </Pressable>
  );
};

