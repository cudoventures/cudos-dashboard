import { Box, CircularProgress, Typography } from "@mui/material"
import { Fragment } from "react"
import { useSelector } from "react-redux"
import { RootState } from "store"
import { CHAIN_DETAILS } from "utils/constants"
import { chainIDToAlias } from "utils/generalHelpers"

const NetworkChangingLoading = () => {

    const { chosenNetwork } = useSelector((state: RootState) => state.profile)
    const aliasChainName = chainIDToAlias(CHAIN_DETAILS.CHAIN_ID[chosenNetwork! as keyof typeof CHAIN_DETAILS.CHAIN_ID])

    return (
        <Fragment>
            <Box gap={2} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
                <Typography variant="h5">
                    Connecting to {aliasChainName}...
                </Typography>
            </Box>
        </Fragment>
    )
}

export default NetworkChangingLoading
