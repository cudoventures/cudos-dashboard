import { Box, Fade, Typography } from '@mui/material'
import { useRef } from 'react'
import WalletInformation from './WalletInformation'
import NetworkStatistics from './NetworkStatistics/NetworkStatistics'
import LatestActivity from './LatestActivity/LatestActivity'

import { styles } from './styles'

const Dashboard = () => {
  const ref = useRef<HTMLElement | null>(null)

  return (
    <Fade in timeout={500}>
      <Box sx={styles.dashboardContainer}>
        <Box ref={ref} sx={styles.dashboardHeaderContainer}>
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
