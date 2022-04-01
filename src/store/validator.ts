import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ValidatorState {
  operatorAddress: string
  selfDelegateAddress: string
  status: string
  commission: number
  lastSeen: number
  votingPower: number
}

const initialState: ValidatorState[] = [
  {
    operatorAddress: '',
    selfDelegateAddress: '',
    status: '',
    commission: 0,
    lastSeen: 0,
    votingPower: 0
  }
]

export const validatorsSlice = createSlice({
  name: 'validators',
  initialState,
  reducers: {
    updateValidators: (state, action: PayloadAction<ValidatorState[]>) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateValidators } = validatorsSlice.actions

export default validatorsSlice.reducer
