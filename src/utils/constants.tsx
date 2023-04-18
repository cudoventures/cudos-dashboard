// APP SPECIFIC CHAIN CONFIGURATIONS
export const CHAIN_DETAILS = {
    GAS_PRICE: import.meta.env.VITE_APP_GAS_PRICE || process.env.VITE_APP_GAS_PRICE || "",
    CAPTCHA_SITE_KEY: import.meta.env.VITE_APP_CAPTCHA_SITE_KEY || process.env.VITE_APP_CAPTCHA_SITE_KEY || "",
    FAUCET_URL: import.meta.env.VITE_APP_FAUCET_URL || process.env.VITE_APP_FAUCET_URL || "",
    FAUCET_ADDRESS: import.meta.env.VITE_APP_FAUCET_ADDRESS || process.env.VITE_APP_FAUCET_ADDRESS || "",
    BRIDGE_URL: import.meta.env.VITE_APP_BRIDGE_URL || process.env.VITE_APP_BRIDGE_URL || "",
    GRAPHQL_URL: import.meta.env.VITE_APP_GRAPHQL_URL || process.env.VITE_APP_GRAPHQL_URL || "",
    GRAPHQL_WS: import.meta.env.VITE_APP_GRAPHQL_WS || process.env.VITE_APP_GRAPHQL_WS || "",
    RPC_ADDRESS: import.meta.env.VITE_APP_RPC || process.env.VITE_APP_RPC || "",
    API_ADDRESS: import.meta.env.VITE_APP_API || process.env.VITE_APP_API || "",
    STAKING_URL: import.meta.env.VITE_APP_STAKING_URL || process.env.VITE_APP_STAKING_URL || "",
    EXPLORER_URL: import.meta.env.VITE_APP_EXPLORER_URL || process.env.VITE_APP_EXPLORER_URL || "",
    CHAIN_NAME: import.meta.env.VITE_APP_CHAIN_NAME || process.env.VITE_APP_CHAIN_NAME || "",
    CHAIN_ID: import.meta.env.VITE_APP_CHAIN_ID || process.env.VITE_APP_CHAIN_ID || ""
}

// GENERAL APP CONFIGURATIONS
export const APP_DETAILS = {
    DEPLOYMENT_VERSION: import.meta.env.VITE_APP_DEPLOYMENT_VERSION || process.env.VITE_APP_DEPLOYMENT_VERSION || "",
    NODE_ENV: import.meta.env.VITE_APP_NODE_ENV || process.env.VITE_APP_NODE_ENV || "",
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
