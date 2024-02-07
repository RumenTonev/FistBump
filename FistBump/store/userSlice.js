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
  } },
  reducers: {
    setUser: (state, action) => {
      debugger
      state.user = action.payload;
    },
    setLoggedIn:(state,action)=>{
      debugger
state.user.id=action.payload.phone
state.user.isUs=action.payload.isUs
    },
    setVote: (state,action)=>{
      state.user.VoteFor=action.payload
    },
    setPaymentCount:(state,action)=>{
      debugger
      state.user.CountVisitStats=action.payload
    },
    setConfirmedLogin:(state)=>{
      
      state.user.confirmedLogin=true
    }
    // Other reducers go here
  },
});

export const { setUser,setLoggedIn,setVote,setPaymentCount,setConfirmedLogin } = userSlice.actions;

export default userSlice.reducer;