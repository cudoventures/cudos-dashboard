import { cosmos, InstallError } from '@cosmostation/extension-client'
import WalletConnect from '@walletconnect/client'
import CosmosNetworkConfig from './CosmosNetworkConfig'
import cosmostationWalletConnect from './cosmostation-wallet-connect'

export const connectMobileCosmostation = async (): Promise<{
  address: string
  accountName: string
}> => {

  let userAccountAddress = ''
  let userAccountName = ''

  const connector: WalletConnect = await cosmostationWalletConnect.connect()
  if (connector) {
    try {
      const request = cosmostationWalletConnect.getAccountsRequest([import.meta.env.VITE_APP_CHAIN_ID])
      const accounts = await connector.sendCustomRequest(request)
      const account = accounts[0]
      userAccountAddress = account["bech32Address"]
      userAccountName = account["bech32Address"]
      
    } catch (e) {
      throw new Error(e)
    }

  }


  return { address: userAccountAddress, accountName: userAccountName }
}

export const connectCosmostationLedger = async (): Promise<{
  address: string
  accountName: string
}> => {
  let userAccountAddress = ''

  let userAccountName = ''

  try {
    const provider = await cosmos()

    const activatedChains = await provider.getActivatedChains()

    if (
      !activatedChains.includes(
        import.meta.env.VITE_APP_CHAIN_NAME.toLowerCase()
      )
    ) {
      await provider.addChain({
        chainId: import.meta.env.VITE_APP_CHAIN_ID,

        chainName: import.meta.env.VITE_APP_CHAIN_NAME,

        addressPrefix: CosmosNetworkConfig.BECH32_PREFIX_ACC_ADDR,

        baseDenom: CosmosNetworkConfig.CURRENCY_DENOM,

        displayDenom: CosmosNetworkConfig.CURRENCY_DISPLAY_NAME,

        restURL: import.meta.env.VITE_APP_API,

        decimals: 18,

        coinGeckoId: CosmosNetworkConfig.BECH32_PREFIX_ACC_ADDR,

        gasRate: {
          average: (Number(import.meta.env.VITE_APP_GAS_PRICE) * 2).toString(),

          low: (Number(import.meta.env.VITE_APP_GAS_PRICE) * 2).toString(),

          tiny: import.meta.env.VITE_APP_GAS_PRICE.toString()
        }
      })
    }

    const acccount = await provider.requestAccount(
      import.meta.env.VITE_APP_CHAIN_NAME
    )

    userAccountAddress = acccount.address

    userAccountName = acccount.name
  } catch (e: any) {
    if (e instanceof InstallError) {
      throw new Error('Cosmostation extension not found')
    }

    if (e.code === 4001) {
      throw new Error('user rejected request')
    }
  }

  return { address: userAccountAddress, accountName: userAccountName }
}
