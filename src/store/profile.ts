import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'

export enum TooltipMessages {
  DELEGATIONS = `Your delegations from the selected validator`,
  REDELEGATIONS = `Your redelegations from the selected validator`,
  UNDELEGATIONS = `Your undelegations from the selected validator`,
  REWARDS = `Your accumulated rewards from the selected validator`
}

export interface WalletState {
  address: string
  accountName: string
  connectedLedger: string
  lastLoggedAddress: string
  balance: BigNumber
  availableRewards: BigNumber
  stakedValidators: { address: string; amount: string }[]
  stakedBalance: BigNumber
  unbondingBalance: BigNumber
  delegations: { address: string; amount: string }[]
  redelegations: {
    sourceAddress: string
    destinationAddress: string
    amount: string
  }[]
  undelegations: {
    validatorAddress: string
    amount: string[]
    completionTime: string[]
  }[]
}

const initialState: WalletState = {
  address: '',
  accountName: '',
  connectedLedger: '',
  lastLoggedAddress: '',
  balance: new BigNumber(0),
  availableRewards: new BigNumber(0),
  stakedValidators: [],
  stakedBalance: new BigNumber(0),
  unbondingBalance: new BigNumber(0),
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
