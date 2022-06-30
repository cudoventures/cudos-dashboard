import { createSlice } from '@reduxjs/toolkit'

export type ProposalDetailsState = {
  id: number
  votes: VotesType
  bonded: TokenUnit
  overview: VoteDetails
}

export type VotesType = {
  yes: TokenUnit
  no: TokenUnit
  abstain: TokenUnit
  veto: TokenUnit
}
export type VotesGraphState = {
  votes: VotesType
  bonded: TokenUnit
}

export type VoteDetails = {
  proposer: string
  content: {
    ['@type']: string
    title: string
    description: string
  }
  title: string
  id: number
  description: string
  status: string
  submitTime: string
  depositEndTime: string
  votingStartTime: string
  votingEndTime: string
}

export const initialState: ProposalDetailsState = {
  id: 0,
  overview: {
    proposer: '',
    content: {
      '@type': '',
      title: '',
      description: ''
    },
    title: '',
    id: 0,
    description: '',
    status: '',
    submitTime: '',
    depositEndTime: '',
    votingStartTime: '',
    votingEndTime: ''
  },
  votes: {
    yes: {
      displayDenom: '',
      baseDenom: '',
      exponent: 0,
      value: ''
    },
    no: {
      displayDenom: '',
      baseDenom: '',
      exponent: 0,
      value: ''
    },
    abstain: {
      displayDenom: '',
      baseDenom: '',
      exponent: 0,
      value: ''
    },
    veto: {
      displayDenom: '',
      baseDenom: '',
      exponent: 0,
      value: ''
    }
  },
  bonded: {
    value: '',
    displayDenom: '',
    baseDenom: '',
    exponent: 0
  }
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
