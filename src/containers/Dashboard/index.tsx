import {
  Box,
  Container,
  Fade,
  Grid,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import WalletInformation from './WalletInformation'
import NetworkStatistics from './NetworkStatistics/NetworkStatistics'
import LatestActivity from './LatestActivity/LatestActivity'

import { styles } from './styles'

const Dashboard = () => {
  const theme = useTheme()
  const isBigScreen = useMediaQuery(theme.breakpoints.up('xl'))

  return (
    <Fade in timeout={500}>
      <Box>
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
        <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
          <Grid spacing={2} container>
            <Grid
              style={{ paddingLeft: '0px' }}
              item
              xs={12}
              md={12}
              lg={12}
              xl={9}
            >
              <WalletInformation />
              <Grid marginTop="15px" item xs={12} md={12} lg={12}>
                <Box sx={{ height: '430px' }}>
                  <LatestActivity />
                </Box>
              </Grid>
            </Grid>
            <Grid
              style={{ paddingLeft: isBigScreen ? '15px' : '0px' }}
              item
              xs={12}
              md={12}
              lg={12}
              xl={3}
            >
              <NetworkStatistics />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fade>
  )
}

export default Dashboard
