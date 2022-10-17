import CosmostationQRCodeModal from './modal'
import WalletConnect from '@walletconnect/client'
import { payloadId } from '@walletconnect/utils'
import { StdSignDoc } from 'cudosjs'

export const connect = async () => {
  var modal = CosmostationQRCodeModal;

  const connector = new WalletConnect({
    bridge: 'https://bridge.walletconnect.org',
    signingMethods: ['cosmostation_wc_accounts_v1', 'cosmostation_wc_sign_tx_v1'],
    qrcodeModal: modal,
  })

  if (connector.connected) {
    await connector.killSession();
  }

  await connector.createSession();
  
  return connector
}

export const getAccountsRequest = (chainIds: string[]) => {
  return {
    id: payloadId(),
    jsonrpc: '2.0',
    method: 'cosmostation_wc_accounts_v1',
    params: chainIds,
  };
}

export const getSignTxRequest = (chainId: string, signer: string, signDoc: StdSignDoc) => {
  return {
    id: payloadId(),
    jsonrpc: '2.0',
    method: 'cosmostation_wc_sign_tx_v1',
    params: [chainId, signer, signDoc],
  };
}

const cosmostationWalletConnect = {
  connect,
  getAccountsRequest,
  getSignTxRequest,
}

export default cosmostationWalletConnect
