import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface NetworkState {
  blockHeight: number
  blockTime: number
  price: number | null
  validators: {
    active: number
    total: number
  }
  votingPower: number
  totalVotingPower: number
}

const initialState: NetworkState = {
  blockHeight: 0,
  blockTime: 0,
  price: null,
  validators: {
    active: 0,
    total: 0
  },
  votingPower: 0,
  totalVotingPower: 0
}

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    updateNetwork: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateNetwork } = networkSlice.actions

export default networkSlice.reducer
