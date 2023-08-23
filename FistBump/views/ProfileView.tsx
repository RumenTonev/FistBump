import { Button, View } from "react-native";

import React, { FC } from 'react';
export const ProfileView:FC = ({navigation}:any) => {
    return(<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            
    <Button
  title="Go to Settings"
  onPress={() =>
   navigation.navigate('Settings')
  }
  />
  </View>)
  };