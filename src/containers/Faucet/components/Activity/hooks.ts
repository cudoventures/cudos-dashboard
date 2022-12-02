import { useEffect, useState } from 'react'
import * as R from 'ramda'
import {
  GetMessagesByAddressListenerDocument,
  useGetMessagesByAddressQuery
} from 'graphql/types'
import { ActivityState } from './types'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { CHAIN_DETAILS } from 'utils/constants'

const LIMIT = 50

export const useActivity = () => {
  const { chosenNetwork } = useSelector((state: RootState) => state.profile)
  const [state, setState] = useState<ActivityState>({
    items: [],
    loading: false
  })

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState))
  }

  const formatTransactions = (data: any) => {
    const formattedItems = data.messagesByAddress
      .map((item: any, index: string) => {
        const address = R.pathOr(
          '',
          ['transaction', 'messages', 0, 'to_address'],
          item
        )
        const amount = R.pathOr(
          0,
          ['transaction', 'messages', 0, 'amount', 0, 'amount'],
          item
        )
        const timestamp = R.pathOr(
          new Date(),
          ['transaction', 'block', 'timestamp'],
          item
        )

        return {
          address,
          amount,
          timestamp
        }
      })
      .filter(
        (item: any) => item.address !== CHAIN_DETAILS.FAUCET_ADDRESS[chosenNetwork as keyof typeof CHAIN_DETAILS.FAUCET_ADDRESS]
      )

    return formattedItems
  }

  const transactionQuery = useGetMessagesByAddressQuery({
    variables: {
      limit: LIMIT,
      offset: 0,
      address: `{${CHAIN_DETAILS.FAUCET_ADDRESS[chosenNetwork as keyof typeof CHAIN_DETAILS.FAUCET_ADDRESS]}}`,
      types: `{cosmos.bank.v1beta1.MsgSend}`
    },
    onCompleted: (data: any) => {
      const stateChange = {
        items: formatTransactions(data),
        loading: false
      }

      handleSetState(stateChange)
    }
  })

  useEffect(() => {
    const subscription = transactionQuery.subscribeToMore({
      document: GetMessagesByAddressListenerDocument,
      variables: {
        limit: LIMIT + 1,
        offset: 0,
        address: `{${CHAIN_DETAILS.FAUCET_ADDRESS[chosenNetwork as keyof typeof CHAIN_DETAILS.FAUCET_ADDRESS]}}`
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev

        const newFeedItem = subscriptionData.data.messagesByAddress
        const newItems = R.uniq([
          ...state.items,
          ...formatTransactions(subscriptionData.data)
        ])

        const stateChange = {
          data: newItems,
          loading: false
        }

        handleSetState(stateChange)

        return {
          messagesByAddress: [...newFeedItem]
        }
      }
    })

    return () => subscription()
  }, [])

  return {
    state
  }
}
