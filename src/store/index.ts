import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import marketReducer from './market'
import profileReducer from './profile'
import validatorReducer from './validator'
import settingsReducer from './settings'
import networkReducer from './network'
import proposalsModalReducer from './proposalsModal'
import proposalsReducer from './proposals'
import userTransactionsReducer from './userTransactions'
import votingModalReducer from './votingModal'
import depositModalReducer from './depositModal'
import validatorDetailsReducer from './validatorDetails'
import notificationsReducer from './notifications'

const rootReducer = combineReducers({
  profile: profileReducer,
  market: marketReducer,
  validator: validatorReducer,
  settings: settingsReducer,
  network: networkReducer,
  userTransactions: userTransactionsReducer,
  proposalsModal: proposalsModalReducer,
  votingModal: votingModalReducer,
  depositModal: depositModalReducer,
  proposals: proposalsReducer,
  validatorDetails: validatorDetailsReducer,
  notifications: notificationsReducer
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['proposals', 'votingModal', 'proposalModal', 'validator', 'validatorDetails']
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
