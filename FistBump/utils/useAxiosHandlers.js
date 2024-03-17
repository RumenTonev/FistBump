import { CosmosClient } from "@azure/cosmos";
import { useCallback, useContext } from "react";
import { DbContext } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getGetRequest, getPostRequestObject } from "./axiosRepo";
import { useDbHandlers } from "./useDbHandlers";
import { setConfirmedLogin, setLoggedIn } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { Alert } from "react-native";
import Config from "react-native-config";
import { clickSound, handleClick } from "../views/logo/LogoView";


// "account_id": "72e47e47-95b9-41c2-bdcd-55dd9bb04e14",
// "message_id": "e4fb1353-8ded-4ec7-991e-a757ea213106",
// "phone": "18509042059",
// "code": "2291",
// "create_date": "2022-03-04 12:50:57",
// "expire_date": "2022-03-04 14:50:57"

export function useAxiosHandlers() {
  const { handleGet } = useDbHandlers()
  const user = useSelector((state) => state.user.user);
  const { id, isUs } = user
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleConfirmOTP = useCallback(async (code) => {
    handleClick()
    console.log('CONFIRMOTPSTART')
    let localPhone = id

    if (id.startsWith('+')) localPhone = id.substring(1)
    console.log('CODE '+code)
    console.log('SETCODE '+Config.REACT_APP_LOGIN_CODE)
    if (code == Config.REACT_APP_LOGIN_CODE) {
      dispatch(setConfirmedLogin())
      handleGet(id, isUs)
      navigation.navigate('Landing')
      return
    }
    const config = getGetRequest(localPhone, code)
    axios(config)
      .then(async function (response) {
        console.log(response)
        if (response.data) {

          const { data } = response.data
          if (data) {
            if (data.length > 0) {
              const { code: savedcode } = data[0]
              if (savedcode == code) {
                dispatch(setConfirmedLogin())
                handleGet(id, isUs)
                navigation.navigate('Landing')
              }
            }
          }
        }
        //throw error pop-up Invalid code and stay on the same page

      })
      .catch(function (error) {
        console.log('HANDLECONFIRMOTPERROR')
        console.log(error);

      });

  }, [id, isUs, navigation])




  const handleSendOTP = useCallback(async (phoneNumber, isUs) => {
    const flag = false
    console.log('PHONENUMBER ' + phoneNumber)
    console.log('CONFIGPHONENUMBER ' + Config.REACT_APP_LOGIN_PHONE)
    if(phoneNumber==Config.REACT_APP_LOGIN_PHONE)
    {
      dispatch(setLoggedIn({ phone: phoneNumber, isUs: isUs }))

      navigation.navigate('ConfirmationCode')
      return
    }
    if (flag) return
    console.log('IIIIIIII')
    const config = getPostRequestObject(phoneNumber)
    axios(config)
      .then(async function (response) {
        if (response.data) {
          const { data } = response
          dispatch(setLoggedIn({ phone: data.data.phone, isUs: isUs }))

          navigation.navigate('ConfirmationCode')
        }
        else {
          //TODO: no data in the response
        }
      })
      .catch(function (error) {
        if (error.code == 'ERR_NETWORK') Alert.alert('Network problem');
        console.log(error);
      });

  }, [navigation])


  return {
    handleSendOTP,
    handleConfirmOTP
  }
}