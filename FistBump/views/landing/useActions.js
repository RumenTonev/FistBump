
import { useDispatch, useSelector } from "react-redux";
import { setPaymentCount, setVote } from "../../store/userSlice";
import { useDbHandlers } from "../../utils/useDbHandlers";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";


// "account_id": "72e47e47-95b9-41c2-bdcd-55dd9bb04e14",
// "message_id": "e4fb1353-8ded-4ec7-991e-a757ea213106",
// "phone": "18509042059",
// "code": "2291",
// "create_date": "2022-03-04 12:50:57",
// "expire_date": "2022-03-04 14:50:57"

export function useActions() {
  const{handleGet,handleUpsert}=useDbHandlers()
  const navigation=useNavigation()
  const user = useSelector((state) => state.user.user);
  const {CountVisitStats,VoteFor}=user
  const dispatch = useDispatch();

  const handleStatsFlow = useCallback( () => {
    
    if(CountVisitStats&&+CountVisitStats>0)
    {
        navigation.navigate('Stats')
        dispatch(setPaymentCount(+CountVisitStats-1))
    }
    else{
        navigation.navigate('PaywallScreen')
    }

    
  }, [CountVisitStats])




  const handleVoteFlow = useCallback(async (name) => {
    
    if(!VoteFor)
    dispatch(setVote(name))
  
  }, [VoteFor])


  return {
    handleStatsFlow,
    handleVoteFlow
  }
}