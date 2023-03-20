// APP SPECIFIC CHAIN CONFIGURATIONS
export const CHAIN_DETAILS = {
    GAS_PRICE: import.meta.env.VITE_APP_GAS_PRICE || process.env.VITE_APP_GAS_PRICE || "",
    DEFAULT_NETWORK: import.meta.env.VITE_APP_DEFAULT_NETWORK || process.env.VITE_APP_DEFAULT_NETWORK || "",
    CAPTCHA_SITE_KEY: {
        LOCAL: import.meta.env.VITE_APP_LOCAL_CAPTCHA_SITE_KEY || process.env.VITE_APP_LOCAL_CAPTCHA_SITE_KEY || "",
        DEV: import.meta.env.VITE_APP_DEV_CAPTCHA_SITE_KEY || process.env.VITE_APP_DEV_CAPTCHA_SITE_KEY || "",
        PRIVATE: import.meta.env.VITE_APP_PRIVATE_CAPTCHA_SITE_KEY || process.env.VITE_APP_PRIVATE_CAPTCHA_SITE_KEY || "",
        PUBLIC: import.meta.env.VITE_APP_PUBLIC_CAPTCHA_SITE_KEY || process.env.VITE_APP_PUBLIC_CAPTCHA_SITE_KEY || "",
        MAINNET: ''
    },
    FAUCET_URL: {
        LOCAL: import.meta.env.VITE_APP_LOCAL_FAUCET_URL || process.env.VITE_APP_LOCAL_FAUCET_URL || "",
        DEV: import.meta.env.VITE_APP_DEV_FAUCET_URL || process.env.VITE_APP_DEV_FAUCET_URL || "",
        PRIVATE: import.meta.env.VITE_APP_PRIVATE_FAUCET_URL || process.env.VITE_APP_PRIVATE_FAUCET_URL || "",
        PUBLIC: import.meta.env.VITE_APP_PUBLIC_FAUCET_URL || process.env.VITE_APP_PUBLIC_FAUCET_URL || "",
        MAINNET: ''
    },
    FAUCET_ADDRESS: {
        LOCAL: import.meta.env.VITE_APP_LOCAL_FAUCET_ADDRESS || process.env.VITE_APP_LOCAL_FAUCET_ADDRESS || "",
        DEV: import.meta.env.VITE_APP_DEV_FAUCET_ADDRESS || process.env.VITE_APP_DEV_FAUCET_ADDRESS || "",
        PRIVATE: import.meta.env.VITE_APP_PRIVATE_FAUCET_ADDRESS || process.env.VITE_APP_PRIVATE_FAUCET_ADDRESS || "",
        PUBLIC: import.meta.env.VITE_APP_PUBLIC_FAUCET_ADDRESS || process.env.VITE_APP_PUBLIC_FAUCET_ADDRESS || "",
        MAINNET: ''
    },
    BRIDGE_URL: {
        LOCAL: import.meta.env.VITE_APP_LOCAL_BRIDGE_URL || process.env.VITE_APP_LOCAL_BRIDGE_URL || "",
        DEV: import.meta.env.VITE_APP_DEV_BRIDGE_URL || process.env.VITE_APP_DEV_BRIDGE_URL || "",
        PRIVATE: import.meta.env.VITE_APP_PRIVATE_BRIDGE_URL || process.env.VITE_APP_PRIVATE_BRIDGE_URL || "",
        PUBLIC: import.meta.env.VITE_APP_PUBLIC_BRIDGE_URL || process.env.VITE_APP_PUBLIC_BRIDGE_URL || "",
        MAINNET: import.meta.env.VITE_APP_MAINNET_BRIDGE_URL || process.env.VITE_APP_MAINNET_BRIDGE_URL || "",
    },
    GRAPHQL_URL: {
        LOCAL: import.meta.env.VITE_APP_LOCAL_GRAPHQL_URL || process.env.VITE_APP_LOCAL_GRAPHQL_URL || "",
        DEV: import.meta.env.VITE_APP_DEV_GRAPHQL_URL || process.env.VITE_APP_DEV_GRAPHQL_URL || "",
        PRIVATE: import.meta.env.VITE_APP_PRIVATE_GRAPHQL_URL || process.env.VITE_APP_PRIVATE_GRAPHQL_URL || "",
        PUBLIC: import.meta.env.VITE_APP_PUBLIC_GRAPHQL_URL || process.env.VITE_APP_PUBLIC_GRAPHQL_URL || "",
        MAINNET: import.meta.env.VITE_APP_MAINNET_GRAPHQL_URL || process.env.VITE_APP_MAINNET_GRAPHQL_URL || ""
    },
    GRAPHQL_WS: {
        LOCAL: import.meta.env.VITE_APP_LOCAL_GRAPHQL_WS || process.env.VITE_APP_LOCAL_GRAPHQL_WS || "",
        DEV: import.meta.env.VITE_APP_DEV_GRAPHQL_WS || process.env.VITE_APP_DEV_GRAPHQL_WS || "",
        PRIVATE: import.meta.env.VITE_APP_PRIVATE_GRAPHQL_WS || process.env.VITE_APP_PRIVATE_GRAPHQL_WS || "",
        PUBLIC: import.meta.env.VITE_APP_PUBLIC_GRAPHQL_WS || process.env.VITE_APP_PUBLIC_GRAPHQL_WS || "",
        MAINNET: import.meta.env.VITE_APP_MAINNET_GRAPHQL_WS || process.env.VITE_APP_MAINNET_GRAPHQL_WS || ""
    },
    RPC_ADDRESS: {
        LOCAL: import.meta.env.VITE_APP_LOCAL_RPC || process.env.VITE_APP_LOCAL_RPC || "",
        DEV: import.meta.env.VITE_APP_DEV_RPC || process.env.VITE_APP_DEV_RPC || "",
        PRIVATE: import.meta.env.VITE_APP_PRIVATE_RPC || process.env.VITE_APP_PRIVATE_RPC || "",
        PUBLIC: import.meta.env.VITE_APP_PUBLIC_RPC || process.env.VITE_APP_PUBLIC_RPC || "",
        MAINNET: import.meta.env.VITE_APP_MAINNET_RPC || process.env.VITE_APP_MAINNET_RPC || ""
    },
    API_ADDRESS: {
        LOCAL: import.meta.env.VITE_APP_LOCAL_API || process.env.VITE_APP_LOCAL_API || "",
        DEV: import.meta.env.VITE_APP_DEV_API || process.env.VITE_APP_DEV_API || "",
        PRIVATE: import.meta.env.VITE_APP_PRIVATE_API || process.env.VITE_APP_PRIVATE_API || "",
        PUBLIC: import.meta.env.VITE_APP_PUBLIC_API || process.env.VITE_APP_PUBLIC_API || "",
        MAINNET: import.meta.env.VITE_APP_MAINNET_API || process.env.VITE_APP_MAINNET_API || ""
    },
    STAKING_URL: {
        LOCAL: import.meta.env.VITE_APP_LOCAL_STAKING_URL || process.env.VITE_APP_LOCAL_STAKING_URL || "",
        DEV: import.meta.env.VITE_APP_DEV_STAKING_URL || process.env.VITE_APP_DEV_STAKING_URL || "",
        PRIVATE: import.meta.env.VITE_APP_PRIVATE_STAKING_URL || process.env.VITE_APP_PRIVATE_STAKING_URL || "",
        PUBLIC: import.meta.env.VITE_APP_PUBLIC_STAKING_URL || process.env.VITE_APP_PUBLIC_STAKING_URL || "",
        MAINNET: import.meta.env.VITE_APP_MAINNET_STAKING_URL || process.env.VITE_APP_MAINNET_STAKING_URL || ""
    },
    EXPLORER_URL: {
        LOCAL: import.meta.env.VITE_APP_LOCAL_EXPLORER_URL || process.env.VITE_APP_LOCAL_EXPLORER_URL || "",
        DEV: import.meta.env.VITE_APP_DEV_EXPLORER_URL || process.env.VITE_APP_DEV_EXPLORER_URL || "",
        PRIVATE: import.meta.env.VITE_APP_PRIVATE_EXPLORER_URL || process.env.VITE_APP_PRIVATE_EXPLORER_URL || "",
        PUBLIC: import.meta.env.VITE_APP_PUBLIC_EXPLORER_URL || process.env.VITE_APP_PUBLIC_EXPLORER_URL || "",
        MAINNET: import.meta.env.VITE_APP_MAINNET_EXPLORER_URL || process.env.VITE_APP_MAINNET_EXPLORER_URL || ""
    },
    CHAIN_NAME: {
        LOCAL: import.meta.env.VITE_APP_LOCAL_CHAIN_NAME || process.env.VITE_APP_LOCAL_CHAIN_NAME || "",
        DEV: import.meta.env.VITE_APP_DEV_CHAIN_NAME || process.env.VITE_APP_DEV_CHAIN_NAME || "",
        PRIVATE: import.meta.env.VITE_APP_PRIVATE_CHAIN_NAME || process.env.VITE_APP_PRIVATE_CHAIN_NAME || "",
        PUBLIC: import.meta.env.VITE_APP_PUBLIC_CHAIN_NAME || process.env.VITE_APP_PUBLIC_CHAIN_NAME || "",
        MAINNET: import.meta.env.VITE_APP_MAINNET_CHAIN_NAME || process.env.VITE_APP_MAINNET_CHAIN_NAME || ""
    },
    CHAIN_ID: {
        LOCAL: import.meta.env.VITE_APP_LOCAL_CHAIN_ID || process.env.VITE_APP_LOCAL_CHAIN_ID || "",
        DEV: import.meta.env.VITE_APP_DEV_CHAIN_ID || process.env.VITE_APP_DEV_CHAIN_ID || "",
        PRIVATE: import.meta.env.VITE_APP_PRIVATE_CHAIN_ID || process.env.VITE_APP_PRIVATE_CHAIN_ID || "",
        PUBLIC: import.meta.env.VITE_APP_PUBLIC_CHAIN_ID || process.env.VITE_APP_PUBLIC_CHAIN_ID || "",
        MAINNET: import.meta.env.VITE_APP_MAINNET_CHAIN_ID || process.env.VITE_APP_MAINNET_CHAIN_ID || ""
    },
    LOCAL: {
        ALIAS_NAME: 'Local Testnet',
        SHORT_NAMES: ['local']
    },
    DEV: {
        ALIAS_NAME: 'DEV Environment',
        SHORT_NAMES: ['cudos-dev-test-network', 'dev-network']
    },
    PRIVATE: {
        ALIAS_NAME: 'Private Testnet',
        SHORT_NAMES: ['private', 'dev-test']
    },
    PUBLIC: {
        ALIAS_NAME: 'Public Testnet',
        SHORT_NAMES: ['public']
    },
    MAINNET: {
        ALIAS_NAME: 'Main Network',
        SHORT_NAMES: ['mainnet', 'cudos-1']
    }
}

// GENERAL APP CONFIGURATIONS
export const APP_DETAILS = {
    DEPLOYMENT_VERSION: import.meta.env.VITE_APP_DEPLOYMENT_VERSION || process.env.VITE_APP_DEPLOYMENT_VERSION || ""
}

export const SCREEN_RESOLUTIONS = {
    HIGH: 1600,
    MID_LOW: 1300,
    LOW: 1000,
    MID_LOWER: 850,
    LOWER: 750,
    MID_LOWEST: 450,
    LOWEST: 200
}
