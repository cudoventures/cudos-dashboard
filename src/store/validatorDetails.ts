import { createSlice } from '@reduxjs/toolkit'

export enum TooltipValidatorMessages {
  AVAILABLE = `The amount of the current validator's available tokens`,
  DELEGATE = `The amount of the current validator's personal delegations`,
  UNBONDING = `The amount of the current validator's personal unbondings`,
  REWARD = `The amount of the current validator's personal rewards`,
  COMMISSION = `The amount of the current validator's personal commissions`,
  VOTING_POWER = `By delegating to a validator, a user delegates voting power. The more voting power a validator has, the more weight they have in the consensus and governance processes.`
}

export type ValidatorState = {
  validator: string
  operatorAddress: string
  selfDelegateAddress: string
  description: string
  website: string
  avatarUrl: string
  moniker: string
}

export const initialState: ValidatorState = {
  validator: '',
  operatorAddress: '',
  selfDelegateAddress: '',
  description: '',
  website: '',
  avatarUrl: '',
  moniker: ''
}

export const validatorDetailsSlice = createSlice({
  name: 'validatorDetails',
  initialState,
  reducers: {
    updateValidatorDetails: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateValidatorDetails } = validatorDetailsSlice.actions

export default validatorDetailsSlice.reducer
