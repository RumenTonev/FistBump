import React, { useCallback, useEffect, useState } from 'react';

import { Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View, Image, ImageBackground, Dimensions } from 'react-native';

import { Colors, } from 'react-native/Libraries/NewAppScreen';
import Config from 'react-native-config';
import Purchases, {
  PRODUCT_CATEGORY,
  PURCHASE_TYPE,
  PurchasesOffering,
  PurchasesOfferings,
  PurchasesPackage,
  PurchasesStoreProduct,
  SubscriptionOption
} from 'react-native-purchases';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setPaymentCount } from '../../../../store/userSlice';
import { LoginBackground, Logo } from '../../../../resources';
import { clickSound, handleClick } from '../../../logo/LogoView';
import { useDbHandlers } from '../../../../utils/useDbHandlers';


//type Props = NativeStackScreenProps<RootStackParamList, 'OfferingDetail'>;

// Taken from https://reactnative.dev/docs/typescript
const OfferingDetailScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [offering, setOfferings] = useState();
  const {patchUser}=useDbHandlers()

  // - State for displaying an overlay view
  const [isPurchasing, setIsPurchasing] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    // Get current available packages
    const getProducts = async () => {
      try {
        // Purchases.logOut()
        //Purchases.logIn("kirkora78@gmail.com")
        const offerings = await Purchases.getOfferings()
    
        setProduct(offerings.current?.availablePackages[0].product)
        const productId = Platform.OS === 'ios' ? 'statsAccess' : 'product123'
        console.log(productId)
        // const products = await Purchases.getProducts([productId],PRODUCT_CATEGORY.NON_SUBSCRIPTION);
        //console.log(products)
        // debugger
        //if (products) {
        //setProducts(products);
        //}
      } catch (e) {
        //debugger
        console.log(e)
        Alert.alert('Error getting offers');
      }
    };
    getProducts()
  }, []);



  const getBack = useCallback(async () => {

    handleClick()
    navigation.navigate('Landing')
  }
    , [])
  const purchaseProduct = useCallback(async () => {
   handleClick()
    setIsPurchasing(true);
    try {
      if (product) {
        const { customerInfo } = await Purchases.purchaseStoreProduct(product);

        //const kur:CustomerInf
        // if (typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined') {

        dispatch(setPaymentCount(Config.REACT_APP_PAYMENT_COUNT-1))
        //patchUser('/CountVisitStats', 4)
        navigation.navigate('Stats')
      }
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
  }
    , [product])


  return (

    <View
      style={styles.container}>

      <View style={styles.imgContainer} >

        <Image source={Logo} resizeMode='contain' style={styles.logoImage} >
        </Image>
      </View>
      <View style={styles.inner}>
        <View style={styles.otherContainer}>
          <Text style={[styles.otherText]}>
            Ignite your curiosity
          </Text>
          <Text style={[{ paddingTop: 0.03*height, textAlign: 'center' }, styles.customFont]}>{product?.description}</Text>
          <Text style={[styles.innerText, styles.customFont]}>
            5 x Full access for just {product?.priceString}
          </Text>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.button]}

            onPress={purchaseProduct}
          >
            <Text style={[styles.buttonText, styles.customFont]}>Continue</Text>

          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cancelButton]}

            onPress={getBack}
          >
            <Text style={[styles.cancelText, styles.customFont]}>Cancel</Text>

          </TouchableOpacity>
        </View>
      </View>


    </View>

  );
};
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  innerText: {
    fontWeight: '300',
    fontSize: 10,
    paddingTop:0.03*height,
  },
  redColor: {
    backgroundColor: '#F57777'
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 0.40*height,
flexGrow:1
  },
  container: {
    flexDirection: 'column',
    height: height,
    flex: 1
  },
  imgContainer: {
    flex: 1,
    width: '100%',
    height: '50%',
    alignItems: 'center'
  },
  otherContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 50,
    paddingRight: 50,
    width: '100%',
    height:0.2*height,
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 0.2*height,
    paddingLeft: 50,
    paddingRight: 50,

  },
  otherText: {
    fontSize: 20,
    lineHeight: 25,
    ...Platform.select({
      ios: { fontFamily: 'Super Funky' },
      android: { fontFamily: 'SuperFunky-lgmWw' }
    })
  },
  button: {
    marginTop: '10%',
    height: height*0.05,
    width: width*0.7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    shadowColor: 'rgba(0,0,0,0.4)',
    borderRadius: 50,
    shadowOffset: {
      width: 10,
      height: 15,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    
  },
  cancelButton: {
    marginTop: '10%',
    height: height*0.05,
    width: width*0.7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0,0.4)',
    borderRadius: 50,
    shadowOffset: {
      width: 10,
      height: 15,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  cancelText:{
    color: 'gray',
    fontSize: 14,
  },
  customFont:{
    ...Platform.select({
      ios: { fontFamily: 'Super Funky' },
      android: { fontFamily: 'SuperFunky-lgmWw' }
    })
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600'
  },
  logoImage: {
    width: '100%',
    height: '100%',
    ...Platform.select({
      ios: { aspectRatio: 120/76 },
      android: { aspectRatio: 1 }
    })
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default OfferingDetailScreen;