import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'

export interface WalletState {
  address: string
  keplrName: string
  lastLoggedAddress: string
  balance: BigNumber
  availableRewards: BigNumber
  stakedValidators: { address: string; amount: string }[]
  stakedBalance: BigNumber
  delegations: { address: string; amount: string }[]
  redelegations: {
    sourceAddress: string
    destinationAddress: string
    amount: string
  }[]
  undelegations: { validatorAddress: string; amount: string }[]
}

const initialState: WalletState = {
  address: '',
  keplrName: '',
  lastLoggedAddress: '',
  balance: new BigNumber(0),
  availableRewards: new BigNumber(0),
  stakedValidators: [],
  stakedBalance: new BigNumber(0),
  delegations: [],
  redelegations: [],
  undelegations: []
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
