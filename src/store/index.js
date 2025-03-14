import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'auth',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    
  },

});

const persistor = persistStore(store);

export { store, persistor };