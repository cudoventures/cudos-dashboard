import { createSlice } from '@reduxjs/toolkit'

export enum ProposalStatus {
  CREATE = 'CREATE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE'
}

export const ProposalTypes = [
  { value: '1', label: 'Text Proposal' },
  { value: '2', label: 'Software update proposal' },
  { value: '3', label: 'Cancel software update proposal' },
  { value: '4', label: 'Parameter change proposal' },
  { value: '5', label: 'Community pool spend proposal' },
  { value: '6', label: 'Update client proposal' },
  { value: '7', label: 'IBC upgrade proposal' }
]

export type ModalProps = {
  open: boolean
  status: ProposalStatus | null
}

export type ProposalsState = {
  modal: ModalProps
}

export const initialModalState = {
  open: false,
  status: null
}

const initialState: ProposalsState = {
  modal: {
    ...initialModalState
  }
}

export const proposalsModalSlice = createSlice({
  name: 'proposalsModal',
  initialState,
  reducers: {
    updateProposalsModal: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateProposalsModal } = proposalsModalSlice.actions

export default proposalsModalSlice.reducer
