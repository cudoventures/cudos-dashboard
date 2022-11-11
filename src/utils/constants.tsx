// CONFIGURATIONS
export const CHAIN_DETAILS = {
    DEFAULT_NETWORK: import.meta.env.VITE_APP_DEFAULT_NETWORK || process.env.VITE_APP_DEFAULT_NETWORK || "",
    BRIDGE_URL: {
        LOCAL: import.meta.env.VITE_APP_LOCAL_BRIDGE_URL || process.env.VITE_APP_LOCAL_BRIDGE_URL || "",
        PRIVATE: import.meta.env.VITE_APP_PRIVATE_BRIDGE_URL || process.env.VITE_APP_PRIVATE_BRIDGE_URL || "",
        PUBLIC: import.meta.env.VITE_APP_PUBLIC_BRIDGE_URL || process.env.VITE_APP_PUBLIC_BRIDGE_URL || "",
        MAINNET: import.meta.env.VITE_APP_MAINNET_BRIDGE_URL || process.env.VITE_APP_MAINNET_BRIDGE_URL || "",
    },
    GRAPHQL_URL: {
        LOCAL: import.meta.env.VITE_APP_LOCAL_GRAPHQL_URL || process.env.VITE_APP_LOCAL_GRAPHQL_URL || "",
        PRIVATE: import.meta.env.VITE_APP_PRIVATE_GRAPHQL_URL  || process.env.VITE_APP_PRIVATE_GRAPHQL_URL  || "",
        PUBLIC: import.meta.env.VITE_APP_PUBLIC_GRAPHQL_URL  || process.env.VITE_APP_PUBLIC_GRAPHQL_URL  || "",
        MAINNET: import.meta.env.VITE_APP_MAINNET_GRAPHQL_URL  || process.env.VITE_APP_MAINNET_GRAPHQL_URL  || ""
    },
    GRAPHQL_WS: {
        LOCAL: import.meta.env.VITE_APP_LOCAL_GRAPHQL_WS || process.env.VITE_APP_LOCAL_GRAPHQL_WS || "",
        PRIVATE: import.meta.env.VITE_APP_PRIVATE_GRAPHQL_WS  || process.env.VITE_APP_PRIVATE_GRAPHQL_WS  || "",
        PUBLIC: import.meta.env.VITE_APP_PUBLIC_GRAPHQL_WS  || process.env.VITE_APP_PUBLIC_GRAPHQL_WS  || "",
        MAINNET: import.meta.env.VITE_APP_MAINNET_GRAPHQL_WS || process.env.VITE_APP_MAINNET_GRAPHQL_WS  || ""
    },
    RPC_ADDRESS: {
        LOCAL: import.meta.env.VITE_APP_LOCAL_RPC || process.env.VITE_APP_LOCAL_RPC || "",
        PRIVATE: import.meta.env.VITE_APP_PRIVATE_RPC || process.env.VITE_APP_PRIVATE_RPC || "",
        PUBLIC: import.meta.env.VITE_APP_PUBLIC_RPC || process.env.VITE_APP_PUBLIC_RPC || "",
        MAINNET: import.meta.env.VITE_APP_MAINNET_RPC || process.env.VITE_APP_MAINNET_RPC || ""
    },
    API_ADDRESS: {
        LOCAL: import.meta.env.VITE_APP_LOCAL_API || process.env.VITE_APP_LOCAL_API || "",
        PRIVATE: import.meta.env.VITE_APP_PRIVATE_API || process.env.VITE_APP_PRIVATE_API || "",
        PUBLIC: import.meta.env.VITE_APP_PUBLIC_API || process.env.VITE_APP_PUBLIC_API || "",
        MAINNET: import.meta.env.VITE_APP_MAINNET_API || process.env.VITE_APP_MAINNET_API || ""
    },
    STAKING_URL: {
        LOCAL: import.meta.env.VITE_APP_LOCAL_STAKING_URL || process.env.VITE_APP_LOCAL_STAKING_URL || "",
        PRIVATE: import.meta.env.VITE_APP_PRIVATE_STAKING_URL || process.env.VITE_APP_PRIVATE_STAKING_URL || "",
        PUBLIC: import.meta.env.VITE_APP_PUBLIC_STAKING_URL || process.env.VITE_APP_PUBLIC_STAKING_URL || "",
        MAINNET: import.meta.env.VITE_APP_MAINNET_STAKING_URL || process.env.VITE_APP_MAINNET_STAKING_URL || ""
    },
    EXPLORER_URL: {
        LOCAL: import.meta.env.VITE_APP_LOCAL_EXPLORER_URL || process.env.VITE_APP_LOCAL_EXPLORER_URL || "",
        PRIVATE: import.meta.env.VITE_APP_PRIVATE_EXPLORER_URL || process.env.VITE_APP_PRIVATE_EXPLORER_URL || "",
        PUBLIC: import.meta.env.VITE_APP_PUBLIC_EXPLORER_URL || process.env.VITE_APP_PUBLIC_EXPLORER_URL || "",
        MAINNET: import.meta.env.VITE_APP_MAINNET_EXPLORER_URL || process.env.VITE_APP_MAINNET_EXPLORER_URL || ""
    },
    CHAIN_NAME: {
        LOCAL: import.meta.env.VITE_APP_LOCAL_CHAIN_NAME || process.env.VITE_APP_LOCAL_CHAIN_NAME || "",
        PRIVATE: import.meta.env.VITE_APP_PRIVATE_CHAIN_NAME || process.env.VITE_APP_PRIVATE_CHAIN_NAME || "",
        PUBLIC: import.meta.env.VITE_APP_PUBLIC_CHAIN_NAME || process.env.VITE_APP_PUBLIC_CHAIN_NAME || "",
        MAINNET: import.meta.env.VITE_APP_MAINNET_CHAIN_NAME || process.env.VITE_APP_MAINNET_CHAIN_NAME || ""
    },
    CHAIN_ID: {
        LOCAL: import.meta.env.VITE_APP_LOCAL_CHAIN_ID || process.env.VITE_APP_LOCAL_CHAIN_ID || "",
        PRIVATE: import.meta.env.VITE_APP_PRIVATE_CHAIN_ID || process.env.VITE_APP_PRIVATE_CHAIN_ID || "",
        PUBLIC: import.meta.env.VITE_APP_PUBLIC_CHAIN_ID || process.env.VITE_APP_PUBLIC_CHAIN_ID || "",
        MAINNET: import.meta.env.VITE_APP_MAINNET_CHAIN_ID || process.env.VITE_APP_MAINNET_CHAIN_ID || ""
    },
    LOCAL: {
        ALIAS_NAME: 'Local Testnet',
        SHORT_NAMES: ['local']
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
