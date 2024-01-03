import { CosmosClient } from "@azure/cosmos";
import { useCallback, useContext } from "react";
import { DbContext } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "react-native-config";

export function useDbHandlers(){
  const cosmosClient= useContext(DbContext);
  const resultsContainer=cosmosClient.database('FistBump').container
  const handleGet=useCallback(async (phone,isUs)=>
  {
      await cosmosClient
       .database(Config.REACT_APP_COSMOS_DATABASE)
      .container(Config.REACT_APP_COSMOS_CONTAINER)
      .item(phone,phone).read()
      .then(async (response) => {
        
    console.log('Kureeec')
    debugger
    if(response.statusCode===404)
    {
      console.log('NOT FOUND')
      const newEntry={
        "id": phone,
        "VoteFor": null,
        "CountVisitStats": null,
        "State":null,
        "isUS":isUs
      }
      handleUpsert(newEntry)
      await AsyncStorage.setItem('user',JSON.stringify(newEntry))
    }
    else{

      
  const { resource: readDoc } = response;
  await AsyncStorage.setItem('user',JSON.stringify(readDoc))
  console.log(readDoc)
    }
    console.log(response)
}).catch((error)=>{
  console.log('Insied error')
  console.log(error)
})
      
    
  console.log('problem sled')
  },[cosmosClient])

 const handleUpsert= useCallback((newEntry)=>
  {
      cosmosClient
      .database(Config.REACT_APP_COSMOS_DATABASE)
      .container(Config.REACT_APP_COSMOS_CONTAINER)
      .items.upsert(newEntry).then((response) => {
    console.log('Kureeec')
    const { resource: readDoc } = response;
}).catch((error)=>{
  console.log('Insied error')
  console.log(error)
})
      
    
  console.log('problem sled')
  },[cosmosClient])

  const getCounts=useCallback(()=>
  {
      cosmosClient
      .database(Config.REACT_APP_COSMOS_DATABASE)
     .container(Config.REACT_APP_COSMOS_CONTAINER)
      .items.query(
      ''
  )
      
    
  console.log('problem sled')
  },[cosmosClient])
  
    const handleAdd=useCallback(()=>
  {
      cosmosClient
      .database(Config.REACT_APP_COSMOS_DATABASE)
     .container(Config.REACT_APP_COSMOS_CONTAINER)
      .items.create(
      {
        "id": "mine909759@mine00.com",
        "VoteFor": 1,
        "CountVisitStats": null,
      }
  ).then((response) => {
    console.log('Kureeec')
    console.log(response)
}).catch((error)=>{
  console.log('Insied error')
  console.log(error)
})
      
    
  console.log('problem sled')
  },[cosmosClient])
  
  return {
    handleAdd,
    handleGet,
    handleUpsert
  }
}