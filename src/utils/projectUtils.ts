import copy from 'copy-to-clipboard'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import { bech32 } from 'bech32'
import CosmosNetworkConfig from '../ledgers/CosmosNetworkConfig'
import { getQueryClient } from 'ledgers/utils'

export const isValidCudosAddress = (address: string) => {
  if (address === '' || address === undefined) {
    return false
  }

  try {
    const { prefix: decodedPrefix } = bech32.decode(address)
    return decodedPrefix === 'cudos'
  } catch {
    // invalid checksum
    return false
  }
}

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

export const getWalletBalance = async (chosenNetwork: string, address: string) => {
  const queryClient = await getQueryClient(chosenNetwork)
  const updateWalletBalance = await queryClient.getBalance(address, CosmosNetworkConfig.CURRENCY_DENOM)

  return new BigNumber(updateWalletBalance.amount)
    .dividedBy(CosmosNetworkConfig.CURRENCY_1_CUDO)
    .toString(10)
}

export const getStakedBalance = async (chosenNetwork: string, address: string) => {
  const queryClient = await getQueryClient(chosenNetwork)
  const updateWalletBalance = await queryClient.getBalanceStaked(address)

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
  const localTimeString = moment(
    new Date(moment(dateTimeString).parseZone().toLocaleString())
  )
  const formattedTime = moment(localTimeString)
    .format('DD MMM YYYY LTS')
    .toLocaleString()
  return formattedTime
}

export const addEndingEllipsis = (
  input: string,
  options: { begining: number }
) => {
  const { begining } = options ?? {}
  if (begining !== 0) {
    return `${input.substring(0, begining)}...`
  }
  return input
}
