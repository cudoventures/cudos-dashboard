import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserTransactionState {
  offsetCount: number
  data: Transactions[]
}

const initialState: UserTransactionState = {
  offsetCount: 0,
  data: []
}

export const columnNames = [
  { key: 'index', label: '#', width: 70, colSpan: 1 },
  { key: 'txHash', label: 'Transaction Hash', colSpan: 1 },
  { key: 'action', label: 'Action', colSpan: 1 },
  { key: 'date', label: 'Date', colSpan: 1 }
]

export const userSlice = createSlice({
  name: 'userTransactions',
  initialState,
  reducers: {
    updateUserTransactions: (
      state,
      action: PayloadAction<UserTransactionState>
    ) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateUserTransactions } = userSlice.actions

export default userSlice.reducer