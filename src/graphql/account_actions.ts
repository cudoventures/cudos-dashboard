/* eslint-disable import/prefer-default-export */
export const AccountDelegationRewardsDocument = `
query AccountDelegationRewards($address: String!) {
  delegationRewards: action_delegation_reward(address: $address) {
    validatorAddress: validator_address
    coins
  }
}
`
