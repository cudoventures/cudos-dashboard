import { createSlice } from '@reduxjs/toolkit'

export enum ProposalStatus {
  CREATE = 'CREATE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE'
}

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

export const proposalsSlice = createSlice({
  name: 'proposals',
  initialState,
  reducers: {
    updateProposals: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateProposals } = proposalsSlice.actions

export default proposalsSlice.reducer
