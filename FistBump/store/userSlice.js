import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: { user:{
    id: null,
        VoteFor: null,
        CountVisitStats: null,
        State:null,
        isUs:false,
        confirmedLogin:false
  } ,results:{
    Total: 0,
    TrumpCount: 0,
    BaydenCount: 0,
  }},
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoggedIn:(state,action)=>{
state.user.id=action.payload.phone
state.user.isUs=action.payload.isUs
    },
    setVote: (state,action)=>{
      state.user.VoteFor=action.payload
    },
    setPaymentCount:(state,action)=>{
      state.user.CountVisitStats=action.payload
    },
    setConfirmedLogin:(state)=>{
      
      state.user.confirmedLogin=true
    },
    setResults:(state,action)=>{
      state.results.BaydenCount=action.payload.BaydenCount
      state.results.TrumpCount=action.payload.TrumpCount
      state.results.Total=action.payload.Total
          },
          setBydenVote:(state)=>{
            state.results.BaydenCount=state.results.BaydenCount+1
            state.results.Total=state.results.Total+1
            state.user.VoteFor='Byden'

                },
                setTrumpVote:(state)=>{

            state.results.TrumpCount=state.results.TrumpCount+1
            state.results.Total=state.results.Total+1
            state.user.VoteFor='Trump'
                      },
                      
    // Other reducers go here
  },
});

export const { setUser,setLoggedIn,setVote,setPaymentCount,setConfirmedLogin,setBydenVote,setTrumpVote,setResults } = userSlice.actions;

export default userSlice.reducer;