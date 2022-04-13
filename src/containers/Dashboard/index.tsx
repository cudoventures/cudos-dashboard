import { Box, Grid, Typography } from '@mui/material'
import WalletInformation from './WalletInformation'
import WalletBalance from './WalletBalance'
import NetworkStatistics from './NetworkStatistics'
import LatestActivity from './LatestActivity'

import { styles } from './styles'

const Dashboard = () => {
  return (
    <>
      <Box>
        <Typography style={styles.headerStyle}>Dashboard</Typography>
        <Typography
          style={styles.subheaderStyle}
          variant="subtitle1"
          color="text.secondary"
          sx={{ marginBottom: '20px' }}
        >
          Here is your CUDOS Wallet information
        </Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box>
          <Box sx={{ display: 'flex' }}>
            <WalletInformation />
            <WalletBalance />
          </Box>
          {/* <Grid item md={4} xs={4}>
            <NetworkStatistics />
          </Grid> */}
          <Box>
            <LatestActivity />
          </Box>
        </Box>
        <Box>
          <Box>
            <Box>
              <NetworkStatistics />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Dashboard
