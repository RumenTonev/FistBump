import React, {useState, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { useAxiosHandlers } from '../../utils/useAxiosHandlers';
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();



const CountryCodePicker = ({navigation}) => {
  const [value, setValue] = useState('');
  const [callingCode,setCallingCode]=useState('')
  const [isUs,setIsUs]=useState(true)
  const [disabled, setDisabled] = useState(false);
  const [isValid,setIsValid]=useState(false)
  const phoneInput = useRef<PhoneInput>(null);
const {handleSendOTP}=  useAxiosHandlers()
  const handleOnChange=useCallback((phoneNumber)=>
  {
  
    // if(phone.startsWith(countryCode))
    // {}
    try{
    console.log(phoneNumber)
    //if(phoneUtil.isValidNumber(phoneNumber))
   // {
    
    const callingCode= phoneInput.current?.getCallingCode()
    console.log(callingCode)
    const countryCode=phoneInput.current?.getCountryCode()
    setIsUs(countryCode=='US')
    console.log(countryCode)
    console.log(countryCode=='US')

      const parsedNo = phoneUtil.parseAndKeepRawInput(phoneNumber.startsWith('+')?phoneNumber:`+${callingCode}${phoneNumber}`, 'US');
var isValidNum=phoneUtil.isValidNumberForRegion(parsedNo, countryCode);
setIsValid(isValidNum)
// Print the phone's country code.
//console.log(number.getCountryCode());
// => 1

// Print the phone's national number.
//console.log(number.getNationalNumber());
// => 2024561414
    //const parsedNo = phoneUtil.parse(phoneNumber, '');
    console.log(parsedNo)
    debugger
    if (parsedNo.hasNationalNumber()) {
      const nationalNumber = parsedNo.getNationalNumber().toString();
      console.log(nationalNumber)
      
      const code = parsedNo.getCountryCode();
      console.log(code)
      const mineCode=phoneUtil.getRegionCodeForNumber(parsedNo)
      //if(mineCode){
      phoneInput.current?.setState((state)=>{
       return{ code: code,
      number: nationalNumber,
      modalVisible: state.modalVisible,
      countryCode: mineCode? mineCode : state.countryCode,
      disabled: false,
       }
    
        })
      setValue(nationalNumber)
      setCallingCode(code)
    
      
      console.log('MINECODE   '+mineCode)
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
    catch(e){
      debugger
    }
    
  
 
    
  },[value,phoneInput.current,setValue])







  const handleOnPress=useCallback(()=>
  {
  debugger
  if(!isValid)
  {
Alert.alert("Please enter a valid number",)
  }
  else{
    handleSendOTP(`+${callingCode}${value}`,isUs,navigation)
  }
  },[callingCode,value,isUs,navigation])




  

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}> 
      
        <SafeAreaView style={styles.wrapper}>
        
        {/*@ts-ignore*/}
           <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="BG"
            value={value}
            layout="first"
            onChangeText={(text)=>{handleOnChange(text)}}
            countryPickerProps={{withAlphaFilter:true}}
            disabled={false}
            //withDarkTheme
            //withShadow
            autoFocus
            textInputProps={{ autoCorrect:true,textContentType:"telephoneNumber",autoComplete:"tel",autoFocus:false,importantForAutofill:"yes" ,inputMode:"tel",dataDetectorTypes:"phoneNumber",keyboardType:"phone-pad"}}
    

            
          />
          <TouchableOpacity
            style={[styles.button, disabled ? {} : styles.redColor]}
            //onPress={()=>handleSendOTP(`+${callingCode}${value}`,isUs,navigation)}
            onPress={handleOnPress}
            >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity> 
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7CDB8A',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonText:{
    color: 'white',
    fontSize: 14,
  },
  redColor: {
    backgroundColor: '#F57777'
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