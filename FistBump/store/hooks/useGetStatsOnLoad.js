
import { useState, useEffect, useContext } from 'react'
import Config from 'react-native-config';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../userSlice';
import { DbContext } from '../../App';
import { useDbHandlers } from '../../utils/useDbHandlers';



//const baseUrl = `${ServiceConfig.baseAPIUrl}/Users`


export const useGetStatsOnLoad = () => {
    const user = useSelector((state) => state.user.user);
    const {CountVisitStats}=user

    
  const{getResults}=useDbHandlers()
  const [status, setStatus] = useState(
    'idle',
  )


  useEffect(() => {
    let mounted = true


    const execute = async () => {
      
      if (CountVisitStats!=null&&CountVisitStats>0) {
        setStatus('pending')
        try {
          

            const result=await getResults()

            
result?setStatus('success'):setStatus('fail')
        
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
  }, [CountVisitStats])


  return status

  
}


