/* eslint-disable import/prefer-default-export */
import { useDispatch, useSelector } from 'react-redux'
import {
  GetMessagesByAddressQuery,
  GetGravityMessagesByAddressQuery,
  useGetMessagesByAddressDistinctListenerSubscription,
  useGetGravityMessagesByAddressListenerSubscription
} from 'graphql/types'
import { RootState } from 'store'
import { updateUserTransactions } from 'store/userTransactions'
import { useState } from 'react'

const LIMIT = 20

export const useUserTransactions = () => {
  const dispatch = useDispatch()
  const { address } = useSelector((state: RootState) => state.profile)
  const state = useSelector((state: RootState) => state.userTransactions)
  const [bridgeData, setBridgeData] =
    useState<GetGravityMessagesByAddressQuery>()

  const formatTransactions = (data: GetMessagesByAddressQuery) => {
    const formattedData = data.messagesByAddress
    const sortedData = formattedData
      .sort(
        (a, b) => b.transaction?.block.timestamp - a.transaction?.block.timestamp
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

  useGetGravityMessagesByAddressListenerSubscription({
    variables: {
      address: `{${address}}`
    },
    onSubscriptionData: (data: any) => {
      const cudosBridgeTx = data.subscriptionData.data
      setBridgeData(cudosBridgeTx)
    }
  })

  useGetMessagesByAddressDistinctListenerSubscription({
    variables: {
      limit: LIMIT,
      offset: 0,
      address: `{${address}}`
    },
    onSubscriptionData: (data: any) => {
      const transactionArray = data.subscriptionData.data.messagesByAddress
      const bridgeArray = bridgeData!.messagesByAddress
      let mergeTxAndBridgeData: any = []

      if (bridgeData) {
        mergeTxAndBridgeData = {
          messagesByAddress: [...transactionArray, ...bridgeArray]
        }
      }

      const stateChange = {
        data: formatTransactions(
          bridgeData!.messagesByAddress.length > 0
            ? mergeTxAndBridgeData
            : data.subscriptionData.data
        ),
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
