import { CosmosClient } from "@azure/cosmos";
import { useCallback } from "react";

export function useHandlers(cosmosClient:CosmosClient){
    const handleAdd=useCallback(()=>
  {
      cosmosClient
      // .database(process.env.REACT_APP_COSMOS_DATABASE!)
      // .container(process.env.REACT_APP_COSMOS_CONTAINER!)
      .database('FistBump')
      .container('Items')
      .items.create(
      {
        "id": "mine99759@mine00.com",
        "VoteFor": 1,
        "CountVisitStats": null,
      }
  ).then((response) => {
    console.log('Kureeec')
    console.log(response)
}).catch((error: any)=>{
  console.log('Insied error')
  console.log(error)
})
      
    
  console.log('problem sled')
  },[cosmosClient])
  
  return {
    handleAdd
  }
}