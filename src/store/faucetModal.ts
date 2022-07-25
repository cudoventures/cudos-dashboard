import { createSlice } from '@reduxjs/toolkit'

export enum FaucetStatus {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE'
}

export type ModalProps = {
  open: boolean
  status: FaucetStatus | null
  error?: string
}

export type FaucetState = {
  modal: ModalProps
}

export const initialModalState = {
  open: false,
  status: null,
  error: ''
}

const initialState: FaucetState = {
  modal: {
    ...initialModalState
  }
}

export const faucetModalSlice = createSlice({
  name: 'faucetModal',
  initialState,
  reducers: {
    updateFaucetModal: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateFaucetModal } = faucetModalSlice.actions

export default faucetModalSlice.reducer
