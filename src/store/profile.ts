import { createSlice } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import { SUPPORTED_WALLET } from 'cudosjs'
import { CHAIN_DETAILS } from 'utils/constants'

export enum TooltipMessages {
  DELEGATIONS = `Your current delegated tokens to this validator`,
  REDELEGATIONS = `Your pending redelegation from this validator`,
  UNDELEGATIONS = `Your pending undelegation from this validator`,
  REWARDS = `Your accumulated unclaimed rewards from this validator`
}

export interface WalletState {
  address: string
  accountName: string
  connectedLedger: SUPPORTED_WALLET | undefined
  loadingState: boolean
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
  connectedLedger: undefined,
  loadingState: false,
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
