import { createSlice } from '@reduxjs/toolkit'

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
