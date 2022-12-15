import { createSlice } from '@reduxjs/toolkit'

export interface UserTransactionState {
  offsetCount: number
  data: Transactions[]
  hasActivity: boolean
  loading: boolean
}

const initialState: UserTransactionState = {
  offsetCount: 0,
  data: [],
  hasActivity: true,
  loading: true
}

export const columnNames = [
  { key: 'block', label: 'Block Height', width: 100, colSpan: 1 },
  { key: 'txHash', label: 'Transaction Hash', colSpan: 1 },
  { key: 'action', label: 'Action', colSpan: 1 },
  { key: 'date', label: 'Date', colSpan: 1 }
]

export const userSlice = createSlice({
  name: 'userTransactions',
  initialState,
  reducers: {
    updateUserTransactions: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateUserTransactions } = userSlice.actions

export default userSlice.reducer
