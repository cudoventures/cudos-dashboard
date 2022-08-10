/* eslint-disable import/prefer-default-export */

declare global {
  interface Window {
    keplr: any
    getOfflineSigner: any
    getOfflineSignerOnlyAmino: any
    meta: any
  }
}

export const ConnectLedger = async () => {
  const config = {
    rpc: import.meta.env.VITE_APP_RPC,
    rest: import.meta.env.VITE_APP_API,
    chainName: import.meta.env.VITE_APP_CHAIN_NAME,
    chainId: import.meta.env.VITE_APP_CHAIN_ID,
    currencies: [
      {
        coinDenom: 'CUDOS',
        coinMinimalDenom: 'acudos',
        coinDecimals: 18,
        coinGeckoId: 'cudos'
      }
    ],
    stakeCurrency: {
      coinDenom: 'CUDOS',
      coinMinimalDenom: 'acudos',
      coinDecimals: 18,
      coinGeckoId: 'cudos'
    },
    walletUrlForStaking: import.meta.env.VITE_APP_STAKING_URL,
    feeCurrencies: [
      {
        coinDenom: 'CUDOS',
        coinMinimalDenom: 'acudos',
        coinDecimals: 18,
        coinGeckoId: 'cudos'
      }
    ],
    bip44: { coinType: 118 },
    bech32Config: {
      bech32PrefixAccAddr: 'cudos',
      bech32PrefixAccPub: 'cudospub',
      bech32PrefixValAddr: 'cudosvaloper',
      bech32PrefixValPub: 'cudosvaloperpub',
      bech32PrefixConsAddr: 'cudosvalcons',
      bech32PrefixConsPub: 'cudosvalconspub'
    },
    coinType: 118,
    gasPriceStep: {
      low: 5000000000000,
      average: 5000000000000 * 2,
      high: 5000000000000 * 4
    },
    features: ['ibc-transfer']
  }

  await window.keplr.experimentalSuggestChain(config)
  const offlineSigner = await window.getOfflineSignerOnlyAmino(config.chainId)
  const { name } = await window.keplr.getKey(config.chainId)

  const accounts = await offlineSigner.getAccounts()

  const { address } = accounts[0]

  return { address, keplrName: name }
}
