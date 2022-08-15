import { createSlice } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'

export enum ModalStatus {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  IN_PROGRESS = 'IN_PROGRESS'
}

export type Modal = {
  open: boolean
  status: ModalStatus | null
  failureMessage: {
    title: string
    subtitle: string
  }
}

// ========================
// REWARDS MODAL
// ========================

export type RewardsModalProps = Modal & {
  validator: {
    name: string
    imageUrl: string
    address: string
  } | null
  amount: string | null
  fee: string
  txHash?: string
  gasUsed: number
}

export const initialRewardsModalProps: RewardsModalProps = {
  open: false,
  status: null,
  validator: null,
  amount: null,
  fee: '',
  gasUsed: 0,
  txHash: '',
  failureMessage: {
    title: 'Claiming Rewards Failed',
    subtitle:
      'Seems like something went wrong with executing the transaction. Try again or check your wallet balance.'
  }
}

// ========================
// DELEGATION MODAL
// ========================

export type DelegationModalProps = Modal & {
  validator: {
    name: string
    imageUrl: string
    address: string
  } | null
  amount: string | null
  fee: string
  txHash?: string
  gasUsed: number
}

export const initialDelegationModalState: DelegationModalProps = {
  open: false,
  status: null,
  validator: null,
  amount: null,
  fee: '',
  gasUsed: 0,
  txHash: '',
  failureMessage: {
    title: 'Delegation Failed',
    subtitle:
      'Seems like something went wrong with executing the transaction. Try again or check your wallet balance.'
  }
}

// ========================
// REDELEGATION MODAL
// ========================

export type RedelegationModalProps = DelegationModalProps

export const initialRedelegationModalState: RedelegationModalProps = {
  ...initialDelegationModalState
}

// ========================
// UNDELEGATION MODAL
// ========================

export type UndelegationModalProps = DelegationModalProps

export const initialUndelegationModalState: UndelegationModalProps = {
  ...initialDelegationModalState
}

// ========================
// VOTING MODAL
// ========================

export type VotingModalProps = Modal & {
  id?: number | null | undefined
  title?: string
  type?: number | null | undefined
  fee: BigNumber
  hash?: string
}

export const initialVotingModalState: VotingModalProps = {
  open: false,
  status: null,
  id: null,
  title: '',
  type: null,
  fee: new BigNumber(0),
  hash: '',
  failureMessage: {
    title: 'Voting for Proposal Failed!',
    subtitle: `Seems like something went wrong with voting for the proposal. Try
    again or check your wallet balance.`
  }
}

export const VotingTypes = [
  { value: '1', label: 'Yes' },
  { value: '2', label: 'Abstain' },
  { value: '3', label: 'No' },
  { value: '4', label: 'No with Veto' }
]

// ========================
// PROPOSAL MODAL
// ========================

export type ProposalModalProps = Modal & {
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

export const initialProposalModalState: ProposalModalProps = {
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
  },
  failureMessage: {
    title: 'Creating Proposal Failed!',
    subtitle: `Seems like something went wrong with creating the proposal. Try again
    or check your wallet balance.`
  }
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

// ========================
// DEPOSIT MODAL
// ========================

export type DepositModalProps = Modal & {
  open: boolean
  status: ModalStatus | null
  amount?: string
  id?: number | null | undefined
  title?: string
  fee: BigNumber
  hash?: string
}

export const initialDepositModalState: DepositModalProps = {
  open: false,
  status: null,
  amount: '',
  id: null,
  title: '',
  fee: new BigNumber(0),
  hash: '',
  failureMessage: {
    title: 'Voting for Proposal Failed!',
    subtitle: `Seems like something went wrong with depositing for the proposal. Try again
    or check your wallet balance.`
  }
}

// ========================
// REWARDS MODAL
// ========================

export type FaucetModalProps = Modal & {
  error?: string
}

export const initialFaucetModalProps: FaucetModalProps = {
  open: false,
  status: null,
  failureMessage: {
    title: 'Transaction failed!',
    subtitle:
      'Seems like something went wrong with executing the transaction. Please try again.'
  }
}

export type ModalProps = {
  rewards: RewardsModalProps
  delegation: DelegationModalProps
  redelegation: DelegationModalProps
  undelegation: DelegationModalProps
  proposal: ProposalModalProps
  deposit: DepositModalProps
  voting: VotingModalProps
  faucet: FaucetModalProps
}

export const initialModalState: ModalProps = {
  rewards: initialRewardsModalProps,
  delegation: initialDelegationModalState,
  redelegation: initialRedelegationModalState,
  undelegation: initialUndelegationModalState,
  proposal: initialProposalModalState,
  deposit: initialDepositModalState,
  voting: initialVotingModalState,
  faucet: initialFaucetModalProps
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState: initialModalState,
  reducers: {
    updateModal: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateModal } = modalSlice.actions

export default modalSlice.reducer
