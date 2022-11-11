import { KeplrWallet } from 'cudosjs'
import { CHAIN_DETAILS } from 'utils/constants'

declare global {
  interface Window {
    keplr: any
    cosmostation: any
    getOfflineSigner: any
    getOfflineSignerOnlyAmino: any
    getOfflineSignerAuto: any
    meta: any
  }
}

export const connectKeplrLedger = async (chosenNetwork: string) => {
  const wallet = new KeplrWallet({
    CHAIN_ID: CHAIN_DETAILS.CHAIN_ID[chosenNetwork as keyof typeof CHAIN_DETAILS.CHAIN_ID],
    CHAIN_NAME: CHAIN_DETAILS.CHAIN_NAME[chosenNetwork as keyof typeof CHAIN_DETAILS.CHAIN_NAME],
    RPC: CHAIN_DETAILS.RPC_ADDRESS[chosenNetwork as keyof typeof CHAIN_DETAILS.RPC_ADDRESS],
    API: CHAIN_DETAILS.API_ADDRESS[chosenNetwork as keyof typeof CHAIN_DETAILS.API_ADDRESS],
    STAKING: CHAIN_DETAILS.STAKING_URL[chosenNetwork as keyof typeof CHAIN_DETAILS.API_ADDRESS],
    GAS_PRICE: import.meta.env.VITE_APP_GAS_PRICE
  })

  await wallet.connect()

  const key = await window.keplr.getKey(CHAIN_DETAILS.CHAIN_ID[chosenNetwork as keyof typeof CHAIN_DETAILS.CHAIN_ID])

  return { address: key.bech32Address, accountName: key.name }
}
