import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: { user:{
    id: null,
        VoteFor: null,
        CountVisitStats: null,
        State:null,
        isUs:false,
        confirmedLogin:false,
        attemptCounts:0,
        confirmedTerms:false
  } ,results:{
    Total: 0,
    TrumpCount: 0,
    BidenCount: 0,
  },
testingMode:false
},
  reducers: {
    setUser: (state, action) => {
      console.log('SEUSER '+action.payload.confirmedLogin)
      state.user = action.payload
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
    setConfirmedTerms:(state)=>{
      
      state.user.confirmedTerms=true
    },
    setAttemptCount:(state)=>{
      
      state.user.attemptCounts=state.user.attemptCounts+1
    },
    setTestingMode:(state)=>{
      
      state.testingMode=true
    },

    setResults:(state,action)=>{
      state.results.BidenCount=action.payload.BidenCount
      state.results.TrumpCount=action.payload.TrumpCount
      state.results.Total=action.payload.Total
          },
          setBidenVote:(state)=>{
            state.results.BidenCount=state.results.BidenCount+1
            state.results.Total=state.results.Total+1
            state.user.VoteFor='Biden'

                },
                setTrumpVote:(state)=>{

            state.results.TrumpCount=state.results.TrumpCount+1
            state.results.Total=state.results.Total+1
            state.user.VoteFor='Trump'
                      },
                      
    // Other reducers go here
  },
});

export const { setUser,setLoggedIn,setVote,setPaymentCount,setConfirmedLogin,setBidenVote,setTrumpVote,setResults,setTestingMode,setConfirmedTerms,setAttemptCount } = userSlice.actions;

export default userSlice.reducer;