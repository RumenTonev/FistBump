import Config from 'react-native-config'
  
  export function getGetRequest(phone,code){

      
      
      var config = {
        method: 'get',
        url: `https://api.dexatel.com/v1/verifications?phone=${phone}&code=${code}`,
        headers: { 
          'X-Dexatel-Key': Config.REACT_APP_DEXATEL_KEY, 
          'Content-Type': 'application/json'
        },

      };

      return config
  }
  
  export function getPostRequestObject(phone){
    
    var data = JSON.stringify({
      "data":{
        
      "sender": "RumenTonev",
      "phone": `${phone}`,
      "template": "3c692bf0-017b-47d8-b1ac-2b084451bf39",
      "code_length": "4"
        
      }});

      
      
      var config = {
        method: 'post',
        url: 'https://api.dexatel.com/v1/verifications',
        headers: { 
          'X-Dexatel-Key': Config.REACT_APP_DEXATEL_KEY, 
          'Content-Type': 'application/json'
        },
        data : data
      };

      return config
  }
  