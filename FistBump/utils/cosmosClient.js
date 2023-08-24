import { CosmosClient } from "@azure/cosmos"

export const getCosmosClient=()=>{

//const CosmosClient = require('@azure/cosmos').CosmosClient

// const endpoint = process.env.REACT_APP_COSOMOS_ENDPOINT!
// const authResourceToken = process.env.REACT_APP_COSMOS_AUTHTOKEN

const endpoint = 'https://mine.documents.azure.com:443/'
const authResourceToken = 'DkhfyXacmT9Ut50VqqATkUgipMTherJVRGZ3GvXxuEVM5GZX0JtYZDKVKvaPo0Tg8eBwXB8k9mk7ACDbr9LviQ=='
console.log(process.env.REACT_APP_COSOMOS_ENDPOINT)
console.log(process.env.REACT_APP_COSMOS_AUTHTOKEN)
//get your auth or resource token securely here from a token broker on the server
const querySpec = {
    query: 'SELECT * from c',
};
return new CosmosClient({endpoint, key:authResourceToken})


}