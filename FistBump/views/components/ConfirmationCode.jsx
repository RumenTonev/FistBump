import React, {useState} from 'react';
import {View, Text, TouchableOpacity,StyleSheet,Image,ImageBackground} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import styles from './styles';
import { useAxiosHandlers } from '../../utils/useAxiosHandlers';
import { useSelector } from 'react-redux';

import { ContinueButton,LoginBackground} from '../../resources';

const CELL_COUNT = 4;

const ConfirmationCode = ({navigation}) => {
  
  const user = useSelector((state) => state.user.user);

  const {id,isUs} = user

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
const disabled=value.length<CELL_COUNT
    const {handleConfirmOTP} =  useAxiosHandlers()
  return (
       <ImageBackground source={LoginBackground} style={styles.wrapper}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <TouchableOpacity
            style={[styles.button, disabled ? {} : styles.redColor]}
            onPress={()=>handleConfirmOTP(value)
            
            }>
                <Text style={styles.buttonText}>Continue</Text> 

          </TouchableOpacity>
          </ImageBackground>
          
  
  );
};


export default ConfirmationCode;