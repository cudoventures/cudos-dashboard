/* eslint-disable import/prefer-default-export */
import { useDispatch, useSelector } from 'react-redux'
import {
  GetMessagesByAddressQuery,
  useGetMessagesByAddressListenerSubscription
} from '../../../../graphql/types'
import { RootState } from '../../../../store'
import { updateUserTransactions } from '../../../../store/userTransactions'

const LIMIT = 20

export const useUserTransactions = () => {
  const dispatch = useDispatch()
  const { address } = useSelector((state: RootState) => state.profile)
  const state = useSelector((state: RootState) => state.userTransactions)

  useGetMessagesByAddressListenerSubscription({
    variables: {
      limit: LIMIT,
      offset: 0,
      address: `{${address}}`
    },
    onSubscriptionData: (data: { subscriptionData: { data: any } }) => {
      console.log('data', data)

      //   const newItems = R.uniq([
      //     state.data,
      //     formatTransactions(data.subscriptionData.data)
      //   ])
      const stateChange = {
        data: formatTransactions(data.subscriptionData.data),
        offsetCount: state.offsetCount + LIMIT
      }
      console.log('stateChange', stateChange)
      dispatch(updateUserTransactions(stateChange))
    }
  })

  const formatTransactions = (data: GetMessagesByAddressQuery) => {
    let formattedData = data.messagesByAddress
    if (data.messagesByAddress.length === LIMIT + 1) {
      formattedData = data.messagesByAddress.slice(0, LIMIT + 1)
    }
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

  return {
    state
  }
}
