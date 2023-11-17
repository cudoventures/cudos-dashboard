import { Box, Button, Card, Grid, Typography } from '@mui/material'
import { APP_DETAILS, CHAIN_DETAILS, DAPPS_FROM_ENV } from "utils/constants"
import { AvailableDapps, DappCompleteInfo, KnownDapps } from './types'
import OsmosisLogo from 'assets/vectors/osmosis-dapp-logo.svg?component'
import ExplorerLogo from 'assets/vectors/dipper-dapp-logo.svg?component'
import LinkIcon from 'assets/vectors/link-icon-2.svg?component'
import CudosLogo from 'assets/vectors/cudos-logo-40.svg?component'
import { styles } from './styles'

const getLogo = (key: KnownDapps) => {
    switch (key) {
        case KnownDapps.explorer:
            return <ExplorerLogo />
        case KnownDapps.osmosis:
            return <OsmosisLogo />
        default:
            return <CudosLogo />
    }
}

const buildCudosLogoComponent = (key: KnownDapps, displayName: string): JSX.Element => {
    return (
        <Box sx={styles.logoHolder}>
            {getLogo(key)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                    variant='h4'
                    fontFamily={'sans-serif'}
                    letterSpacing={2}
                >
                    CUDOS
                </Typography>
                <Typography
                    variant='subtitle1'
                    fontFamily={'sans-serif'}
                    fontWeight={900}
                    marginTop={-1.5}
                >
                    {displayName}
                </Typography>
            </Box>
        </Box>
    )
}

const AvailableDappsMapping: AvailableDapps = {
    [KnownDapps.explorer]: {
        icon: getLogo(KnownDapps.explorer),
        description: 'CUDOS Blockchain Explorer',
    },
    [KnownDapps.osmosis]: {
        icon: getLogo(KnownDapps.osmosis),
        description: 'Trade on Osmosis Zone'
    },
    [KnownDapps.allowlist]: {
        icon: buildCudosLogoComponent(KnownDapps.allowlist, "Allowlist"),
        description: 'Create NFT allowlists for any Cosmos chain for free'
    },
    [KnownDapps.bridge]: {
        icon: buildCudosLogoComponent(KnownDapps.bridge, "Bridge"),
        description: 'Transfer tokens between Ethereum and Cudos Network.'
    },
    [KnownDapps.cudovenger]: {
        icon: buildCudosLogoComponent(KnownDapps.cudovenger, "CudoVenger"),
        description: 'CUDOVENGER is an autonomous browser game where the best players win Cudos Tokens.'
    },
    [KnownDapps.multisend]: {
        icon: buildCudosLogoComponent(KnownDapps.multisend, "MultiSend"),
        description: 'MultiSend allows you to batch send tokens to multiple addresses in one transaction.'
    },
    [KnownDapps.multisig]: {
        icon: buildCudosLogoComponent(KnownDapps.multisig, "MultiSig"),
        description: 'MultiSig Wallet is a digital wallet controlled by one or multiple owners.'
    },
    [KnownDapps.tokenminter]: {
        icon: buildCudosLogoComponent(KnownDapps.tokenminter, "TokenMinter"),
        description: 'TokenMinter is the easiest way to deploy CW20 tokens on the CUDOS Network.'
    },
}

const isExplorer = (key: keyof typeof KnownDapps) => {
    return KnownDapps[key] === KnownDapps.explorer
}

const isOsmosis = (key: keyof typeof KnownDapps) => {
    return KnownDapps[key] === KnownDapps.osmosis
}

const explorerDapp = {
    ...AvailableDappsMapping[KnownDapps.explorer],
    link: CHAIN_DETAILS.EXPLORER_URL
}

const osmosisDapp = {
    ...AvailableDappsMapping[KnownDapps.osmosis],
    link: APP_DETAILS.OSMOSIS_URL
}


export const getAvailableDapps = (): DappCompleteInfo[] => {

    const dAppsToDisplay: DappCompleteInfo[] = [explorerDapp]

    if (DAPPS_FROM_ENV) {
        for (const knownDapp in KnownDapps) {
            const dappFoundInEnv = DAPPS_FROM_ENV[knownDapp]
            const typedKey = knownDapp as keyof typeof KnownDapps
            if (
                !!dappFoundInEnv &&
                !isOsmosis(typedKey) &&
                !isExplorer(typedKey)
            ) {
                const newEntry: DappCompleteInfo = {
                    ...AvailableDappsMapping[typedKey],
                    link: dappFoundInEnv.url
                }
                dAppsToDisplay.push(newEntry)
            }
        }
    }

    dAppsToDisplay.push(osmosisDapp)
    return dAppsToDisplay
}

export const GridItem = ({ dapp }: { dapp: DappCompleteInfo }) => {

    const handleLinkOpen = (link: string) => {
        window.open(`${link}`, '_blank')
    }

    return (
        <Grid xl={7} item>
            <Card sx={styles.cardContainer}>
                <Box sx={styles.contentBox}>
                    {dapp.icon}
                    <Typography variant='subtitle2' color="text.secondary" align='center'>
                        {dapp.description}
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleLinkOpen(dapp.link)}
                >
                    <LinkIcon /> Visit App
                </Button>
            </Card>
        </Grid>
    )
}