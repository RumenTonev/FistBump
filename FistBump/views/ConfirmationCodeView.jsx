import { Button, View } from "react-native";

import React, { FC } from 'react';
import ConfirmationCode from "./components/ConfirmationCode";
export const ConfirmationCodeView = ({ navigation }) => {

  return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ConfirmationCode navigation={navigation} />
  </View>)
};