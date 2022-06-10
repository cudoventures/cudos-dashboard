import { createSlice } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'

export enum DepositStatus {
  DEPOSIT = 'DEPOSIT',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE'
}

export type ModalProps = {
  open: boolean
  status: DepositStatus | null
  amount?: string
  id?: number | null | undefined
  title?: string
  fee: BigNumber
  hash?: string
}

export type DepositState = {
  modal: ModalProps
}

export const initialModalState = {
  open: false,
  status: null,
  amount: '',
  id: null,
  title: '',
  fee: new BigNumber(0),
  hash: ''
}

const initialState: DepositState = {
  modal: {
    ...initialModalState
  }
}

export const depositModalSlice = createSlice({
  name: 'depositModal',
  initialState,
  reducers: {
    updateDepositModal: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateDepositModal } = depositModalSlice.actions

export default depositModalSlice.reducer
