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

export const connectKeplrLedger = async () => {
  const wallet = new KeplrWallet({
    CHAIN_ID: CHAIN_DETAILS.CHAIN_ID,
    CHAIN_NAME: CHAIN_DETAILS.CHAIN_NAME,
    RPC: CHAIN_DETAILS.RPC_ADDRESS,
    API: CHAIN_DETAILS.API_ADDRESS,
    STAKING: CHAIN_DETAILS.STAKING_URL,
    GAS_PRICE: CHAIN_DETAILS.GAS_PRICE.toString()
  })

  await wallet.connect()

  const key = await window.keplr.getKey(CHAIN_DETAILS.CHAIN_ID)

  return { address: key.bech32Address, accountName: key.name }
}
