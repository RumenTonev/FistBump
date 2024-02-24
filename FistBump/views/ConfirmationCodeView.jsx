import { Button, View } from "react-native";

import React, { FC } from 'react';
import ConfirmationCode from "./components/ConfirmationCode";
export const ConfirmationCodeView = ({ navigation }) => {

  return (<View style={{ flex: 1}}>
    <ConfirmationCode navigation={navigation} />
  </View>)
};