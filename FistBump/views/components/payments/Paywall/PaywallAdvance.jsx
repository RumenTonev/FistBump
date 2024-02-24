import React, { useCallback, useEffect, useState } from 'react';

import { Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View, Image, ImageBackground, Dimensions } from 'react-native';

import { Colors, } from 'react-native/Libraries/NewAppScreen';

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


//type Props = NativeStackScreenProps<RootStackParamList, 'OfferingDetail'>;

// Taken from https://reactnative.dev/docs/typescript
const OfferingDetailScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [offering, setOfferings] = useState();

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
        const productId = Platform.OS === 'ios' ? 'RenewableSubscription' : 'product123'
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







  const purchaseProduct = useCallback(async () => {
    debugger
    setIsPurchasing(true);
    try {
      if (product) {
        const { customerInfo } = await Purchases.purchaseStoreProduct(product);
        debugger
        //const kur:CustomerInf
        // if (typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined') {

        dispatch(setPaymentCount(2))
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

        <Image source={Logo} resizeMode='cover' style={styles.logoImage} >
        </Image>
      </View>
      <View style={styles.inner}>
        <View style={styles.otherContainer}>
          <Text style={styles.otherText}>
            Ignite your curiosity
          </Text>
          <Text style={{ paddingTop: 30, textAlign: 'center' }}>{product?.description}</Text>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.innerText}>
            3 x Full access for just {product?.priceString}
          </Text>
          <TouchableOpacity
            style={[styles.button]}

            onPress={purchaseProduct}
          >
            <Text style={styles.buttonText}>Continue</Text>

          </TouchableOpacity>
        </View>
      </View>


    </View>

  );
};
const {width,height}=Dimensions.get('window')
const styles = StyleSheet.create({
  innerText: {
    fontWeight: '300',
    fontSize: 10
  },
  redColor: {
    backgroundColor: '#F57777'
  },
  inner: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'white',
    height:'40%',
  
  },
  container: {
    flexDirection: 'column',
    height:height,
  flex:1
  },
  imgContainer: {
paddingTop:'20%',
    width: '100%',
  flexShrink:0,
  backgroundColor:'white',

  height:'60%'
  },
  otherContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 50,
    paddingRight: 50,
    width:'100%'
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height:'40%',
    
    paddingLeft: 50,
    paddingRight: 50,
  
  },
  otherText: {
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 25,
    paddingTop: 30
  },
  button: {
    marginTop: 20,
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(233, 60, 6)',
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
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',

  },
  logoImage: {
    width: '100%',
    height:undefined,
    aspectRatio:1,
    overflow:'visible'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default OfferingDetailScreen;