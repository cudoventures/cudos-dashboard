import { cosmos, InstallError } from '@cosmostation/extension-client'
import { CHAIN_DETAILS } from 'utils/constants'
import CosmosNetworkConfig from './CosmosNetworkConfig'

export const connectCosmostationLedger = async (chosenNetwork: string): Promise<{
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
        CHAIN_DETAILS.CHAIN_NAME[chosenNetwork as keyof typeof CHAIN_DETAILS.CHAIN_NAME].toLowerCase()
      )
    ) {
      await provider.addChain({
        chainId: CHAIN_DETAILS.CHAIN_ID[chosenNetwork as keyof typeof CHAIN_DETAILS.CHAIN_ID],

        chainName: CHAIN_DETAILS.CHAIN_NAME[chosenNetwork as keyof typeof CHAIN_DETAILS.CHAIN_NAME],

        addressPrefix: CosmosNetworkConfig.BECH32_PREFIX_ACC_ADDR,

        baseDenom: CosmosNetworkConfig.CURRENCY_DENOM,

        displayDenom: CosmosNetworkConfig.CURRENCY_DISPLAY_NAME,

        restURL: CHAIN_DETAILS.API_ADDRESS[chosenNetwork as keyof typeof CHAIN_DETAILS.API_ADDRESS],

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
      CHAIN_DETAILS.CHAIN_NAME[chosenNetwork as keyof typeof CHAIN_DETAILS.CHAIN_NAME]
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
