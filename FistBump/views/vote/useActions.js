
import { useDispatch, useSelector } from "react-redux";
import { setBidenVote, setPaymentCount, setTrumpVote, setVote } from "../../store/userSlice";
import { useDbHandlers } from "../../utils/useDbHandlers";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { clickSound, handleClick } from "../logo/LogoView";


// "account_id": "72e47e47-95b9-41c2-bdcd-55dd9bb04e14",
// "message_id": "e4fb1353-8ded-4ec7-991e-a757ea213106",
// "phone": "18509042059",
// "code": "2291",
// "create_date": "2022-03-04 12:50:57",
// "expire_date": "2022-03-04 14:50:57"

export function useActions() {
  const { updateResults, patchUser } = useDbHandlers()
  const navigation = useNavigation()
  const user = useSelector((state) => state.user.user);
  const { CountVisitStats, VoteFor } = user
  const dispatch = useDispatch();

  const handleStatsFlow = useCallback(() => {
    handleClick()
    if (CountVisitStats && +CountVisitStats > 0) {

      dispatch(setPaymentCount(+CountVisitStats - 1))
     // patchUser('/CountVisitStats', +CountVisitStats - 1)
      navigation.navigate('Stats')
    }
    else {
      navigation.navigate('PaywallScreen')
    }


  }, [CountVisitStats])




  const handleVoteFlow = useCallback(async (name) => {

    //if(!VoteFor){
    //dispatch(setVote(name))
    try {
      await updateResults(name == 'Biden')
      //await patchUser('/VoteFor', name)

      if(name == 'Biden'){
        dispatch(setBidenVote())

      }
      else{
        dispatch(setTrumpVote())
      }
      
    }
    catch (e) {
console.log(e)
    }
    //}

  }, [VoteFor])


  return {
    handleStatsFlow,
    handleVoteFlow
  }
}