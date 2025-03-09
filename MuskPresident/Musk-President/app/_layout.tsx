import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
//import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { createContext } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { getCosmosClient } from '@/hooks/cosmosClient';
import { useInitialLoad } from '@/hooks/useInitiaLoad';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { LogoView } from '@/views/logo/LogoView';
import { persistor, store } from '@/store/store';
import { EulaView } from '@/views/eula/EulaView';
import { Landing } from '@/views/landing/Landing';
import { MainGame } from '@/views/mainGame/MainGame';
import { VoteView } from '@/views/vote/VoteView';
import { MainPlayerAnimation } from '@/views/mainGame/MainPlayerAnimation';
import { Stats } from '@/views/stats/Stats';
import { ConfirmationCodeView } from '@/views/ConfirmationCodeView';
import { ProfileView } from '@/views/profile/ProfileView';
import { SettingsView } from '@/views/settings/SettingsView';
import PaywallScreen from '@/views/components/payments/Paywall/Paywall';
import OfferingDetailScreen from '@/views/components/payments/Paywall/PaywallAdvance';
// import { setupURLPolyfill } from 'react-native-url-polyfill';
// import { getCosmosClient } from './utils/cosmosClient';
// import { ProfileView } from './views/profile/ProfileView';
// import { SettingsView } from './views/settings/SettingsView';
// import { LogoView } from './views/logo/LogoView';
// import { EulaView } from './views/eula/EulaView';
// import { useInitialLoad } from './utils/useInitiaLoad';
// import { ConfirmationCodeView } from './views/ConfirmationCodeView';
// import CountryCodePicker from './views/components/CountryCodePicker';
// import { MainPlayerAnimation } from './views/mainGame/MainPlayerAnimation.jsx';
// import { Stats } from './views/stats/Stats';
// import { VoteView } from './views/vote/VoteView';
// import PaywallScreen from './views/components/payments/Paywall/Paywall';
// import { Provider } from 'react-redux';
// import { persistor, store } from './store/store';
// import { PersistGate } from 'redux-persist/integration/react';
// import { MainGame } from './views/mainGame/MainGame';
// import OfferingDetailScreen from './views/components/payments/Paywall/PaywallAdvance';
// import { Landing } from './views/landing/Landing';


// import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
//SplashScreen.preventAutoHideAsync();
//setupURLPolyfill()
const Stack = createNativeStackNavigator();
const cosmosClient = getCosmosClient()
export const DbContext = createContext(cosmosClient);

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  // });

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }
  useInitialLoad()
  return (
    <NavigationContainer>
      <DbContext.Provider value={cosmosClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Stack.Navigator screenOptions={{
              orientation: "landscape"
            }}>
              <Stack.Screen name="Logo" component={LogoView} options={{
                headerShown: false,
              }} />
              <Stack.Screen name="EULA" component={EulaView} options={{
                headerShown: false,
              }} />
              {/* <Stack.Screen
                name="SocialLogins"
                component={CountryCodePicker}
                options={{
                  headerShown: false,
                  orientation: "portrait"
                }}
              /> */}
              <Stack.Screen name="PaywallScreen" component={OfferingDetailScreen} options={{
                headerShown: false,
                orientation: "portrait"
              }} />
              <Stack.Screen name="Landing" component={Landing} options={{
                headerShown: false,
              }} />
              <Stack.Screen name="MainGame" component={MainGame} options={{
                headerShown: false
              }} />
              <Stack.Screen name="Vote" component={VoteView} options={{
                headerShown: false
              }} />
              <Stack.Screen name="MainPlayerAnimation" component={MainPlayerAnimation} options={{
                headerShown: false
              }} />
              <Stack.Screen name="Stats" component={Stats} options={{
                headerShown: false
              }} />
              {/* <Stack.Screen name="ConfirmationCode" component={ConfirmationCodeView} options={{
                headerShown: false,
                orientation: "portrait"
              }} /> */}
              <Stack.Screen name="Profile" component={ProfileView} />
              <Stack.Screen name="Settings" component={SettingsView} />
              <Stack.Screen name="Paywall" component={PaywallScreen} />

            </Stack.Navigator>
          </PersistGate>
        </Provider>
      </DbContext.Provider>

    </NavigationContainer>
  
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});