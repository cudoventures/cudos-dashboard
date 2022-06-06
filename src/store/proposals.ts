import { createSlice } from '@reduxjs/toolkit'

export type ProposalsState = {
  loading: boolean
  exists: boolean
  hasNextPage: boolean
  isNextPageLoading: boolean
  rawDataTotal: number
  items: ProposalType[]
}

export type ProposalType = {
  id: number
  title: string
  description: string
  status: string
  proposalType: string
  proposerAddress: string
  submitTime: string
  votingEndTime: string
  votingStartTime: string
}

const initialState: ProposalsState = {
  loading: false,
  exists: false,
  hasNextPage: false,
  isNextPageLoading: false,
  rawDataTotal: 0,
  items: []
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
