import { configureStore } from "@reduxjs/toolkit";
import livestreamSlice from "./features/livestreamSlice";
import counterSlice from "./features/counterSlice";
import selectedProductSlice from "./features/selectedProductSlice";
import openModalSlice from "./features/openModalSlice";
import {combineReducers} from "redux";
//import storage from "redux-persist/lib/storage";
import {
    persistReducer, persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,    
} from "redux-persist"

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
    key: 'selectedProduct',
    storage,
    whitelist: ['selectedProduct']
    
}
const reducer = combineReducers({
    selectedProduct: selectedProductSlice,
    livestream: livestreamSlice,
    counter: counterSlice,
    openModal: openModalSlice
    
})
const persist = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persist,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export const persistor = persistStore(store);

export default store;