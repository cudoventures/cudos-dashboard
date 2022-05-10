/* eslint-disable import/prefer-default-export */
import numeral from 'numeral'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { chainConfig } from '../../../configs'
import { formatToken } from '../../../utils/format_token'
import {
  useVotingPowerAggregateSubscription,
  useStakingPoolSubscription
} from '../../../graphql/types'
import { updateNetwork } from '../../../store/network'

export const useOnlineVotingPower = () => {
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state.network)

  useVotingPowerAggregateSubscription({
    onSubscriptionData: (data) => {
      dispatch(
        updateNetwork({
          ...state,
          votingPower:
            data?.subscriptionData.data?.validatorVotingPowerAggregate.aggregate
              ?.sum?.votingPower
        })
      )
    }
  })

  useStakingPoolSubscription({
    onSubscriptionData: (data) => {
      dispatch(
        updateNetwork({
          ...state,
          totalVotingPower: numeral(
            formatToken(
              data?.subscriptionData.data?.stakingPool[0]?.bonded,
              chainConfig.votingPowerTokenUnit
            ).value
          ).value()
        })
      )
    }
  })

  return {
    state
  }
}
