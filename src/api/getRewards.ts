/* eslint-disable import/prefer-default-export */
import axios from 'axios'
import BigNumber from 'bignumber.js'
import { formatBigNum } from '../utils/projectUtils'
import { AccountDelegationRewardsDocument } from '../graphql/account_actions'
import { CHAIN_DETAILS } from 'utils/constants'

export const fetchRewards = async (address: string, signal?: AbortSignal) => {
  const defaultReturnValue = new BigNumber(0)
  const rewardArray: Array<BigNumber> = []
  const validatorArray: { address: string; amount: string }[] = []
  try {
    const { data } = await axios.post(
      CHAIN_DETAILS.GRAPHQL_URL,
      {
        variables: { address },
        query: AccountDelegationRewardsDocument
      },
      {
        signal
      }
    )

    Object.values(data.data.delegationRewards).forEach((value: any) => {
      rewardArray.push(
        value.coins.length ? value.coins[0].amount : new BigNumber(0)
      )
      validatorArray.push({
        address: value.validatorAddress,
        amount: value.coins.length ? value.coins[0].amount.split('.')[0] : '0'
      })
    })

    const totalRewards = formatBigNum(
      rewardArray.reduce((a: BigNumber, b: BigNumber) => BigNumber.sum(a, b))
    )

    return { totalRewards, validatorArray }
  } catch (error) {
    return { totalRewards: defaultReturnValue, validatorArray: [] }
  }
}
