import { useEffect, useState } from 'react'
import * as R from 'ramda'
import { useParams } from 'react-router-dom'
import {
  useGetMessagesByAddressQuery,
  GetMessagesByAddressQuery,
  GetMessagesByAddressListenerDocument
} from 'graphql/types'
import { TransactionState } from './types'

const LIMIT = 50

export const useActivity = () => {
  const { validatorId } = useParams()
  const [state, setState] = useState<TransactionState>({
    data: [],
    hasNextPage: false,
    isNextPageLoading: false,
    offsetCount: 0,
    filter: ''
  })

  const handleSetState = (stateChange: any) => {
    setState(R.mergeDeepLeft(stateChange, state))
  }

  const formatTransactions = (data: GetMessagesByAddressQuery) => {
    let formattedData = data.messagesByAddress
    if (data.messagesByAddress.length === 51) {
      formattedData = data.messagesByAddress.slice(0, 51)
    }
    return formattedData.map((x) => {
      const { transaction } = x

      // =============================
      // messages
      // =============================
      //   const messages = convertMsgsToModels(transaction)

      return {
        height: transaction.height,
        hash: transaction.hash,
        messages: {
          count: transaction.messages.length,
          items: transaction.messages
        },
        success: transaction.success,
        timestamp: transaction.block.timestamp
      }
    })
  }

  const transactionQuery = useGetMessagesByAddressQuery({
    variables: {
      limit: LIMIT + 1, // to check if more exist
      offset: 0,
      address: `{${validatorId}}`,
      types: `{${state.filter}}`
    },
    onCompleted: (data) => {
      const itemsLength = data.messagesByAddress.length
      const newItems = R.uniq([...state.data, ...formatTransactions(data)])
      const stateChange = {
        data: newItems,
        hasNextPage: itemsLength === 51,
        isNextPageLoading: false,
        offsetCount: state.offsetCount + LIMIT
      }

      handleSetState(stateChange)
    }
  })

  const loadNextPage = async () => {
    handleSetState({
      isNextPageLoading: true
    })
    // refetch query
    await transactionQuery
      .fetchMore({
        variables: {
          offset: state.offsetCount,
          limit: LIMIT + 1,
          types: `{${state.filter}}`
        }
      })
      .then(({ data }) => {
        const itemsLength = data.messagesByAddress.length
        const newItems = R.uniq([...state.data, ...formatTransactions(data)])
        const stateChange = {
          data: newItems,
          hasNextPage: itemsLength === 51,
          isNextPageLoading: false,
          offsetCount: state.offsetCount + LIMIT
        }
        handleSetState(stateChange)
      })
  }

  const filterByType = async (type: string) => {
    handleSetState({
      isNextPageLoading: true
    })

    await transactionQuery
      .fetchMore({
        variables: {
          limit: LIMIT + 1,
          offset: 0,
          address: `{${validatorId}}`,
          types: `{${type}}`
        }
      })
      .then(({ data }) => {
        const itemsLength = data.messagesByAddress.length
        const newItems = R.uniq([...formatTransactions(data)])
        const stateChange = {
          data: newItems,
          hasNextPage: itemsLength === 51,
          isNextPageLoading: false,
          offsetCount: state.offsetCount + LIMIT,
          filter: type
        }
        handleSetState(stateChange)
      })
  }

  useEffect(() => {
    const subscription = transactionQuery.subscribeToMore({
      document: GetMessagesByAddressListenerDocument,
      variables: {
        limit: LIMIT + 1,
        offset: 0,
        address: `{${validatorId}}`
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev

        const newFeedItem = subscriptionData.data.messagesByAddress
        const itemsLength = newFeedItem.length
        const newItems = R.uniq([
          ...state.data,
          ...formatTransactions(subscriptionData.data)
        ])

        const stateChange = {
          data: newItems,
          hasNextPage: itemsLength === 51,
          isNextPageLoading: false,
          offsetCount: state.offsetCount + LIMIT
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
    state,
    loadNextPage,
    filterByType
  }
}
