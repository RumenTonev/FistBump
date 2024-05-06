import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Keyboard, TouchableWithoutFeedback } from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { customStyles } from './styles';
import { useAxiosHandlers } from '../../utils/useAxiosHandlers';
import { useSelector } from 'react-redux';
import { ContinueButton, LoginBackground } from '../../resources';
import { useNavigation } from '@react-navigation/native';

const CELL_COUNT = 4;

const ConfirmationCode = () => {

  const user = useSelector((state) => state.user.user);
  const navigation = useNavigation()
  const { id, isUs } = user

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const disabled = value.length < CELL_COUNT
  const { handleConfirmOTP } = useAxiosHandlers()
  return (







    <>
      <StatusBar barStyle="dark-content" />
      <View style={customStyles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={customStyles.wrapper}>
          {/* <ImageBackground source={LoginBackground} style={styles.wrapper}> */}
          <View style={[{ flex: 1, justifyContent: 'flex-end' }]}>
            <Text style={customStyles.modalText}>Enter the code send to +{id}</Text>
          </View>
          {/*@ts-ignore*/}
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={customStyles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              //returnKeyType="done"

              //textInputProps={{ autoCorrect: true, textContentType: "telephoneNumber", autoComplete: "tel", autoFocus: false, importantForAutofill: "yes", inputMode: "tel", dataDetectorTypes: "phoneNumber", keyboardType: "number-pad",returnKeyType:'done'}}
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[customStyles.cell, isFocused && customStyles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />

          </View>
          <View style={[{ flex: 1, justifyContent: 'space-evenly' }]}>
            <TouchableOpacity
              style={[customStyles.button, disabled ? customStyles.redColor : {}]}
              onPress={() => handleConfirmOTP(value)}
              disabled={disabled}
            >
              <Text style={customStyles.buttonText}>Confirm</Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={[customStyles.buttonCancel]}
              onPress={() => navigation.navigate('SocialLogins')}
            >

              <Text style={customStyles.buttonTextCancel}>Cancel</Text>
            </TouchableOpacity>


          </View>
          {/* </ImageBackground> */}
        </View>
        </TouchableWithoutFeedback>
      </View>
    </>
    //<ImageBackground source={LoginBackground} style={customStyles.wrapper}>
    //      <>
    //     <CodeField
    //       ref={ref}
    //       {...props}
    //       value={value}
    //       onChangeText={setValue}
    //       cellCount={CELL_COUNT}
    //       rootStyle={customStyles.codeFieldRoot}
    //       keyboardType="number-pad"
    //       textContentType="oneTimeCode"
    //       renderCell={({index, symbol, isFocused}) => (
    //         <Text
    //           key={index}
    //           style={[customStyles.cell, isFocused && customStyles.focusCell]}
    //           onLayout={getCellOnLayoutHandler(index)}>
    //           {symbol || (isFocused ? <Cursor /> : null)}
    //         </Text>
    //       )}
    //     />
    //     <TouchableOpacity
    //           style={[customStyles.button, disabled ? {} : customStyles.redColor]}
    //           onPress={()=>handleConfirmOTP(value)

    //           }>
    //               <Text style={customStyles.buttonText}>Continue</Text> 

    //         </TouchableOpacity>

    //         <TouchableOpacity
    //         style={[customStyles.button]}
    //         onPress={()=>navigation.navigate('SocialLogins')}
    //         >

    //        <Text style={customStyles.buttonText}>Cancel</Text> 
    //       </TouchableOpacity> 


    // </>
  );
};


export default ConfirmationCode;