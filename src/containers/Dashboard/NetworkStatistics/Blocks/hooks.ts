/* eslint-disable import/prefer-default-export */
import * as R from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import {
  useLatestBlockHeightListenerSubscription,
  useAverageBlockTimeQuery,
  AverageBlockTimeQuery,
  useActiveValidatorCountQuery,
  ActiveValidatorCountQuery
} from '../../../../graphql/types'
import { RootState } from '../../../../store'
import { updateNetwork } from '../../../../store/network'

export const useDataBlocks = () => {
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state.network)

  const formatAverageBlockTime = (data: AverageBlockTimeQuery) => {
    return data.averageBlockTime[0]?.averageTime ?? state.blockTime
  }

  const formatActiveValidatorsCount = (data: ActiveValidatorCountQuery) => {
    return {
      active: data.activeTotal.aggregate?.count,
      total: data.total.aggregate?.count
    }
  }

  // ====================================
  // block height
  // ====================================

  useLatestBlockHeightListenerSubscription({
    onSubscriptionData: (data) => {
      dispatch(
        updateNetwork({
          ...state,
          blockHeight: R.pathOr(
            0,
            ['height', 0, 'height'],
            data.subscriptionData.data
          )
        })
      )
    }
  })

  // ====================================
  // block time
  // ====================================
  useAverageBlockTimeQuery({
    onCompleted: (data) => {
      dispatch(
        updateNetwork({
          ...state,
          blockTime: formatAverageBlockTime(data)
        })
      )
    }
  })

  // ====================================
  // validators
  // ====================================
  useActiveValidatorCountQuery({
    onCompleted: (data) => {
      dispatch(
        updateNetwork({
          ...state,
          validators: formatActiveValidatorsCount(data)
        })
      )
    }
  })

  return {
    state
  }
}
