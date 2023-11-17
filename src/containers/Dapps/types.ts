export enum KnownDapps {
    explorer = 'explorer',
    osmosis = 'osmosis',
    multisend = 'multisend',
    multisig = 'multisig',
    bridge = 'bridge',
    tokenminter = 'tokenminter',
    allowlist = 'allowlist',
    cudovenger = 'cudovenger'
}

export interface DappPartialInfo {
    icon: JSX.Element,
    description: string,
}

export interface DappCompleteInfo extends DappPartialInfo {
    link: string
}

export type DappsFromEnv = { [key: string]: { url: string } }

export type AvailableDapps = { [value in KnownDapps]: DappPartialInfo }
