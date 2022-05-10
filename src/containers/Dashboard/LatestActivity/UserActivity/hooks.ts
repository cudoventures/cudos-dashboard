/* eslint-disable import/prefer-default-export */
import { useDispatch, useSelector } from 'react-redux'
import {
  GetMessagesByAddressQuery,
  useGetMessagesByAddressListenerSubscription
} from '../../../../graphql/types'
import { RootState } from '../../../../store'
import { updateUserTransactions } from '../../../../store/userTransactions'

const LIMIT = 50
const FILTER = 20

export const useUserTransactions = () => {
  const dispatch = useDispatch()
  const { address } = useSelector((state: RootState) => state.profile)
  const state = useSelector((state: RootState) => state.userTransactions)

  const formatTransactions = (data: GetMessagesByAddressQuery) => {
    let formattedData = data.messagesByAddress
    formattedData = formattedData.filter(
      (ele, ind) =>
        ind ===
        formattedData.findIndex(
          (elem) => elem.transaction.hash === ele.transaction.hash
        )
    )

    if (data.messagesByAddress.length > FILTER + 1) {
      formattedData = formattedData.slice(0, FILTER)
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

  useGetMessagesByAddressListenerSubscription({
    variables: {
      limit: LIMIT,
      offset: 0,
      address: `{${address}}`
    },
    onSubscriptionData: (data: any) => {
      const stateChange = {
        data: formatTransactions(data.subscriptionData.data),
        offsetCount: state.offsetCount + LIMIT
      }
      dispatch(updateUserTransactions(stateChange))
    }
  })

  return {
    state
  }
}
