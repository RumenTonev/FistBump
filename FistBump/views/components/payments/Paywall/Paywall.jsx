/**
 * @file Paywall Screen.
 * @author Vadim Savin
 */

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, Platform } from 'react-native';
import Purchases, { PRODUCT_CATEGORY, PURCHASE_TYPE, PurchasesStoreProduct } from 'react-native-purchases';
import { PackageItem } from '../PackageItem/PackageItem';
import styles from './styles';

/*
 An example paywall that uses the current offering.
 */
const PaywallScreen = () => {
  // - State for all available package
  //const [products, setProducts] = useState<PurchasesStoreProduct[]>([]);
  const [products, setProducts] = useState([]);

  // - State for displaying an overlay view
  const [isPurchasing, setIsPurchasing] = useState(false);
  

  useEffect(() => {
    // Get current available packages
    const getProducts = async () => {
      try {
       // Purchases.logOut()
        //Purchases.logIn("kirkora78@gmail.com")
        const productId=Platform.OS === 'ios'?'RenewableSubscription':'product123'
        console.log(productId)
        const products = await Purchases.getProducts([productId],PRODUCT_CATEGORY.NON_SUBSCRIPTION);
        console.log(products)
       // debugger
        if (products) {
          setProducts(products);
        }
      } catch (e) {
       //debugger
        console.log(e)
        Alert.alert('Error getting offers');
      }
    };
getProducts()
  }, []);

  const header = () => <Text style={styles.text}>Magic Weather Premium</Text>;

  const footer = () => {
    // console.warn(
    //   "Modify this value to reflect your app's Privacy Policy and Terms & Conditions agreements. Required to make it through App Review.",
    // );
    return (
      <Text style={styles.text}>
        Don't forget to add your subscription terms and conditions. Read more about this here:
        https://www.revenuecat.com/blog/schedule-2-section-3-8-b
      </Text>
    );
  };

  return (
    <View style={styles.page}>
      {/* The paywall flat list displaying each package */}
      <FlatList
        data={products}
        renderItem={({ item }) => <PackageItem product={item} setIsPurchasing={setIsPurchasing} />}
        keyExtractor={(item) => item.identifier}
        ListHeaderComponent={header}
        ListHeaderComponentStyle={styles.headerFooterContainer}
        ListFooterComponent={footer}
        ListFooterComponentStyle={styles.headerFooterContainer}
      />

      {isPurchasing && <View style={styles.overlay} />}
    </View>
  );
};

export default PaywallScreen;