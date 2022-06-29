const colors = {
  staking: '#3d5afe',
  bank: '#52A6F8',
  governance: '#E89518',
  distribution: '#9646F9',
  crisis: '',
  ibc: '',
  ibcTransfer: '',
  slashing: '',
  authz: '',
  feegrant: '',
  vesting: ''
}

// =====================================
// DO NOT UPDATE IF THIS IS A FORK.
// ONLY COSMOS SDK DEFAULT MESSAGES HERE.
// Please use `customTypeToModel` below for custom message types
// =====================================
export const defaultMessages = {
  // ========================
  // staking
  // ========================
  '/cosmos.staking.v1beta1.MsgDelegate': {
    typeUrl: 'cosmos.staking.v1beta1.MsgDelegate',
    color: colors.staking,
    displayName: 'Delegate'
  },
  '/cosmos.staking.v1beta1.MsgBeginRedelegate': {
    typeUrl: 'cosmos.staking.v1beta1.MsgBeginRedelegate',
    color: colors.staking,
    displayName: 'Redelegate'
  },
  '/cosmos.staking.v1beta1.MsgUndelegate': {
    typeUrl: 'cosmos.staking.v1beta1.MsgUndelegate',
    color: colors.staking,
    displayName: 'Undelegate'
  },
  '/cosmos.staking.v1beta1.MsgCreateValidator': {
    typeUrl: 'cosmos.staking.v1beta1.MsgCreateValidator',
    color: colors.staking,
    displayName: 'Create Validator'
  },
  '/cosmos.staking.v1beta1.MsgEditValidator': {
    typeUrl: 'cosmos.staking.v1beta1.MsgEditValidator',
    color: colors.staking,
    displayName: 'Edit Validator'
  },
  // ========================
  // bank
  // ========================
  '/cosmos.bank.v1beta1.MsgSend': {
    typeUrl: 'cosmos.bank.v1beta1.MsgSend',
    color: colors.bank,
    displayName: 'Send'
  },
  '/cosmos.bank.v1beta1.MsgMultiSend': {
    typeUrl: 'cosmos.bank.v1beta1.MsgMultiSend',
    color: colors.bank,
    displayName: 'Multisend'
  },
  // ========================
  // crisis
  // ========================
  '/cosmos.crisis.v1beta1.MsgVerifyInvariant': {
    typeUrl: 'cosmos.crisis.v1beta1.MsgVerifyInvariant',
    color: colors.crisis,
    displayName: 'Verify Invariant'
  },
  // ========================
  // slashing
  // ========================
  '/cosmos.slashing.v1beta1.MsgUnjail': {
    typeUrl: 'cosmos.slashing.v1beta1.MsgUnjail',
    color: colors.slashing,
    displayName: 'Unjail'
  },
  // ========================
  // distribution
  // ========================
  '/cosmos.distribution.v1beta1.MsgFundCommunityPool': {
    typeUrl: 'cosmos.distribution.v1beta1.MsgFundCommunityPool',
    color: colors.distribution,
    displayName: 'Fund Community Pool'
  },
  '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress': {
    typeUrl: 'cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
    color: colors.distribution,
    displayName: 'Set Withdraw Address'
  },
  '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward': {
    typeUrl: 'cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
    color: colors.distribution,
    displayName: 'Withdraw Reward'
  },
  '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission': {
    typeUrl: 'cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
    color: colors.distribution,
    displayName: 'Withdraw Commission'
  },
  // ========================
  // governance
  // ========================
  '/cosmos.gov.v1beta1.MsgDeposit': {
    typeUrl: 'cosmos.gov.v1beta1.MsgDeposit',
    color: colors.governance,
    displayName: 'Deposit'
  },
  '/cosmos.gov.v1beta1.MsgVote': {
    typeUrl: 'cosmos.gov.v1beta1.MsgVote',
    color: colors.governance,
    displayName: 'Vote'
  },
  '/cosmos.gov.v1beta1.MsgSubmitProposal': {
    typeUrl: 'cosmos.gov.v1beta1.MsgSubmitProposal',
    color: colors.governance,
    displayName: 'Submit proposal'
  },
  // ========================
  // ibc client
  // ========================
  '/ibc.core.client.v1.MsgCreateClient': {
    typeUrl: 'ibc.core.client.v1.MsgCreateClient',
    color: colors.ibc,
    displayName: 'Create Client'
  },
  '/ibc.core.client.v1.MsgUpdateClient': {
    typeUrl: 'ibc.core.client.v1.MsgUpdateClient',
    color: colors.ibc,
    displayName: 'Update Client'
  },
  '/ibc.core.client.v1.MsgUpgradeClient': {
    typeUrl: 'ibc.core.client.v1.MsgUpgradeClient',
    color: colors.ibc,
    displayName: 'Upgrade Client'
  },
  '/ibc.core.client.v1.MsgSubmitMisbehaviour': {
    typeUrl: 'ibc.core.client.v1.MsgSubmitMisbehaviour',
    color: colors.ibc,
    displayName: 'Submit Misbehaviour'
  },
  '/ibc.core.client.v1.MsgHeight': {
    typeUrl: 'ibc.core.client.v1.MsgHeight',
    color: colors.ibc,
    displayName: 'Height'
  },
  // ========================
  // ibc channel
  // ========================
  '/ibc.core.channel.v1.MsgReceivePacket': {
    typeUrl: 'ibc.core.channel.v1.MsgReceivePacket',
    color: colors.ibc,
    displayName: 'Receive Packet'
  },
  '/ibc.core.channel.v1.MsgChannel': {
    typeUrl: 'ibc.core.channel.v1.MsgChannel',
    color: colors.ibc,
    displayName: 'Channel'
  },
  '/ibc.core.channel.v1.MsgCounterpartyChannel': {
    typeUrl: 'ibc.core.channel.v1.MsgCounterpartyChannel',
    color: colors.ibc,
    displayName: 'Counterparty Channel'
  },
  '/ibc.core.channel.v1.MsgPacket': {
    typeUrl: 'ibc.core.channel.v1.MsgPacket',
    color: colors.ibc,
    displayName: 'Packet'
  },
  '/ibc.core.channel.v1.MsgAcknowledgement': {
    typeUrl: 'ibc.core.channel.v1.MsgAcknowledgement',
    color: colors.ibc,
    displayName: 'Acknowledgement'
  },
  '/ibc.core.channel.v1.MsgChannelCloseConfirm': {
    typeUrl: 'ibc.core.channel.v1.MsgChannelCloseConfirm',
    color: colors.ibc,
    displayName: 'Channel Close Confirm'
  },
  '/ibc.core.channel.v1.MsgChannelCloseInit': {
    typeUrl: 'ibc.core.channel.v1.MsgChannelCloseInit',
    color: colors.ibc,
    displayName: 'Channel Close Init'
  },
  '/ibc.core.channel.v1.MsgChannelOpenAck': {
    typeUrl: 'ibc.core.channel.v1.MsgChannelOpenAck',
    color: colors.ibc,
    displayName: 'Channel Open Ack'
  },
  '/ibc.core.channel.v1.MsgChannelOpenConfirm': {
    typeUrl: 'ibc.core.channel.v1.MsgChannelOpenConfirm',
    color: colors.ibc,
    displayName: 'Channel Open Confirm'
  },
  '/ibc.core.channel.v1.MsgChannelOpenInit': {
    typeUrl: 'ibc.core.channel.v1.MsgChannelOpenInit',
    color: colors.ibc,
    displayName: 'Channel Open Init'
  },
  '/ibc.core.channel.v1.MsgChannelOpenTry': {
    typeUrl: 'ibc.core.channel.v1.MsgChannelOpenTry',
    color: colors.ibc,
    displayName: 'Channel Open Try'
  },
  '/ibc.core.channel.v1.MsgTimeout': {
    typeUrl: 'ibc.core.channel.v1.MsgTimeout',
    color: colors.ibc,
    displayName: 'Timeout'
  },
  '/ibc.core.channel.v1.MsgTimeoutOnClose': {
    typeUrl: 'ibc.core.channel.v1.MsgTimeoutOnClose',
    color: colors.ibc,
    displayName: 'Timeout On Close'
  },
  // ========================
  // ibc connection
  // ========================
  '/ibc.core.connection.v1.MsgConnectionOpenAck': {
    typeUrl: 'ibc.core.connection.v1.MsgConnectionOpenAck',
    color: colors.ibc,
    displayName: 'Connection Open Ack'
  },
  '/ibc.core.connection.v1.MsgConnectionOpenConfirm': {
    typeUrl: 'ibc.core.connection.v1.MsgConnectionOpenConfirm',
    color: colors.ibc,
    displayName: 'Connection Open Confirm'
  },
  '/ibc.core.connection.v1.MsgConnectionOpenInit': {
    typeUrl: 'ibc.core.connection.v1.MsgConnectionOpenInit',
    color: colors.ibc,
    displayName: 'Connection Open Init'
  },
  '/ibc.core.connection.v1.MsgConnectionOpenTry': {
    typeUrl: 'ibc.core.connection.v1.MsgConnectionOpenTry',
    color: colors.ibc,
    displayName: 'Connection Open Try'
  },
  '/ibc.core.connection.v1.MsgConnectionEnd': {
    typeUrl: 'ibc.core.connection.v1.MsgConnectionEnd',
    color: colors.ibc,
    displayName: 'Connection End'
  },
  '/ibc.core.connection.v1.MsgCounterpartyConnection': {
    typeUrl: 'ibc.core.connection.v1.MsgCounterpartyConnection',
    color: colors.ibc,
    displayName: 'Counterparty Connection'
  },
  '/ibc.core.connection.v1.MsgVersion': {
    typeUrl: 'ibc.core.connection.v1.MsgVersion',
    color: colors.ibc,
    displayName: 'Version'
  },
  // ========================
  // ibc transfer
  // ========================
  '/ibc.applications.transfer.v1.MsgTransfer': {
    typeUrl: 'ibc.applications.transfer.v1.MsgTransfer',
    color: colors.ibcTransfer,
    displayName: 'Transfer'
  },
  // ========================
  // authz
  // ========================
  '/cosmos.authz.v1beta1.MsgGrant': {
    typeUrl: 'cosmos.authz.v1beta1.MsgGrant',
    color: colors.authz,
    displayName: 'Grant'
  },
  '/cosmos.authz.v1beta1.MsgRevoke': {
    typeUrl: 'cosmos.authz.v1beta1.MsgRevoke',
    color: colors.authz,
    displayName: 'Revoke'
  },
  // ========================
  // feegrant
  // ========================
  '/cosmos.feegrant.v1beta1.MsgGrantAllowance': {
    typeUrl: 'cosmos.feegrant.v1beta1.MsgGrantAllowance',
    color: colors.feegrant,
    displayName: 'Grant Allowance'
  },
  '/cosmos.feegrant.v1beta1.MsgRevokeAllowance': {
    typeUrl: 'cosmos.feegrant.v1beta1.MsgRevokeAllowance',
    color: colors.feegrant,
    displayName: 'Revoke Allowance'
  },
  // ========================
  // vesting
  // ========================
  '/cosmos.vesting.v1beta1.MsgCreateVestingAccount': {
    typeUrl: 'cosmos.vesting.v1beta1.MsgCreateVestingAccount',
    color: colors.vesting,
    displayName: 'Create Vesting Account'
  },
  '/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount': {
    typeUrl: 'cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount',
    color: colors.vesting,
    displayName: 'Create Periodic Vesting Account'
  }
}

export const unknownMessage = {
  typeUrl: 'unknown',
  color: 'gray',
  displayName: 'Unknown'
}
