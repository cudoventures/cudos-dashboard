import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ValidatorType = {
  validator: string
  votingPower: number
  votingPowerPercent: number
  commission: number
  selfPercent: number
  condition: number
  status: number
  jailed: boolean
  tombstoned: boolean
  delegators: number
  topVotingPower?: boolean // top 34% VP
  avatarUrl: string
  moniker: string
}

export type ValidatorsState = {
  loading: boolean
  exists: boolean
  tab: number
  sortKey: string
  sortDirection: 'asc' | 'desc'
  votingPowerOverall: number
  items: ValidatorType[]
}

export type ItemType = Override<ValidatorType, { validator: AvatarName }>

const initialState: ValidatorsState = {
  loading: true,
  exists: true,
  items: [],
  votingPowerOverall: 0,
  tab: 0,
  sortKey: 'votingPower',
  sortDirection: 'desc'
}

export const validatorsSlice = createSlice({
  name: 'validators',
  initialState,
  reducers: {
    updateValidators: (state, action: PayloadAction<ValidatorsState>) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateValidators } = validatorsSlice.actions

export default validatorsSlice.reducer
