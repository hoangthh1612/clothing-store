import checkoutSlice from "./features/checkoutSlice";
import isAddToCartSlice from "./features/isAddToCartSlice";
import {combineReducers} from "redux";
import {
    persistReducer, persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,    
} from "redux-persist"
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk"
import {
  configureStore,
} from '@reduxjs/toolkit'


// Augment middleware to consider Immutable.JS iterables serializable
// const isSerializable = (value) => Iterable.isIterable(value) || isPlain(value)

// const getEntries = (value) =>
//   Iterable.isIterable(value) ? value.entries() : Object.entries(value)

// const serializableMiddleware = createSerializableStateInvariantMiddleware({
//   isSerializable,
//   getEntries,
// })

const persistConfig = {
    key: 'checkout',
    storage,
    whitelist: ['checkout']
    
}
const reducer = combineReducers({
    checkout: checkoutSlice,
    isAddToCart: isAddToCartSlice
    
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


