import React, {useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity,StyleSheet} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import styles from './styles';
import { useAxiosHandlers } from '../../utils/useAxiosHandlers';

//import styles from './styles';

const CELL_COUNT = 4;
// interface Props{
//   phone:string
//   navigation:any
// }
const ConfirmationCode = (propsMine) => {
  const {phone,navigation} = propsMine;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
const disabled=value.length<CELL_COUNT
    const {handleConfirmOTP} =  useAxiosHandlers()
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Basic example</Text>
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
            onPress={()=>handleConfirmOTP(phone,value,navigation)
            
            }>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
    </SafeAreaView>
  );
};


export default ConfirmationCode;