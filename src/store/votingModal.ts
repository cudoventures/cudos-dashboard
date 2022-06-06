import { createSlice } from '@reduxjs/toolkit'

export enum VotingStatus {
  VOTE = 'VOTE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE'
}

export const VotingTypes = [
  { value: '1', label: 'Yes' },
  { value: '2', label: 'Abstain' },
  { value: '3', label: 'No' }
]

export type ModalProps = {
  open: boolean
  status: VotingStatus | null
  id?: number | null
  title?: string
}

export type VotingState = {
  modal: ModalProps
}

export const initialModalState = {
  open: false,
  status: null,
  id: null,
  title: ''
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
