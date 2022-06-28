import { createSlice } from '@reduxjs/toolkit'

export type ProposalDetailsState = {
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

const initialState: ProposalDetailsState = {
  id: 0,
  title: '',
  description: '',
  status: '',
  proposalType: '',
  proposerAddress: '',
  submitTime: '',
  votingEndTime: '',
  votingStartTime: ''
}

export const proposalDetailsSlice = createSlice({
  name: 'proposalDetails',
  initialState,
  reducers: {
    updateProposalDetails: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateProposalDetails } = proposalDetailsSlice.actions

export default proposalDetailsSlice.reducer
