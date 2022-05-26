import { Box, Typography, Slide } from '@mui/material'
import WalletInformation from './WalletInformation/WalletInformation'
import WalletBalance from './WalletBalance/WalletBalance'
import NetworkStatistics from './NetworkStatistics/NetworkStatistics'
import LatestActivity from './LatestActivity/LatestActivity'

import { styles } from './styles'

const Dashboard = () => {
  return (
    <Slide direction="up" in timeout={450}>
      <Box>
        <Box
          position="sticky"
          top={0}
          sx={({ custom }) => ({
            background: custom.backgrounds.dark,
            zIndex: 1,
            paddingBottom: '1rem'
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
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <WalletInformation />
              <WalletBalance />
            </Box>
            <Box>
              <LatestActivity />
            </Box>
          </Box>
          <Box>
            <NetworkStatistics />
          </Box>
        </Box>
      </Box>
    </Slide>
  )
}

export default Dashboard
