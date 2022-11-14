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

    const activatedChains = await provider.getActivatedChainIds()

    if (
      !activatedChains.includes(
        CHAIN_DETAILS.CHAIN_ID[chosenNetwork as keyof typeof CHAIN_DETAILS.CHAIN_ID].toLowerCase()
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
          average: (Number(CHAIN_DETAILS.GAS_PRICE) * 2).toString(),

          low: (Number(CHAIN_DETAILS.GAS_PRICE) * 2).toString(),

          tiny: CHAIN_DETAILS.GAS_PRICE.toString()
        }
      })
    }

    // Although the method asks for CHAIN_NAME, it should receive CHAIN_ID as parameter if getActivatedChainIds is used above!
    const acccount = await provider.requestAccount(
      CHAIN_DETAILS.CHAIN_ID[chosenNetwork as keyof typeof CHAIN_DETAILS.CHAIN_ID]
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
