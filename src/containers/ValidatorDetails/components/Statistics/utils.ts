import axios from 'axios'
import * as R from 'ramda'
import { toValidatorAddress } from 'utils/prefix_convert'
import {
  AccountCommissionDocument,
  AccountWithdrawalAddressDocument,
  AccountBalancesDocument,
  AccountDelegationBalanceDocument,
  AccountUnbondingBalanceDocument,
  AccountDelegationRewardsDocument,
  ValidatorVotingPowersDocument,
  AccountDelegationsDocument
} from 'graphql/account_actions'
import { CHAIN_DETAILS } from 'utils/constants'

export const fetchCommission = async (chosenNetwork: string, address: string) => {
  const defaultReturnValue = {
    commission: {
      coins: null
    }
  }
  try {
    const { data } = await axios.post(CHAIN_DETAILS.GRAPHQL_URL[chosenNetwork as keyof typeof CHAIN_DETAILS.GRAPHQL_URL], {
      variables: {
        validatorAddress: toValidatorAddress(address)
      },
      query: AccountCommissionDocument
    })
    return R.pathOr(defaultReturnValue, ['data'], data)
  } catch (error) {
    return defaultReturnValue
  }
}

export const fetchAccountWithdrawalAddress = async (chosenNetwork: string, address: string) => {
  const defaultReturnValue = {
    withdrawalAddress: {
      address
    }
  }
  try {
    const { data } = await axios.post(CHAIN_DETAILS.GRAPHQL_URL[chosenNetwork as keyof typeof CHAIN_DETAILS.GRAPHQL_URL], {
      variables: {
        address
      },
      query: AccountWithdrawalAddressDocument
    })
    return R.pathOr(defaultReturnValue, ['data'], data)
  } catch (error) {
    return defaultReturnValue
  }
}

export const fetchAvailableBalances = async (chosenNetwork: string, address: string) => {
  const defaultReturnValue = {
    accountBalances: {
      coins: []
    }
  }
  try {
    const { data } = await axios.post(CHAIN_DETAILS.GRAPHQL_URL[chosenNetwork as keyof typeof CHAIN_DETAILS.GRAPHQL_URL], {
      variables: {
        address
      },
      query: AccountBalancesDocument
    })
    return R.pathOr(defaultReturnValue, ['data'], data)
  } catch (error) {
    return defaultReturnValue
  }
}

export const fetchDelegationBalance = async (chosenNetwork: string, address: string) => {
  const defaultReturnValue = {
    delegationBalance: {
      coins: []
    }
  }
  try {
    const { data } = await axios.post(CHAIN_DETAILS.GRAPHQL_URL[chosenNetwork as keyof typeof CHAIN_DETAILS.GRAPHQL_URL], {
      variables: {
        address
      },
      query: AccountDelegationBalanceDocument
    })
    return R.pathOr(defaultReturnValue, ['data'], data)
  } catch (error) {
    return defaultReturnValue
  }
}

export const fetchUnbondingBalance = async (chosenNetwork: string, address: string) => {
  const defaultReturnValue = {
    unbondingBalance: {
      coins: []
    }
  }
  try {
    const { data } = await axios.post(CHAIN_DETAILS.GRAPHQL_URL[chosenNetwork as keyof typeof CHAIN_DETAILS.GRAPHQL_URL], {
      variables: {
        address
      },
      query: AccountUnbondingBalanceDocument
    })
    return R.pathOr(defaultReturnValue, ['data'], data)
  } catch (error) {
    return defaultReturnValue
  }
}

export const fetchRewards = async (chosenNetwork: string, address: string) => {
  const defaultReturnValue = {
    delegationRewards: []
  }
  try {
    const { data } = await axios.post(CHAIN_DETAILS.GRAPHQL_URL[chosenNetwork as keyof typeof CHAIN_DETAILS.GRAPHQL_URL], {
      variables: {
        address
      },
      query: AccountDelegationRewardsDocument
    })
    return R.pathOr(defaultReturnValue, ['data'], data)
  } catch (error) {
    return defaultReturnValue
  }
}

export const fetchVotingPower = async (chosenNetwork: string, address: string) => {
  const defaultVotingPower = {
    votingPower: []
  }
  try {
    const { data } = await axios.post(CHAIN_DETAILS.GRAPHQL_URL[chosenNetwork as keyof typeof CHAIN_DETAILS.GRAPHQL_URL], {
      variables: {
        address
      },
      query: ValidatorVotingPowersDocument
    })
    return R.pathOr(defaultVotingPower, ['data'], data)
  } catch (error) {
    return defaultVotingPower
  }
}

export const fetchAccountDelegations = async (chosenNetwork: string, address: string) => {
  const defaultAccountDelegations = {
    accountDelegations: []
  }
  try {
    const { data } = await axios.post(CHAIN_DETAILS.GRAPHQL_URL[chosenNetwork as keyof typeof CHAIN_DETAILS.GRAPHQL_URL], {
      variables: {
        address
      },
      query: AccountDelegationsDocument
    })
    return R.pathOr(defaultAccountDelegations, ['data'], data)
  } catch (error) {
    return defaultAccountDelegations
  }
}
