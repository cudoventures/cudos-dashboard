import { createSlice } from '@reduxjs/toolkit'

export type ProposalsState = {
  loading: boolean
  exists: boolean
  hasNextPage: boolean
  isNextPageLoading: boolean
  rawDataTotal: number
  searchField: string
  items: ProposalType[]
  searchItems: ProposalType[]
  searchResultsTotal: number
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

export const initialState: ProposalsState = {
  loading: false,
  exists: false,
  hasNextPage: false,
  isNextPageLoading: false,
  rawDataTotal: 0,
  searchField: '',
  items: [],
  searchItems: [],
  searchResultsTotal: 0
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
