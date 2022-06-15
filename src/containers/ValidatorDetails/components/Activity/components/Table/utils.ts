import { Column } from 'components/Table/types'

export const columns: Column[] = [
  {
    key: 'block',
    label: 'Block Height',
    width: 150
  },
  {
    key: 'txHash',
    label: 'Transaction Hash'
  },
  {
    key: 'action',
    label: 'Action'
  },
  {
    key: 'date',
    label: 'Date',
    width: 250
  }
]

export const txStyling = {
  MsgDelegate: {
    color: '#3d5afe',
    text: 'Delegate'
  },
  MsgSend: {
    color: '#52A6F8',
    text: 'Send'
  },
  MsgSubmitProposal: {
    color: '#ff5722',
    text: 'Submit Proposal'
  },
  MsgMultiSend: {
    color: '#52A6F8',
    text: 'Multi Send'
  },
  MsgVote: {
    color: '#E89518',
    text: 'Vote'
  },
  MsgWithdrawDelegatorReward: {
    color: '#9646F9',
    text: 'Withdraw Reward'
  },
  MsgBeginRedelegate: {
    color: '#E89518',
    text: 'Redelegate'
  },
  MsgUndelegate: {
    color: '#ff1744',
    text: 'Undelegate'
  },
  MsgCreateValidator: {
    color: '#3d5afe',
    text: 'Create Validator'
  },
  MsgEditValidator: {
    color: '#52A6F8',
    text: 'Edit Validator'
  }
}

export const getTxBadge = (msgType: string) => {
  return (
    txStyling[msgType as keyof typeof txStyling] || {
      color: '#52A6F8',
      text: msgType
    }
  )
}
