import { cosmos, InstallError } from '@cosmostation/extension-client'
import CosmosNetworkConfig from './CosmosNetworkConfig'

export const connectCosmostationLedger = async (): Promise<{
  address: string
  accountName: string
  isLedger: boolean
}> => {
  let userAccountAddress = ''

  let userAccountName = ''

  const isLedger = false

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

    const getAccount = await provider.requestAccount(
      import.meta.env.VITE_APP_CHAIN_NAME
    )

    userAccountAddress = getAccount.address

    userAccountName = getAccount.name
  } catch (e: any) {
    if (e instanceof InstallError) {
      throw new Error('Cosmostation extension not found')
    }

    if (e.code === 4001) {
      throw new Error('user rejected request')
    }
  }

  return {
    address: userAccountAddress,
    accountName: userAccountName,
    isLedger
  }
}
