export const AccountCommissionDocument = /* GraphQL */ `
  query AccountCommission($validatorAddress: String!) {
    commission: action_validator_commission_amount(address: $validatorAddress) {
      coins
    }
  }
`

export const AccountWithdrawalAddressDocument = /* GraphQL */ `
  query AccountWithdrawalAddress($address: String!) {
    withdrawalAddress: action_delegator_withdraw_address(address: $address) {
      address
    }
  }
`

export const AccountBalancesDocument = /* GraphQL */ `
  query AccountBalances($address: String!) {
    accountBalances: action_account_balance(address: $address) {
      coins
    }
  }
`

export const AccountDelegationBalanceDocument = /* GraphQL */ `
  query AccountDelegationBalance($address: String!) {
    delegationBalance: action_delegation_total(address: $address) {
      coins
    }
  }
`

export const AccountUnbondingBalanceDocument = /* GraphQL */ `
  query AccountUnbondingBalance($address: String!) {
    unbondingBalance: action_unbonding_delegation_total(address: $address) {
      coins
    }
  }
`

export const AccountDelegationRewardsDocument = /* GraphQL */ `
  query AccountDelegationRewards($address: String!) {
    delegationRewards: action_delegation_reward(address: $address) {
      validatorAddress: validator_address
      coins
    }
  }
`

export const AccountDelegationsDocument = /* GraphQL */ `
  query AccountDelegations($address: String!, $offset: Int = 0) {
    delegations: action_delegation(
      address: $address
      offset: $offset
      count_total: true
    ) {
      delegations
      pagination
    }
  }
`

export const AccountRedelegationsDocument = /* GraphQL */ `
  query AccountRedelegations($address: String!, $offset: Int = 0) {
    redelegations: action_redelegation(
      address: $address
      offset: $offset
      count_total: true
    ) {
      redelegations
      pagination
    }
  }
`

export const AccountUndelegationsDocument = /* GraphQL */ `
  query AccountUndelegations($address: String!, $offset: Int = 0) {
    undelegations: action_unbonding_delegation(
      address: $address
      offset: $offset
      count_total: true
    ) {
      undelegations: unbonding_delegations
      pagination
    }
  }
`

export const AccountValidatorDelegationsDocument = /* GraphQL */ `
  query AccountValidatorDelegations(
    $address: String!
    $validator_address: String!
  ) {
    delegation(
      where: {
        delegator_address: { _eq: $address }
        validator_address: { _eq: $validator_address }
      }
    ) {
      amount
    }
  }
`

export const ValidatorVotingPowersDocument = /* GraphQL */ `
  query ValidatorVotingPower($address: String) {
    stakingPool: staking_pool(order_by: { height: desc }, limit: 1, offset: 0) {
      height
      bonded: bonded_tokens
    }
    validator(
      where: { validator_info: { operator_address: { _eq: $address } } }
    ) {
      validatorVotingPowers: validator_voting_powers(
        offset: 0
        limit: 1
        order_by: { height: desc }
      ) {
        height
        votingPower: voting_power
      }
    }
  }
`
