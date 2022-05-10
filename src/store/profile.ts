import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'

export interface WalletState {
  address: string
  balance: BigNumber
  availableRewards: BigNumber
  balance: string
}

const initialState: WalletState = {
  address: '',
  balance: new BigNumber(0),
  availableRewards: new BigNumber(0)
}

export enum TransactionCurrency {
  USD = 'usd'
  balance: ''
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
