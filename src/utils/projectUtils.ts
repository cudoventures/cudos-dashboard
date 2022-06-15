/* eslint-disable import/prefer-default-export */
import copy from 'copy-to-clipboard'
import { StargateClient } from 'cudosjs'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import CosmosNetworkConfig from '../ledgers/CosmosNetworkConfig'

export const copyToClipboard = (value: string): void => {
  copy(value)
}

export const formatAddress = (text: string, sliceIndex: number): string => {
  if (!text) {
    return ''
  }
  const len = text.length
  if (text === null || text.length < 10) {
    return text
  }
  return `${text.slice(0, sliceIndex)}...${text.slice(len - 4, len)}`
}

export const getWalletBalance = async (address: string) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const broadcaster = await StargateClient.connect(
    import.meta.env.VITE_APP_RPC!
  )

  const updateWalletBalance = await broadcaster.getBalance(
    address,
    CosmosNetworkConfig.CURRENCY_DENOM
  )

  return new BigNumber(updateWalletBalance.amount)
    .dividedBy(CosmosNetworkConfig.CURRENCY_1_CUDO)
    .toString(10)
}

export const getStakedBalance = async (address: string) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const broadcaster = await StargateClient.connect(
    import.meta.env.VITE_APP_RPC!
  )

  const updateWalletBalance = await broadcaster.getBalanceStaked(address)

  if (updateWalletBalance === null) {
    return new BigNumber(0)
  }

  return new BigNumber(updateWalletBalance.amount)
    .dividedBy(CosmosNetworkConfig.CURRENCY_1_CUDO)
    .toString(10)
}

export const formatBigNum = (number: BigNumber): string => {
  return new BigNumber(number)
    .dividedBy(CosmosNetworkConfig.CURRENCY_1_CUDO)
    .toString(10)
}

export const formatDateTime = (dateTimeString: string): string => {
  const localTimeString = moment.utc(dateTimeString).toDate().toLocaleString()
  const formattedTime = moment(localTimeString).format('DD MMM, YYYY, LTS')
  return formattedTime
}
