import { configureStore } from '@reduxjs/toolkit'
import marketReducer from './market'
import profileReducer from './profile'
import validatorReducer from './validator'
import settingsReducer from './settings'

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    market: marketReducer,
    validator: validatorReducer,
    settings: settingsReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
