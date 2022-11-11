import { CHAIN_DETAILS } from "./constants"

export const handleAvailableNetworks = (defaultNetwork: string): networkToDisplay[] => {

    if (CHAIN_DETAILS.LOCAL.SHORT_NAMES.includes(defaultNetwork.toLowerCase())) {
        return [CHAIN_DETAILS.LOCAL]
    }

    if (CHAIN_DETAILS.PRIVATE.SHORT_NAMES.includes(defaultNetwork.toLowerCase())) {
        return [CHAIN_DETAILS.PRIVATE]
    }

    return [CHAIN_DETAILS.PUBLIC, CHAIN_DETAILS.MAINNET]
}

export const chainIDToAlias = (chainID: string): string => {

    const ID = chainID ? chainID.toLowerCase() : ''

    if (CHAIN_DETAILS.LOCAL.SHORT_NAMES.some(shortName => ID.includes(shortName))) {
        return CHAIN_DETAILS.LOCAL.ALIAS_NAME
    }

    if (CHAIN_DETAILS.PRIVATE.SHORT_NAMES.some(shortName => ID.includes(shortName))) {
        return CHAIN_DETAILS.PRIVATE.ALIAS_NAME
    }

    if (CHAIN_DETAILS.PUBLIC.SHORT_NAMES.some(shortName => ID.includes(shortName))) {
        return CHAIN_DETAILS.PUBLIC.ALIAS_NAME
    }

    if (CHAIN_DETAILS.MAINNET.SHORT_NAMES.some(shortName => ID.includes(shortName))) {
        return CHAIN_DETAILS.MAINNET.ALIAS_NAME
    }

    return "Unidentified Network"
}
