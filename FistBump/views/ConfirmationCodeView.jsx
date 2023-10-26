import { Button, View } from "react-native";

import React, { FC } from 'react';
import ConfirmationCode from "./components/ConfirmationCode";
export const ConfirmationCodeView = ({route,navigation}) => {
const {phone}=route.params
    return(<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            
    <ConfirmationCode phone={phone} navigation={navigation}/>
  </View>)
  };