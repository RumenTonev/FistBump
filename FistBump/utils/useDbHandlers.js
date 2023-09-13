import { CosmosClient } from "@azure/cosmos";
import { useCallback, useContext } from "react";
import { DbContext } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useDbHandlers(){
  const cosmosClient= useContext(DbContext);
  const handleGet=useCallback(async (emailId)=>
  {
      await cosmosClient
      // .database(process.env.REACT_APP_COSMOS_DATABASE!)
      // .container(process.env.REACT_APP_COSMOS_CONTAINER!)
      .database('FistBump')
      .container('Items')
      .item(emailId,emailId).read()
      .then(async (response) => {
        
    console.log('Kureeec')
    if(response.statusCode===404)
    {
      console.log('NOT FOUND')
      const newEntry={
        "id": emailId,
        "VoteFor": null,
        "CountVisitStats": null,
        "State":null
      }
      handleUpsert(newEntry)
      await AsyncStorage.setItem('user',JSON.stringify(newEntry))
    }
    else{

      
  const { resource: readDoc } = response;

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
      // .database(process.env.REACT_APP_COSMOS_DATABASE!)
      // .container(process.env.REACT_APP_COSMOS_CONTAINER!)
      .database('FistBump')
      .container('Items')
      .items.upsert(newEntry).then((response) => {
    console.log('Kureeec')
    const { resource: readDoc } = response;
    debugger
}).catch((error)=>{
  console.log('Insied error')
  console.log(error)
})
      
    
  console.log('problem sled')
  },[cosmosClient])

  const getCounts=useCallback(()=>
  {
      cosmosClient
      // .database(process.env.REACT_APP_COSMOS_DATABASE!)
      // .container(process.env.REACT_APP_COSMOS_CONTAINER!)
      .database('FistBump')
      .container('Items')
      .items.query(
      ''
  )
      
    
  console.log('problem sled')
  },[cosmosClient])
  
    const handleAdd=useCallback(()=>
  {
      cosmosClient
      // .database(process.env.REACT_APP_COSMOS_DATABASE!)
      // .container(process.env.REACT_APP_COSMOS_CONTAINER!)
      .database('FistBump')
      .container('Items')
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