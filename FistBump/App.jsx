/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React,{createContext} from 'react';
import {
  Button,
  StyleSheet,
  Text,
} from 'react-native';
import { setupURLPolyfill } from 'react-native-url-polyfill';
import { getCosmosClient } from './utils/cosmosClient';
import { SocialLoginsView } from './views/SocialLoginsView';
import { ProfileView } from './views/ProfileView';
import { SettingsView } from './views/SettingsView';
import { useDbHandlers } from './utils/useDbHandlers';
import { useInitialLoad } from './utils/useInitiaLoad';
import { ConfirmationCodeView } from './views/ConfirmationCodeView';
import CountryCodePicker from './views/components/CountryCodePicker';



setupURLPolyfill()
const Stack = createNativeStackNavigator();
const cosmosClient=getCosmosClient()
export const DbContext = createContext(cosmosClient);

function App(){
 
useInitialLoad()
    const {handleAdd}=useDbHandlers()

  return (
    <NavigationContainer>
            <DbContext.Provider value={cosmosClient}>

    <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={CountryCodePicker}
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
      <Stack.Screen name="ConfirmationCode" component ={ConfirmationCodeView}/>
            </Stack.Navigator>
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
