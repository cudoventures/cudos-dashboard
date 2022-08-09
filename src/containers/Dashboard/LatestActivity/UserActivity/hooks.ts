/* eslint-disable import/prefer-default-export */
import { useDispatch, useSelector } from 'react-redux'
import {
  GetMessagesByAddressQuery,
  useGetMessagesByAddressDistinctListenerSubscription
} from 'graphql/types'
import { RootState } from 'store'
import { updateUserTransactions } from 'store/userTransactions'

const LIMIT = 20

export const useUserTransactions = () => {
  const dispatch = useDispatch()
  const { address } = useSelector((state: RootState) => state.profile)
  const state = useSelector((state: RootState) => state.userTransactions)

  const formatTransactions = (data: GetMessagesByAddressQuery) => {
    const formattedData = data.messagesByAddress

    return formattedData.map((x) => {
      const { transaction } = x

      // =============================
      // messages
      // =============================

      return {
        height: transaction.height,
        hash: transaction.hash,
        messages: transaction.messages,
        success: transaction.success,
        timestamp: transaction.block.timestamp
      }
    })
  }

  useGetMessagesByAddressDistinctListenerSubscription({
    variables: {
      limit: LIMIT,
      offset: 0,
      address: `{${address}}`
    },
    onSubscriptionData: (data: any) => {
      const stateChange = {
        data: formatTransactions(data.subscriptionData.data),
        offsetCount: state.offsetCount + LIMIT,
        hasActivity: !!data.subscriptionData.data.messagesByAddress.length,
        loading: data.subscriptionData.loading
      }
      dispatch(updateUserTransactions(stateChange))
    }
  })

  return {
    state
  }
}
