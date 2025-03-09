
import { useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
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


