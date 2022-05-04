import { Box, Typography } from '@mui/material'
import WalletInformation from './WalletInformation/WalletInformation'
import WalletBalance from './WalletBalance/WalletBalance'
import NetworkStatistics from './NetworkStatistics/NetworkStatistics'
import LatestActivity from './LatestActivity/LatestActivity'

import { styles } from './styles'

const Dashboard = () => {
  return (
    <>
      <Box style={styles.stickyHeader}>
        <Typography style={styles.headerStyle}>Dashboard</Typography>
        <Typography
          style={styles.subheaderStyle}
          variant="subtitle1"
          color="text.secondary"
        >
          Here is your CUDOS Wallet information
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', marginTop: '90px' }}>
        <Box sx={{ width: '75%' }}>
          <Box sx={{ display: 'flex' }}>
            <WalletInformation />
            <WalletBalance />
          </Box>
          <Box sx={{ maxWidth: '100%', marginRight: '20px' }}>
            <LatestActivity />
          </Box>
        </Box>
        <Box sx={{ width: '30%' }}>
          <NetworkStatistics />
        </Box>
      </Box>
    </>
  )
}

export default Dashboard
