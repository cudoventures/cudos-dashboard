import {
  Box,
  Typography,
  Fade,
  Grid
} from '@mui/material'

import { styles } from './styles'
import { getChainPrettyName } from 'utils/projectUtils'
import { CHAIN_DETAILS } from 'utils/constants'
import { GridItem, getAvailableDapps } from './helpers'

const Dapps = () => {

  const aliasChainName = getChainPrettyName(CHAIN_DETAILS.CHAIN_ID)

  return (
    <Fade in timeout={500}>
      <Box paddingRight='2rem' display="flex" flexDirection="column" gap={2} height="100%">
        <Box sx={styles.stickyHeader}>
          <Typography sx={styles.headerStyle}>Cudos dApps</Typography>
          <Typography
            sx={styles.subheaderStyle}
            variant="subtitle1"
            color="text.secondary"
          >
            Here you can see all Cudos dApps deployed on {aliasChainName}
          </Typography>
        </Box>
        <Grid spacing={2.5} container sx={styles.dappsGrid}>
          {getAvailableDapps().map((item, idx) => {
            return <GridItem key={idx + item.link} dapp={item} />
          })}
        </Grid>
      </Box>
    </Fade >
  )
}

export default Dapps
