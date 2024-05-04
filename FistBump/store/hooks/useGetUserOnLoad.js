
import { useState, useEffect, useContext } from 'react'
import Config from 'react-native-config';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../userSlice';
import { DbContext } from '../../App';



//const baseUrl = `${ServiceConfig.baseAPIUrl}/Users`


export const useGetUserOnLoad = () => {
    const user = useSelector((state) => state.user.user);
    const cosmosClient = useContext(DbContext);
    const dispatch = useDispatch()
    const {id,confirmedLogin,confirmedTerms}=user
  const [status, setStatus] = useState(
    'idle',
  )


  useEffect(() => {
    let mounted = true


    const execute = async () => {
      
      if (id) {
        setStatus('pending')
        try {
          


            await cosmosClient
            .database(Config.REACT_APP_COSMOS_DATABASE?Config.REACT_APP_COSMOS_DATABASE:'')
            .container(Config.REACT_APP_COSMOS_CONTAINER?Config.REACT_APP_COSMOS_CONTAINER:'')
            .item(id,id).read()
            .then(async (response) => {
    
              console.log('Kureeec')
              
              if (response.statusCode === 200) {
    
    
    
                const { resource: readDoc } = response;
                dispatch(setUser({
                  id: readDoc.id,
            VoteFor: readDoc.VoteFor,
            State:readDoc.State,
            isUs:true,
            confirmedLogin:confirmedLogin,
            confirmedTerms:confirmedTerms
                }))
    
              }
              console.log(response)
              setStatus('success')
            }).catch((error) => {
              
              console.log('Insied error')
              console.log(error)
              setStatus('fail')
            })
    
    
          console.log('problem sled')
        
        } catch (error) {
          if (mounted) {
            setStatus('fail')
          }
        } 
      } 
    }
    execute()


    return () => {
      mounted = false
    }
  }, [])


  return status

  
}


