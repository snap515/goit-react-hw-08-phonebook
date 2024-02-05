import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/contactsSlice';
import { filterReducer } from './filter/filterSlice';
import { authReducer } from './auth/authSlice';
import storage from 'redux-persist/lib/storage';

import {
  persistStore,
  // persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';

// const contactsConfig = {
//   key: 'contacts',
//   storage,
//   whitelist: ['contacts'],
// };

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    // contacts: persistReducer(contactsConfig, contactsReducer),
    contacts: contactsReducer,
    filter: filterReducer,
    auth: persistReducer(authConfig, authReducer),
  },

  middleware: getDefaultMiddleWare =>
    getDefaultMiddleWare({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
