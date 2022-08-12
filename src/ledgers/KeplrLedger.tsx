import { KeplrWallet } from 'cudosjs'

declare global {
  interface Window {
    keplr: any
    getOfflineSigner: any
    getOfflineSignerOnlyAmino: any
    meta: any
  }
}

export const ConnectLedger = async () => {
  const wallet = new KeplrWallet({
    CHAIN_ID: import.meta.env.VITE_APP_CHAIN_ID,
    CHAIN_NAME: import.meta.env.VITE_APP_CHAIN_NAME,
    RPC: import.meta.env.VITE_APP_RPC,
    API: import.meta.env.VITE_APP_API,
    STAKING: import.meta.env.VITE_APP_STAKING_URL,
    GAS_PRICE: import.meta.env.VITE_APP_GAS_PRICE
  })

  await wallet.connect()

  const key = await window.keplr.getKey(import.meta.env.VITE_APP_CHAIN_ID)

  return { address: key.bech32Address, keplrName: key.name }
}
