// store.js
import { configureStore} from '@reduxjs/toolkit';
//mport userReducer from './userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import userSlice from './userSlice';

const persistConfig={
  key:'root',
  storage:AsyncStorage
}
const persistedReducer=persistReducer(persistConfig,userSlice)
export const store = configureStore({
  reducer: {
    user: persistedReducer,
    // Other reducers go here
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:{
      ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
    }
  }),
});

export const persistor=persistStore(store)