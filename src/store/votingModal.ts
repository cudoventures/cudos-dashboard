import { createSlice } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'

export enum VotingStatus {
  VOTE = 'VOTE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE'
}

export const VotingTypes = [
  { value: '1', label: 'Yes' },
  { value: '2', label: 'Abstain' },
  { value: '3', label: 'No' },
  { value: '4', label: 'No with Veto' }
]

export type ModalProps = {
  open: boolean
  status: VotingStatus | null
  id?: number | null | undefined
  title?: string
  type?: number | null | undefined
  fee: BigNumber
  hash?: string
}

export type VotingState = {
  modal: ModalProps
}

export const initialModalState = {
  open: false,
  status: null,
  id: null,
  title: '',
  type: null,
  fee: new BigNumber(0),
  hash: ''
}

const initialState: VotingState = {
  modal: {
    ...initialModalState
  }
}

export const votingModalSlice = createSlice({
  name: 'votingModal',
  initialState,
  reducers: {
    updateVotingModal: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateVotingModal } = votingModalSlice.actions

export default votingModalSlice.reducer
