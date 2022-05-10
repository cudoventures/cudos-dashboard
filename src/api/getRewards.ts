/* eslint-disable import/prefer-default-export */
import axios from 'axios'
import BigNumber from 'bignumber.js'
import { formatBigNum } from '../utils/projectUtils'
import { AccountDelegationRewardsDocument } from '../graphql/account_actions'

export const fetchRewards = async (address: string, signal?: AbortSignal) => {
  const defaultReturnValue = new BigNumber(0)
  const rewardArray: Array<BigNumber> = []
  try {
    const { data } = await axios.post(
      import.meta.env.VITE_GRAPHQL_URL?.toString(),
      {
        variables: { address },
        query: AccountDelegationRewardsDocument
      },
      {
        signal
      }
    )

    Object.values(data.data.delegationRewards).map((value: any) => {
      rewardArray.push(value.coins[0].amount)
      return value
    })

    const totalRewards = formatBigNum(
      rewardArray.reduce((a: BigNumber, b: BigNumber) => BigNumber.sum(a, b))
    )

    return totalRewards
  } catch (error) {
    return defaultReturnValue
  }
}
