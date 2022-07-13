import { createSlice } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'

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
  fee: BigNumber
  hash?: string
  proposalData: {
    type?: number
    title: string
    description: string
    note?: string
    depositAmount: number
    plan: string
    height: string
    info: string
    changeSubspace?: string
    changeKey?: string
    changeValue?: string
    poolSpendRecipient?: string
    poolSpendAmount?: string
    subjectClientId?: string
    substituteClientId?: string
    ibcUpgradeFile?: any
    ibcUpgradeFileName?: string
    upgradeName?: string
    upgradeHeight?: string
    upgradeInfo?: string
  }
}

export type ProposalsState = {
  modal: ModalProps
}

export const initialModalState = {
  open: false,
  status: null,
  fee: new BigNumber(0),
  hash: '',
  proposalData: {
    title: '',
    description: '',
    depositAmount: 0,
    plan: '',
    height: '',
    info: '',
    changeSubspace: '',
    changeKey: '',
    changeValue: '',
    poolSpendRecipient: '',
    poolSpendAmount: '',
    subjectClientId: '',
    substituteClientId: '',
    ibcUpgradeFile: '',
    upgradeName: '',
    upgradeHeight: '',
    upgradeInfo: ''
  }
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
