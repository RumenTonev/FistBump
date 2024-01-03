import { CosmosClient } from "@azure/cosmos";
import { useCallback, useContext } from "react";
import { DbContext } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getGetRequest, getPostRequestObject } from "./axiosRepo";
import { useDbHandlers } from "./useDbHandlers";
import { setConfirmedLogin, setLoggedIn } from "../store/userSlice";
import { useDispatch } from "react-redux";


// "account_id": "72e47e47-95b9-41c2-bdcd-55dd9bb04e14",
// "message_id": "e4fb1353-8ded-4ec7-991e-a757ea213106",
// "phone": "18509042059",
// "code": "2291",
// "create_date": "2022-03-04 12:50:57",
// "expire_date": "2022-03-04 14:50:57"

export function useAxiosHandlers() {
  const{handleGet,handleUpsert}=useDbHandlers()
  //const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleConfirmOTP = useCallback(async (phoneNumber, code,isUs, navigation) => {

    console.log('IIIIIIII')
  let localPhone=phoneNumber
  
  if(phoneNumber.startsWith('+'))localPhone=phoneNumber.substring(1)
debugger
    const config = getGetRequest(localPhone, code)
    axios(config)
      .then(async function (response) {
        if (response.data) {

          const { data } = response.data
          if (data){
            if (data.length > 0) {
              const { code: savedcode } = data[0]
              if (savedcode == code) {
                dispatch(setConfirmedLogin())
                handleGet(phoneNumber,isUs)
                navigation.navigate('Settings')
              }
            }
          }
        }
//throw error pop-up Invalid code and stay on the same page
              
        })
      .catch(function (error) {
        console.log(error);
      });

  }, [])




  const handleSendOTP = useCallback(async (phoneNumber,isUs, navigation) => {
  const flag=false
  debugger
  if(flag) return
    console.log('IIIIIIII')
    const config = getPostRequestObject(phoneNumber)
    axios(config)
      .then(async function (response) {
        if (response.data) {
          const {data}=response
          dispatch(setLoggedIn({ phone: data.data.phone ,isUs:isUs}))
          debugger
          navigation.navigate('ConfirmationCode')
        }
        else {
          //TODO: no data in the response
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }, [])


  return {
    handleSendOTP,
    handleConfirmOTP
  }
}