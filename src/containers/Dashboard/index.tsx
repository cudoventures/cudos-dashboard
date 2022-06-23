import { Box, Fade, Typography } from '@mui/material'
import WalletInformation from './WalletInformation'
import NetworkStatistics from './NetworkStatistics/NetworkStatistics'
import LatestActivity from './LatestActivity/LatestActivity'

import { styles } from './styles'

const Dashboard = () => {
  return (
    <Fade in timeout={500}>
      <Box sx={styles.dashboardContainer}>
        <Box sx={styles.dashboardHeaderContainer}>
          <Typography sx={styles.headerStyle}>Dashboard</Typography>
          <Typography
            sx={styles.subheaderStyle}
            variant="subtitle1"
            color="text.secondary"
          >
            Here is your CUDOS Wallet information
          </Typography>
        </Box>
        <Box sx={styles.dashboardContentContainer}>
          <Box sx={styles.dashboardLeftContent}>
            <WalletInformation />
            <LatestActivity />
          </Box>
          <NetworkStatistics />
        </Box>
      </Box>
    </Fade>
  )
}

export default Dashboard
