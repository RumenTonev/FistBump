import React, { useState, useRef, useCallback, useEffect } from 'react';
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  Alert,
  ImageBackground,
  Image,
  Platform,
  Keyboard,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useAxiosHandlers } from '../../utils/useAxiosHandlers';
import { ContinueButton, LoginBackground } from '../../resources';
import { clickSound, handleClick } from '../logo/LogoView';
import { useDispatch, useSelector } from 'react-redux';
import { setAttemptCount } from '../../store/userSlice';
import { useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();



const CountryCodePicker = () => {
  const [value, setValue] = useState('');
  const [callingCode, setCallingCode] = useState('')
  const [isUs, setIsUs] = useState(true)
  const [disabled, setDisabled] = useState(false);
  const [isValid, setIsValid] = useState(false)
  const phoneInput = useRef(null);
  const navigation = useNavigation();
  const { handleSendOTP } = useAxiosHandlers()
  const dispatch = useDispatch();







  const user = useSelector((state) => state.user.user);
  const { attemptCounts } = user
  const handleOnChange = useCallback((phoneNumber) => {

    // if(phone.startsWith(countryCode))
    // {}
    try {
      console.log(phoneNumber)
      //if(phoneUtil.isValidNumber(phoneNumber))
      // {

      const callingCode = phoneInput.current?.getCallingCode()
      console.log(callingCode)
      const countryCode = phoneInput.current?.getCountryCode()
      setIsUs(countryCode == 'US')
      console.log(countryCode)
      console.log(countryCode == 'US')

      const parsedNo = phoneUtil.parseAndKeepRawInput(phoneNumber.startsWith('+') ? phoneNumber : `+${callingCode}${phoneNumber}`, 'US');
      var isValidNum = phoneUtil.isValidNumberForRegion(parsedNo, countryCode)||Config.REACT_APP_LOGIN_PHONE_USA==`+${callingCode}${phoneNumber}`;
      setIsValid(isValidNum && isUs)
      // Print the phone's country code.
      //console.log(number.getCountryCode());
      // => 1

      // Print the phone's national number.
      //console.log(number.getNationalNumber());
      // => 2024561414
      //const parsedNo = phoneUtil.parse(phoneNumber, '');
      console.log(parsedNo)

      if (parsedNo.hasNationalNumber()) {
        const nationalNumber = parsedNo.getNationalNumber().toString();
        console.log(nationalNumber)

        const code = parsedNo.getCountryCode();
        console.log(code)
        const mineCode = phoneUtil.getRegionCodeForNumber(parsedNo)
        //if(mineCode){
        phoneInput.current?.setState((state) => {
          return {
            code:'1',
            number: nationalNumber,
            modalVisible: false,
            countryCode: 'US',
            disabled: false,
          }

        })
        setValue(nationalNumber)
        setCallingCode('1')


        console.log('MINECODE   ' + mineCode)
        // const countryCode = phoneUtil.getRegionCodeForCountryCode(code);
        //console.log(countryCode)

        // // it's ugly, but it works
        // phoneInput.current?.setState({
        //   countryCode: countryCode,
        //   code: code.toString(),
        //   number: nationalNumber,
        // });
      }
    }
    catch (e) {

    }




  }, [value, phoneInput.current, setValue, isUs])







  const handleOnPress = useCallback(() => {
    handleClick()
    if (!isValid) {
      Alert.alert("Please enter a valid US number",)
    }
    else {
      dispatch(setAttemptCount())

      handleSendOTP(`+${callingCode}${value}`, isUs)
     // handleSendOTP('+359896431015', isUs)

    }
  }, [callingCode, value, isUs])






  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          {/* <ImageBackground source={LoginBackground} style={styles.wrapper}> */}
          <View style={[{ flex: 1,justifyContent:'flex-end'}]}>
            <Text style={styles.modalText}>To keep voting clear, we allow only valid USA numbers to vote. You have {3 - attemptCounts} attempts to submit your number</Text>
          </View>
          {/*@ts-ignore*/}
          <View style={{flex:1,justifyContent:'center'}} >
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="US"
            value={value}
            layout="first"
            onChangeText={(text) => { handleOnChange(text) }}
            countryPickerProps={{visible:false}}

            disabled={false}
            disableArrowIcon
            //withDarkThemer
            withShadow
            autoFocus={false}
            //onPressOut={()=>Keyboard.dismiss()}
            textInputProps={{ autoCorrect: true, textContentType: "telephoneNumber", autoComplete: "tel", autoFocus: false, importantForAutofill: "yes", inputMode: "tel", dataDetectorTypes: "phoneNumber", keyboardType: "number-pad",returnKeyType:'done'}}
          />
          </View>
          <View style={[{flex:1,justifyContent:'space-evenly'}]}>
          <TouchableOpacity
            style={[styles.button, 3 - attemptCounts == 0||!isValid ? styles.redColor : {}]}
            //onPress={()=>handleSendOTP(`+${callingCode}${value}`,isUs,navigation)}
            disabled={3 - attemptCounts == 0||!isValid}
            onPress={handleOnPress}
          >

            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonCancel]}
            onPress={() => navigation.navigate('Landing')}
          >

            <Text style={styles.buttonTextCancel}>Cancel</Text>
          </TouchableOpacity>

          </View>
          {/* </ImageBackground> */}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  border:{
    borderWidth:1,
    borderColor:'yellow'
  },
  modalText: {
    textAlign: 'center',
    fontSize: RFPercentage(3),
    color: '#F57777',
    ...Platform.select({
      ios: { fontFamily: 'Super Funky' },
      android: { fontFamily: 'SuperFunky-lgmWw' }
    })
  },
  container: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems:'center'
  },
  button: {
    marginTop: 20,
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },

  buttonCancel: {
  
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonTextCancel: {
    color: 'gray',
    fontSize: 14,
  },




  redColor: {
    backgroundColor: '#F57777'
  },
  image: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    aspectRatio: 4
  },
  message: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default CountryCodePicker;