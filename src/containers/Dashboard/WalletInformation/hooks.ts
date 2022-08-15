import { useDispatch, useSelector } from 'react-redux'
import BigNumber from 'bignumber.js'
import { formatBigNum } from 'utils/projectUtils'
import { useAccountDelegationRewardsQuery } from 'graphql/types'
import { RootState } from 'store'
import { updateUser } from 'store/profile'

export const useDelegationRewards = () => {
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state.profile)
  const rewardArray: Array<BigNumber> = []

  const handleSetState = (stateChange: any) => {
    dispatch(updateUser({ ...stateChange }))
  }

  const formatDelegationRewards = (data: any) => {
    if (data.delegationRewards.length) {
      data.delegationRewards
        .filter((value: any) => value.coins.length)
        .map((value: any) => {
          rewardArray.push(value.coins[0].amount)
          return value
        })

      const totalRewards = formatBigNum(
        rewardArray.reduce((a: BigNumber, b: BigNumber) => BigNumber.sum(a, b))
      )
      return new BigNumber(totalRewards)
    }
    return new BigNumber(0)
  }

  useAccountDelegationRewardsQuery({
    variables: {
      address: state.address
    },
    onCompleted: (data) => {
      handleSetState({ availableRewards: formatDelegationRewards(data) })
    }
  })

  return {
    state
  }
}
