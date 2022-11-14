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
