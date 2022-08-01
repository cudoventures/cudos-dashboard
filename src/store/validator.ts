import { createSlice } from '@reduxjs/toolkit'

export enum ModalStatus {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE'
}

export type ModalProps = {
  open: boolean
  validator: {
    name: string
    imageUrl: string
    address: string
  } | null
  status: ModalStatus | null
  amount: string | null
  fee: any
  gasUsed: number
  txHash: string
}

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
  count: number
  sortKey: string
  sortDirection: 'asc' | 'desc'
  votingPowerOverall: number
  items: ValidatorType[]
  modal: ModalProps
}

export type ItemType = Override<ValidatorType, { validator: AvatarName }>

export const initialModalState = {
  open: false,
  validator: null,
  status: null,
  amount: null,
  fee: '',
  gasUsed: 0,
  txHash: ''
}

const initialState: ValidatorsState = {
  loading: true,
  exists: true,
  items: [],
  votingPowerOverall: 0,
  tab: 0,
  count: 0,
  sortKey: 'votingPower',
  sortDirection: 'desc',
  modal: {
    ...initialModalState
  }
}

export const validatorsSlice = createSlice({
  name: 'validators',
  initialState,
  reducers: {
    updateValidators: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateValidators } = validatorsSlice.actions

export default validatorsSlice.reducer
