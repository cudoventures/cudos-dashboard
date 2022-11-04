import { createSlice } from '@reduxjs/toolkit'

export enum TooltipValidatorMessages {
  HOLDINGS = `This validators wallet balance of unstaked tokens`,
  SELF_DELEGATED = `This validators delegation of tokens to their own node`,
  UNBONDING = `Any tokens that are currently unbonding as stake by this validator`,
  REWARDS = `This validators unclaimed personal rewards`,
  COMMISSIONS = `This validators unclaimed personal commissions`,
  VOTING_POWER = `The overall network voting power of this validator and their delegations. The more voting power a validator has, the more weight they have in the consensus and governance processes.`
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
