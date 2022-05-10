/* eslint-disable import/prefer-default-export */
import { useDispatch, useSelector } from 'react-redux'
import BigNumber from 'bignumber.js'
import { RootState } from '../../../store'
import {
  useAccountDelegationRewardsQuery,
  AccountDelegationRewardsQuery
} from '../../../graphql/types'
import { updateUser } from '../../../store/profile'

export const useDelegationRewards = () => {
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state.profile)

  const rewardArray: Array<BigNumber> = []

  const handleSetState = (stateChange: any) => {
    dispatch(updateUser({ ...stateChange }))
  }

  const formatDelegationRewards = (data: AccountDelegationRewardsQuery) => {
    Object.values(data.data.delegationRewards).map((value: any) => {
      rewardArray.push(value.coins[0].amount)
      return value
    })

    const totalRewards = formatBigNum(
      rewardArray.reduce((a: BigNumber, b: BigNumber) => BigNumber.sum(a, b))
    )

    return totalRewards
  }

  useAccountDelegationRewardsQuery({
    variables: {
      address: state.address
    },
    onCompleted: (data) => {
      handleSetState(formatDelegationRewards(data))
    }
  })

  return {
    state
  }
}
