import { useCallback, useContext } from "react";
import { DbContext } from "../App";
import Config from "react-native-config";
import { useDispatch, useSelector } from "react-redux";
import { setResults, setUser } from "../store/userSlice";
import { PatchOperation } from "@azure/cosmos";

export function useDbHandlers() {
  const cosmosClient = useContext(DbContext);
  const dispatch = useDispatch()
  const resultsContainer = cosmosClient.database('FistBump').container
  const user = useSelector((state) => state.user.user);
  const { id } = user
  const handleInitialGet = useCallback(async () => {
    if (id) {
      await cosmosClient
        .database(Config.REACT_APP_COSMOS_DATABASE)
        .container(Config.REACT_APP_COSMOS_CONTAINER)
        .item(phone, phone).read()
        .then(async (response) => {
          console.log('INITIALGET')
          if (response.statusCode === 200) {

            const { resource: readDoc } = response;

            dispatch(setUser({
              id: readDoc.id,
              VoteFor: readDoc.VoteFor,
              CountVisitStats: readDoc.CountVisitStats,
              State: readDoc.State,
              isUs: readDoc.isUs,
              confirmedLogin: true
            }))

          }
          console.log(response)
        }).catch((error) => {
          console.log('INITIALGETERROR')
          console.log(error)
        })

    }
  }, [cosmosClient, id])



  const handleGet = useCallback(async (phone, isUs) => {
    await cosmosClient
      .database(Config.REACT_APP_COSMOS_DATABASE)
      .container(Config.REACT_APP_COSMOS_CONTAINER)
      .item(phone, phone).read()
      .then(async (response) => {

        console.log('HANDLEGET')

        if (response.statusCode === 404) {
          console.log('NOT FOUND')
          console.log('BEHING'+isUs)
          const newEntry = {
            "id": phone,
            "VoteFor": null,
            "CountVisitStats": 5,
            "State": null,
            "isUs": isUs
          }
          handleUpsert(newEntry)
          dispatch(setUser(newEntry))
        }
        else {


          const { resource: readDoc } = response;
          dispatch(setUser({
            id: readDoc.id,
            VoteFor: readDoc.VoteFor,
            CountVisitStats: readDoc.CountVisitStats,
            State: readDoc.State,
            isUs: readDoc.isUs,
            confirmedLogin: true
          }))

        }
        console.log(response)
      }).catch((error) => {
        console.log('HANDLEGETERROR')
        console.log(error)
      })

  }, [cosmosClient])

  const handleUpsert = useCallback((newEntry) => {
    cosmosClient
      .database(Config.REACT_APP_COSMOS_DATABASE)
      .container(Config.REACT_APP_COSMOS_CONTAINER)
      .items.upsert(newEntry).then((response) => {
        console.log('HANDLEUPSERT')
        console.log(response)
        const { resource: readDoc } = response;
      }).catch((error) => {
        console.log('UPSERTERROR')
        console.log(error)
      })


  }, [cosmosClient])


  const handleAdd = useCallback(() => {
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
      }).catch((error) => {
        console.log('Insied error')
        console.log(error)
      })


    console.log('problem sled')
  }, [cosmosClient])

  const getResults = useCallback(async () => {

    await cosmosClient
      .database(Config.REACT_APP_COSMOS_DATABASE)
      .container(Config.REACT_APP_COSMOS_RESULTS_CONTAINER)
      .item('1', '1').read()
      .then(async (response) => {
        if (response.statusCode === 200) {



          const { resource: readDoc } = response;
          //setResultsObject
          dispatch(setResults({

            BaydenCount: readDoc.BaydenCount,
            TrumpCount: readDoc.TrumpCount,
            Total: readDoc.Total,
          }))

        }
        console.log('GETRESULTS ' + response)
        return true
      }).catch((error) => {
        console.log('GETRESULTSERROR')
        console.log(error)
        return false
      })


    console.log('AFTER GETRESULTS')


  }, [cosmosClient])

  const updateResults = useCallback(async (isBiden) => {
    const operations = [

      { op: "incr", path: isBiden ? '/BaydenCount' : '/TrumpCount', value: 1 },
      { op: "incr", path: '/Total', value: 1 },

    ]

    await cosmosClient
      .database(Config.REACT_APP_COSMOS_DATABASE)
      .container(Config.REACT_APP_COSMOS_RESULTS_CONTAINER)
      .item('1', '1').patch(operations)
      .then(async (response) => {
        if (response.statusCode === 200) {



          const { resource: readDoc } = response;
          //setResultsObject
          dispatch(setResults({

            BaydenCount: readDoc.BaydenCount,
            TrumpCount: readDoc.TrumpCount,
            Total: readDoc.Total,
          }))

        }
        console.log('UPDATERESULTS ' + response)
      }).catch((error) => {
        console.log('UPDATERESULTS ERROR')
        console.log(error)
      })



  }, [cosmosClient])

  const patchUser = useCallback(async (path,value) => {
    const operations = [

      { op: "set", path: path, value: value },
    

    ]

    await cosmosClient
      .database(Config.REACT_APP_COSMOS_DATABASE)
      .container(Config.REACT_APP_COSMOS_CONTAINER)
      .item(id, id).patch(operations)
      .then(async (response) => {
        if (response.statusCode === 200) {



          const { resource: readDoc } = response;
      
        console.log(readDoc)

            

        }
        console.log('UPDATEUSERVote ' + response)
      }).catch((error) => {
        console.log('UPDATEUSERVOTE ERROR')
        console.log(error)
      })



  }, [cosmosClient])








  return {
    handleAdd,
    handleGet,
    handleUpsert,
    handleInitialGet,
    getResults,
    updateResults,
    patchUser
  }
}