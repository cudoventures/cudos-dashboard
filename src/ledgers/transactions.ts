import BigNumber from 'bignumber.js'
import { MsgWithdrawDelegatorReward } from 'cosmjs-types/cosmos/distribution/v1beta1/tx'
import { MsgVote } from 'cosmjs-types/cosmos/gov/v1beta1/tx'
import {
  MsgDelegate,
  MsgUndelegate,
  MsgBeginRedelegate
} from 'cosmjs-types/cosmos/staking/v1beta1/tx'

import {
  DeliverTxResponse,
  GasPrice,
  SigningStargateClient,
  coins,
  coin,
  MsgDelegateEncodeObject,
  MsgVoteEncodeObject,
  MsgUndelegateEncodeObject
} from 'cudosjs'
import CosmosNetworkConfig from './CosmosNetworkConfig'

const feeMultiplier = import.meta.env.VITE_APP_FEE_MULTIPLIER
const gasPrice = GasPrice.fromString(
  `${import.meta.env.VITE_APP_GAS_PRICE}${CosmosNetworkConfig.CURRENCY_DENOM}`
)

export const calculateFee = (gasLimit: number, gasPrice: string | GasPrice) => {
  const processedGasPrice =
    typeof gasPrice === 'string' ? GasPrice.fromString(gasPrice) : gasPrice
  const { denom, amount: gasPriceAmount } = processedGasPrice
  const amount = new BigNumber(gasPriceAmount.toString())
    .multipliedBy(gasLimit)
    .toFixed(0)
  return {
    amount: coins(amount, denom),
    gas: new BigNumber(gasLimit).toFixed(0)
  }
}

export const delegate = async (
  delegatorAddress: string,
  validatorAddress: string,
  amount: string,
  memo: string
): Promise<DeliverTxResponse> => {
  window.keplr.defaultOptions = {
    sign: {
      preferNoSetFee: true
    }
  }
  const offlineSigner = window.getOfflineSigner(
    import.meta.env.VITE_APP_CHAIN_ID
  )

  const client = await SigningStargateClient.connectWithSigner(
    import.meta.env.VITE_APP_RPC,
    offlineSigner
  )

  const delegationAmount = {
    amount: new BigNumber(amount)
      .multipliedBy(CosmosNetworkConfig.CURRENCY_1_CUDO)
      .toString(10),
    denom: CosmosNetworkConfig.CURRENCY_DENOM
  }

  const msg = MsgDelegate.fromPartial({
    delegatorAddress,
    validatorAddress,
    amount: coin(Number(amount), CosmosNetworkConfig.CURRENCY_DENOM)
  })

  const msgAny: MsgDelegateEncodeObject = {
    typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
    value: msg
  }

  const gasUsed = await client.simulate(delegatorAddress, [msgAny], memo)

  const gasLimit = Math.round(gasUsed * feeMultiplier)

  const fee = calculateFee(gasLimit, gasPrice)

  const result = await client.delegateTokens(
    delegatorAddress,
    validatorAddress,
    delegationAmount,
    fee,
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

  const msg = MsgUndelegate.fromPartial({
    delegatorAddress,
    validatorAddress,
    amount: coin(Number(amount), CosmosNetworkConfig.CURRENCY_DENOM)
  })

  const msgAny: MsgUndelegateEncodeObject = {
    typeUrl: '/cosmos.staking.v1beta1.MsgUndelegate',
    value: msg
  }

  const gasUsed = await client.simulate(delegatorAddress, [msgAny], memo)

  const gasLimit = Math.round(gasUsed * feeMultiplier)

  const fee = calculateFee(gasLimit, gasPrice)

  const result = await client.undelegateTokens(
    delegatorAddress,
    validatorAddress,
    undelegationAmount,
    fee,
    memo
  )

  return result
}

export const redelegate = async (
  delegatorAddress: string,
  validatorSrcAddress: string,
  validatorDstAddress: string,
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

  const msg = MsgBeginRedelegate.fromPartial({
    delegatorAddress,
    validatorSrcAddress,
    validatorDstAddress,
    amount: coin(
      new BigNumber(amount || 0)
        .multipliedBy(CosmosNetworkConfig.CURRENCY_1_CUDO)
        .toString(10),
      CosmosNetworkConfig.CURRENCY_DENOM
    )
  })

  const msgAny = {
    typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
    value: msg
  }

  const gasUsed = await client.simulate(delegatorAddress, [msgAny], memo)

  const gasLimit = Math.round(gasUsed * feeMultiplier)

  const fee = calculateFee(gasLimit, gasPrice)

  const result = await client.signAndBroadcast(
    delegatorAddress,
    [msgAny],
    fee,
    memo
  )

  return result
}

export const claimRewards = async (
  stakedValidators: string[],
  address: string
) => {
  window.keplr.defaultOptions = {
    sign: {
      preferNoSetFee: true
    }
  }

  const offlineSigner = window.getOfflineSignerOnlyAmino(
    import.meta.env.VITE_APP_CHAIN_ID
  )

  const client = await SigningStargateClient.connectWithSigner(
    import.meta.env.VITE_APP_RPC,
    offlineSigner
  )

  const msgMemo = ''

  const msgAny: any[] = []

  stakedValidators.map((validator) =>
    msgAny.push({
      typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
      value: MsgWithdrawDelegatorReward.fromPartial({
        delegatorAddress: address,
        validatorAddress: validator
      })
    })
  )

  const gasUsed = await client.simulate(address, [...msgAny], msgMemo)

  const gasLimit = Math.round(gasUsed * feeMultiplier)

  const fee = calculateFee(gasLimit, gasPrice)

  const result = await client.signAndBroadcast(address, msgAny, fee, msgMemo)

  return result
}

export const voteProposal = async (
  voterAddress: string,
  proposalId: number | undefined,
  votingOption: number
) => {
  window.keplr.defaultOptions = {
    sign: {
      preferNoSetFee: true
    }
  }
  const offlineSigner = window.getOfflineSigner(
    import.meta.env.VITE_APP_CHAIN_ID
  )

  const client = await SigningStargateClient.connectWithSigner(
    import.meta.env.VITE_APP_RPC,
    offlineSigner
  )

  const msg = MsgVote.fromPartial({
    proposalId,
    voter: voterAddress,
    option: votingOption
  })

  const msgAny: MsgVoteEncodeObject = {
    typeUrl: '/cosmos.gov.v1beta1.MsgVote',
    value: msg
  }

  const memo = 'Sent via CUDOS Dashboard'

  const gasUsed = await client.simulate(voterAddress, [msgAny], memo)

  const gasLimit = Math.round(gasUsed * feeMultiplier)

  const fee = calculateFee(gasLimit, gasPrice)

  const result = await client.signAndBroadcast(
    voterAddress,
    [msgAny],
    fee,
    memo
  )

  return {
    result,
    gasFee: fee.amount[0].amount
  }
}
