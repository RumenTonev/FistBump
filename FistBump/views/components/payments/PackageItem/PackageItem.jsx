import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import Purchases,{CustomerInfo, PurchasesStoreProduct} from 'react-native-purchases';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { setPaymentCount } from '../../../../store/userSlice';
import { useDispatch } from 'react-redux';
import Config from 'react-native-config';
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
  const dispatch = useDispatch();
  const onSelection = async () => {
    setIsPurchasing(true);
    try {
      const { customerInfo } = await Purchases.purchaseStoreProduct(props.product);
       //const kur:CustomerInf
     // if (typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined') {
      navigation.navigate('Stats')
      dispatch(setPaymentCount(Config.REACT_APP_PAYMENT_COUNT))
      //}
    } catch (e) {
      
      if (!e.userCancelled) {
        Alert.alert('Error purchasing package', e.message);
      }
      else {
        Alert.alert('User cancelled');
      }
      navigation.navigate('Landing')
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

