import { CosmosClient } from "@azure/cosmos"
import Config from 'react-native-config'

export const getCosmosClient=()=>{
const endpoint = Config.REACT_APP_COSMOS_ENDPOINT?Config.REACT_APP_COSMOS_ENDPOINT:''
const authResourceToken = Config.REACT_APP_COSMOS_AUTHTOKEN?Config.REACT_APP_COSMOS_AUTHTOKEN:''
const querySpec = {
    query: 'SELECT * from c',
};
return new CosmosClient({endpoint, key:authResourceToken})


}