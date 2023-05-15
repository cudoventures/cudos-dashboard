import { Box, CircularProgress, Typography } from "@mui/material"
import { Fragment } from "react"
import { CHAIN_DETAILS } from "utils/constants"
import { getChainPrettyName } from "utils/projectUtils"

const NetworkChangingLoading = () => {

    const aliasChainName = getChainPrettyName(CHAIN_DETAILS.CHAIN_ID)

    return (
        <Fragment>
            <Box gap={2} sx={{ height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
                <Typography variant="h5">
                    Connecting to {aliasChainName}...
                </Typography>
            </Box>
        </Fragment>
    )
}

export default NetworkChangingLoading
