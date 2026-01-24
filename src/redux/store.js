import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./CompanySlice"
import applicationSlice from "./applicationSlice"

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

// persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "job"], // MUST match reducer keys
};

//  root reducer
const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company:companySlice,
  application:applicationSlice
});

//  persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// persistor
export const persistor = persistStore(store);
