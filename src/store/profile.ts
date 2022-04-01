import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface WalletState {
  address: string
  balance: number
}

const initialState: WalletState = {
  address: '',
  balance: 0
}

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<WalletState>) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateUser } = walletSlice.actions

export default walletSlice.reducer
