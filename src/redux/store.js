import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import rootReducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Hanya mempertahankan state "auth" di localstorage
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: import.meta.env.NODE_ENV === "development",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(thunk),
  });

 export const persistor = persistStore(store);

 