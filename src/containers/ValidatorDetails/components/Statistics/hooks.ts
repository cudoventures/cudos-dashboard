import { useState, useEffect } from 'react'
import * as R from 'ramda'
import Big from 'big.js'
import { getDenom } from 'utils/get_denom'
import { formatToken } from 'utils/format_token'
import { chainConfig } from 'configs'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { AccountDetailState } from './types'
import {
  fetchAvailableBalances,
  fetchCommission,
  fetchDelegationBalance,
  fetchRewards,
  fetchUnbondingBalance
} from './utils'

const defaultTokenUnit: TokenUnit = {
  value: '0',
  baseDenom: '',
  displayDenom: '',
  exponent: 0
}

const initialState: AccountDetailState = {
  loading: true,
  exists: true,
  balance: {
    available: defaultTokenUnit,
    delegate: defaultTokenUnit,
    unbonding: defaultTokenUnit,
    reward: defaultTokenUnit,
    commission: defaultTokenUnit,
    total: defaultTokenUnit
  }
}

export const useStatistics = () => {
  const [state, setState] = useState<AccountDetailState>(initialState)
  const selfDelegateAddress = useSelector(
    (state: RootState) => state.validatorDetails.selfDelegateAddress
  )

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState))
  }

  const handleTabChange = (_event: any, newValue: number) => {
    setState((prevState) => ({
      ...prevState,
      tab: newValue
    }))
  }

  useEffect(() => {
    handleSetState(initialState)
  }, [selfDelegateAddress])

  // ==========================
  // Format Data
  // ==========================
  const formatAllBalance = (data: any) => {
    const stateChange: any = {
      loading: false
    }

    // ============================
    // balance
    // ============================
    const formatBalance = () => {
      const available = getDenom(
        R.pathOr([], ['accountBalances', 'coins'], data),
        chainConfig.primaryTokenUnit
      )
      const availableAmount = formatToken(
        available.amount,
        chainConfig.primaryTokenUnit
      )
      const delegate = getDenom(
        R.pathOr([], ['delegationBalance', 'coins'], data),
        chainConfig.primaryTokenUnit
      )
      const delegateAmount = formatToken(
        delegate.amount,
        chainConfig.primaryTokenUnit
      )

      const unbonding = getDenom(
        R.pathOr([], ['unbondingBalance', 'coins'], data),
        chainConfig.primaryTokenUnit
      )
      const unbondingAmount = formatToken(
        unbonding.amount,
        chainConfig.primaryTokenUnit
      )

      const rewards = data.delegationRewards.reduce((a, b) => {
        const coins = R.pathOr([], ['coins'], b)
        const dsmCoins = getDenom(coins, chainConfig.primaryTokenUnit)

        return Big(a).plus(dsmCoins.amount).toPrecision()
      }, '0')
      const rewardsAmount = formatToken(rewards, chainConfig.primaryTokenUnit)

      const commission = getDenom(
        R.pathOr([], ['commission', 'coins'], data),
        chainConfig.primaryTokenUnit
      )
      const commissionAmount = formatToken(
        commission.amount,
        chainConfig.primaryTokenUnit
      )

      const total = Big(availableAmount.value)
        .plus(delegateAmount.value)
        .plus(unbondingAmount.value)
        .plus(rewardsAmount.value)
        .plus(commissionAmount.value)
        .toFixed(chainConfig.tokenUnits[chainConfig.primaryTokenUnit].exponent)

      const balance = {
        available: availableAmount,
        delegate: delegateAmount,
        unbonding: unbondingAmount,
        reward: rewardsAmount,
        commission: commissionAmount,
        total: {
          value: total,
          displayDenom: availableAmount.displayDenom,
          baseDenom: availableAmount.baseDenom,
          exponent: availableAmount.exponent
        }
      }

      return balance
    }

    stateChange.balance = formatBalance()

    return stateChange
  }

  // ==========================
  // Fetch Data
  // ==========================

  const fetchBalance = async () => {
    const promises = [
      fetchCommission(selfDelegateAddress),
      fetchAvailableBalances(selfDelegateAddress),
      fetchDelegationBalance(selfDelegateAddress),
      fetchUnbondingBalance(selfDelegateAddress),
      fetchRewards(selfDelegateAddress)
    ]
    const [commission, available, delegation, unbonding, rewards] =
      await Promise.allSettled(promises)

    const formattedRawData: any = {}
    formattedRawData.commission = R.pathOr(
      [],
      ['value', 'commission'],
      commission
    )
    formattedRawData.accountBalances = R.pathOr(
      [],
      ['value', 'accountBalances'],
      available
    )
    formattedRawData.delegationBalance = R.pathOr(
      [],
      ['value', 'delegationBalance'],
      delegation
    )
    formattedRawData.unbondingBalance = R.pathOr(
      [],
      ['value', 'unbondingBalance'],
      unbonding
    )
    formattedRawData.delegationRewards = R.pathOr(
      [],
      ['value', 'delegationRewards'],
      rewards
    )
    handleSetState(formatAllBalance(formattedRawData))
  }

  useEffect(() => {
    fetchBalance()
  }, [selfDelegateAddress])

  return {
    state,
    handleTabChange
  }
}
