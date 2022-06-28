import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'

export interface WalletState {
  address: string
  keplrName: string
  lastLoggedAddress: string
  balance: BigNumber
  availableRewards: BigNumber
  stakedValidators: string[]
  stakedBalance: BigNumber
}

const initialState: WalletState = {
  address: '',
  keplrName: '',
  lastLoggedAddress: '',
  balance: new BigNumber(0),
  availableRewards: new BigNumber(0),
  stakedValidators: [],
  stakedBalance: new BigNumber(0)
}

export enum TransactionCurrency {
  USD = 'usd'
}

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateUser } = walletSlice.actions

export default walletSlice.reducer
