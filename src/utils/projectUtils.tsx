import copy from 'copy-to-clipboard'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import { bech32 } from 'bech32'
import CosmosNetworkConfig from '../ledgers/CosmosNetworkConfig'
import { getQueryClient, switchLedgerType } from 'ledgers/utils'
import { fetchRewards } from 'api/getRewards'
import { fetchDelegations } from 'api/getAccountDelegations'
import { fetchRedelegations } from 'api/getAccountRedelegations'
import { fetchUndedelegations } from 'api/getAccountUndelegations'
import { getUnbondingBalance } from 'api/getUnbondingBalance'
import CosmostationLogo from 'assets/vectors/cosmostation-logo.svg'
import KeplrLogo from 'assets/vectors/keplr-logo.svg'
import { styles } from 'containers/ConnectWallet/styles'
import { SUPPORTED_WALLET } from 'cudosjs'

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

export const getWalletBalance = async (address: string) => {
  const queryClient = await getQueryClient()
  const updateWalletBalance = await queryClient.getBalance(address, CosmosNetworkConfig.CURRENCY_DENOM)

  return new BigNumber(updateWalletBalance.amount)
    .dividedBy(CosmosNetworkConfig.CURRENCY_1_CUDO)
    .toString(10)
}

export const getStakedBalance = async (address: string) => {
  const queryClient = await getQueryClient()
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

export const connectUser = async (walletName: SUPPORTED_WALLET): Promise<any> => {

  try {

    const { address, accountName } = await switchLedgerType(walletName)
    const balance = await getWalletBalance(address!)
    const stakedAmountBalance = await getStakedBalance(address!)
    const { totalRewards, validatorArray } = await fetchRewards(address!)
    const { delegationsArray } = await fetchDelegations(address)
    const { redelegationsArray } = await fetchRedelegations(address)
    const { undelegationsArray } = await fetchUndedelegations(address)
    const { unbondingBalance } = await getUnbondingBalance(address)

    const connectedUser = {
      address,
      lastLoggedAddress: address,
      connectedLedger: walletName,
      accountName,
      balance: new BigNumber(balance),
      availableRewards: new BigNumber(totalRewards),
      stakedValidators: validatorArray,
      stakedBalance: new BigNumber(stakedAmountBalance),
      unbondingBalance: new BigNumber(unbondingBalance),
      delegations: delegationsArray,
      redelegations: redelegationsArray,
      undelegations: undelegationsArray,
    }

    return connectedUser

  } catch (error) {
    console.error(error.message)
  }

}

export const getChainPrettyName = (chainId: string): string => {
  switch (chainId) {
    case 'cudos-testnet-private-3':
      return 'Private Testnet'

    case 'cudos-testnet-public-3':
      return 'Public Testnet'

    case 'cudos-1':
      return 'Main Network'

    default: return chainId
  }
}

export const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const SUPPORTED_WALLET_LOGOS = {
  [SUPPORTED_WALLET.Keplr]: <img style={styles.keplrLogo} src={KeplrLogo} alt="Keplr Logo" />,
  [SUPPORTED_WALLET.Cosmostation]: <img style={styles.cosmostationLogo} src={CosmostationLogo} alt="Cosmostation Logo" />
}
