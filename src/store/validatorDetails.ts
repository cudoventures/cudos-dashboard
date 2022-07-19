import { createSlice } from '@reduxjs/toolkit'
import { ModalProps, initialModalState } from './validator'

export type ValidatorState = {
  validator: string
  operatorAddress: string
  selfDelegateAddress: string
  description: string
  website: string
  avatarUrl: string
  moniker: string
  modals: {
    delegation: ModalProps
    redelegation: ModalProps
    undelegation: ModalProps
  }
}

export const initialState: ValidatorState = {
  validator: '',
  operatorAddress: '',
  selfDelegateAddress: '',
  description: '',
  website: '',
  avatarUrl: '',
  moniker: '',
  modals: {
    delegation: { ...initialModalState },
    redelegation: { ...initialModalState },
    undelegation: { ...initialModalState }
  }
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
