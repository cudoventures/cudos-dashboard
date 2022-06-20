import { Box, Typography } from '@mui/material'
import WalletInformation from './WalletInformation/WalletInformation'
import WalletBalance from './WalletBalance/WalletBalance'
import NetworkStatistics from './NetworkStatistics/NetworkStatistics'
import LatestActivity from './LatestActivity/LatestActivity'

import { styles } from './styles'

const Dashboard = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box
        sx={({ custom }) => ({
          background: custom.backgrounds.dark,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          position: 'sticky',
          top: 0,
          overflow: 'hidden',
          zIndex: 4,
          paddingBottom: '0.5rem'
        })}
      >
        <Typography sx={styles.headerStyle}>Dashboard</Typography>
        <Typography
          sx={styles.subheaderStyle}
          variant="subtitle1"
          color="text.secondary"
        >
          Here is your CUDOS Wallet information
        </Typography>
      </Box>
      <Box display="flex" gap={2}>
        <Box flex={5}>
          <Box display="flex" gap={2}>
            <WalletInformation />
            <WalletBalance />
          </Box>
          <Box>
            <LatestActivity />
          </Box>
        </Box>
        <Box flex={2}>
          <NetworkStatistics />
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
