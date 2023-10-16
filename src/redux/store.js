import { phoneBookReducer } from "./phoneBookReducer";

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const rootReducer = combineReducers({
  phoneBook: phoneBookReducer,
});

const phonebookPersistConfig = {
  key: 'phonebook',
  storage,
  whitelist: ['contacts', 'filter'] //   в локал стораж пойдет только то, что указано
  // blacklist: ['filter'], в локал стораж пойдет все что не фильтр
}

const store = configureStore({
  reducer: {
    phoneBook: persistReducer(phonebookPersistConfig, phoneBookReducer)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;