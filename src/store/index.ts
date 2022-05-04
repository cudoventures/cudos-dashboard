import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import marketReducer from './market'
import profileReducer from './profile'
import validatorReducer from './validator'
import settingsReducer from './settings'
import networkReducer from './network'
import userTransactionsReducer from './userTransactions'

const rootReducer = combineReducers({
  profile: profileReducer,
  market: marketReducer,
  validator: validatorReducer,
  settings: settingsReducer,
  network: networkReducer,
  userTransactions: userTransactionsReducer
})

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
