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
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { setupURLPolyfill } from 'react-native-url-polyfill';
import { getCosmosClient } from './utils/cosmosClient';
import { SocialLoginsView } from './views/socialLogins/SocialLoginsView';
import { ProfileView } from './views/profile/ProfileView';
import { SettingsView } from './views/settings/SettingsView';
import { LogoView } from './views/logo/LogoView';
import { EulaView } from './views/eula/EulaView';
import { useDbHandlers } from './utils/useDbHandlers';
import { useInitialLoad } from './utils/useInitiaLoad';
import { ConfirmationCodeView } from './views/ConfirmationCodeView';
import CountryCodePicker from './views/components/CountryCodePicker';
import { Landing } from './views/landing/Landing';
import { MainGame } from './views/mainGame/MainGame';
import { MainPlayerAnimation } from './views/mainGame/MainPlayerAnimation';
import { Stats } from './views/stats/Stats';
import { VoteView } from './views/vote/VoteView';
import PaywallScreen from './views/components/payments/Paywall/Paywall';
import StatePicker from './views/components/statePicker/StatePicker';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';



setupURLPolyfill()
const Stack = createNativeStackNavigator();
const cosmosClient = getCosmosClient()
export const DbContext = createContext(cosmosClient);

function App() {

  useInitialLoad()
  const { handleAdd } = useDbHandlers()

  return (
    <NavigationContainer>
            <DbContext.Provider value={cosmosClient}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
    <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={CountryCodePicker}
                    //component={ProfileView}
                    //component={StatePicker}
                    options={{
                        headerTitle: props => <Text>Home</Text>,
                        fullScreenGestureEnabled:true,
                        headerRight: () => (
                            <Button
                                onPress={handleAdd
                                }
                                title="Add"
                                color="#00cc00"
                            />
                        ),
                    }}
                />
                
        <Stack.Screen name="Profile" component={ProfileView} />
        <Stack.Screen name="Settings" component={SettingsView} />
        <Stack.Screen name="PaywallScreen" component={PaywallScreen}/>
      <Stack.Screen name="ConfirmationCode" component ={ConfirmationCodeView}/>
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

export default App;
