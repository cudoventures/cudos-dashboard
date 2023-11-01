/* eslint-disable import/prefer-default-export */
import { useDispatch, useSelector } from 'react-redux'
import {
  GetMessagesByAddressQuery,
  useGetMessagesByAddressDistinctListenerSubscription,
  useGetGravityMessagesByAddressListenerSubscription
} from 'graphql/types'
import { RootState } from 'store'
import { updateUserTransactions } from 'store/userTransactions'
import { useEffect, useState } from 'react'

const LIMIT = 20

const formatTransactions = (data: GetMessagesByAddressQuery) => {
  const formattedData = data.messagesByAddress
  const sortedData = formattedData
    .sort(
      (a, b) =>
        new Date(b.transaction?.block.timestamp).getTime()
        -
        new Date(a.transaction?.block.timestamp).getTime()
    )
    .slice(0, LIMIT)

  return sortedData.map((x) => {
    const { transaction } = x

    // =============================
    // messages
    // =============================

    return {
      height: transaction?.height,
      hash: transaction?.hash,
      messages: transaction?.messages,
      success: transaction?.success,
      timestamp: transaction?.block.timestamp
    }
  })
}

export const useUserTransactions = () => {
  const dispatch = useDispatch()
  const { address } = useSelector((state: RootState) => state.profile)
  const state = useSelector((state: RootState) => state.userTransactions)
  const [bridgeMsgs, setBridgeMsgs] = useState<any[]>([])
  const [regularMsgs, setRegularMsgs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updateReceived, setUpdateReceived] = useState(false)

  const processUpdates = () => {
    if (updateReceived) {
      setIsLoading(false)
      setUpdateReceived(false)
    }
  }

  // GetGravityMsgs
  useGetGravityMessagesByAddressListenerSubscription({
    variables: {
      address: address
    },
    onSubscriptionData: (data: any) => {
      setBridgeMsgs(data.subscriptionData.data.messagesByAddress)
      setUpdateReceived(!data.subscriptionData.loading)
    }
  })

  // GetRegularMsgs
  useGetMessagesByAddressDistinctListenerSubscription({
    variables: {
      limit: LIMIT,
      offset: 0,
      address: `{${address}}`
    },
    onSubscriptionData: (data: any) => {
      setRegularMsgs(data.subscriptionData.data.messagesByAddress)
      setUpdateReceived(!data.subscriptionData.loading)
    }
  })

  // Handle smoother UX on subscription update
  useEffect(() => {
    if (updateReceived) {
      setIsLoading(true)
      const timer = setTimeout(processUpdates, 500)
      return () => clearTimeout(timer)
    }
  }, [updateReceived])

  // Update global state
  useEffect(() => {
    const combinedMsgs = [...bridgeMsgs, ...regularMsgs]
    const hasMessages = combinedMsgs.length > 0;
    const dataForFormatting = { messagesByAddress: combinedMsgs };
    const formattedData = hasMessages ? formatTransactions(dataForFormatting) : []

    const stateChange = {
      data: formattedData,
      offsetCount: state.offsetCount + LIMIT,
      hasActivity: hasMessages,
      loading: isLoading
    }

    dispatch(updateUserTransactions(stateChange))
  }, [bridgeMsgs.length, regularMsgs.length, isLoading])

  return {
    state
  }
}
