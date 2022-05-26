import { Box, Typography, Fade } from '@mui/material'
import WalletInformation from './WalletInformation/WalletInformation'
import WalletBalance from './WalletBalance/WalletBalance'
import NetworkStatistics from './NetworkStatistics/NetworkStatistics'
import LatestActivity from './LatestActivity/LatestActivity'

import { styles } from './styles'

const Dashboard = () => {
  return (
    <Fade in timeout={500}>
      <Box
        sx={{
          height: '100%',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
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
        <Box
          sx={{
            display: 'flex',
            gap: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <Box sx={{ display: 'flex', gap: 2, overflow: 'hidden' }}>
              <WalletInformation />
              <WalletBalance />
            </Box>
            <Box
              sx={{
                justifySelf: 'flex-end',
                flexGrow: 0
              }}
            >
              <LatestActivity />
            </Box>
          </Box>
          <Box>
            <NetworkStatistics />
          </Box>
        </Box>
      </Box>
    </Fade>
  )
}

export default Dashboard
