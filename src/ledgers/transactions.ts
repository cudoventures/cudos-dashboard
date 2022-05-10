import BigNumber from 'bignumber.js'

import {
  DeliverTxResponse,
  GasPrice,
  SigningStargateClient,
  StdFee,
  calculateFee as calcFee
} from 'cudosjs'
import CosmosNetworkConfig from './CosmosNetworkConfig'

const TYPE_URLS = {
  msgDelegate: '/cosmos.staking.v1beta1.MsgDelegate',
  msgUndelegate: '/cosmos.staking.v1beta1.MsgUndelegate',
  msgRedelegate: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
  msgSend: '/cosmos.bank.v1beta1.MsgSend',
  msgWithdraw: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
  msgSubmitProposal: '/cosmos.gov.v1beta1.MsgSubmitProposal',
  ClientStateType: '/ibc.lightclients.tendermint.v1.ClientState',
  proposalTypeCancelSoftwareUpgradeProposal:
    '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal',
  proposalTypeSoftwareUpgradeProposal:
    '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
  proposalTypeTextProposal: '/cosmos.gov.v1beta1.TextProposal',
  proposalTypeParameterChangeProposal:
    '/cosmos.params.v1beta1.ParameterChangeProposal',
  proposalTypeCommunityPoolSpendProposal:
    '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal',
  proposalTypeClientUpdateProposal: '/ibc.core.client.v1.ClientUpdateProposal',
  proposalTypeIbcUpgradeProposal: '/ibc.core.client.v1.UpgradeProposal'
}
const feeMultiplier = 1.3

export const calculateFee = async (
  address: string,
  msgAny: any,
  memo: string
): Promise<StdFee> => {
  const offlineSigner = window.getOfflineSigner(
    import.meta.env.VITE_APP_CHAIN_ID
  )

  const client = await SigningStargateClient.connectWithSigner(
    import.meta.env.VITE_APP_RPC,
    offlineSigner,
    {
      gasPrice: GasPrice.fromString(`1${CosmosNetworkConfig.CURRENCY_DENOM}`)
    }
  )

  const gasUsed = await client.simulate(address, [msgAny], memo)

  const gasLimit = Math.round(gasUsed * feeMultiplier)

  const fee = calcFee(gasLimit, `1${CosmosNetworkConfig.CURRENCY_DENOM}`)

  return fee
}

export const delegate = async (
  delegatorAddress: string,
  validatorAddress: string,
  amount: string,
  memo: string
): Promise<DeliverTxResponse> => {
  const offlineSigner = window.getOfflineSigner(
    import.meta.env.VITE_APP_CHAIN_ID
  )

  const client = await SigningStargateClient.connectWithSigner(
    import.meta.env.VITE_APP_RPC,
    offlineSigner,
    {
      gasPrice: GasPrice.fromString(`1${CosmosNetworkConfig.CURRENCY_DENOM}`)
    }
  )

  const delegationAmount = {
    amount: new BigNumber(amount)
      .multipliedBy(CosmosNetworkConfig.CURRENCY_1_CUDO)
      .toString(10),
    denom: CosmosNetworkConfig.CURRENCY_DENOM
  }

  const result = await client.delegateTokens(
    delegatorAddress,
    validatorAddress,
    delegationAmount,
    'auto',
    memo
  )

  return result
}

export const undelegate = async (
  delegatorAddress: string,
  validatorAddress: string,
  amount: string,
  memo: string
): Promise<DeliverTxResponse> => {
  const offlineSigner = window.getOfflineSigner(
    import.meta.env.VITE_APP_CHAIN_ID
  )

  const client = await SigningStargateClient.connectWithSigner(
    import.meta.env.VITE_APP_RPC,
    offlineSigner
  )

  const undelegationAmount = {
    amount: new BigNumber(amount || 0)
      .multipliedBy(CosmosNetworkConfig.CURRENCY_1_CUDO)
      .toString(10),
    denom: CosmosNetworkConfig.CURRENCY_DENOM
  }

  const result = await client.undelegateTokens(
    delegatorAddress,
    validatorAddress,
    undelegationAmount,
    'auto',
    memo
  )

  return result
}
