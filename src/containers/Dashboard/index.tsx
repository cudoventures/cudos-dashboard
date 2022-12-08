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
import { useIsScreenLessThan } from 'components/Layout/hooks/useScreenChecks'

import { styles } from './styles'

const Dashboard = () => {
  const theme = useTheme()
  const isBigScreen = useMediaQuery(theme.breakpoints.up('lg'))
  const isVeryBigScreen = useMediaQuery(theme.breakpoints.up('xl'))
  const isScreenWidthLessThan1350px = useIsScreenLessThan('1350px', 'width')

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
          <Grid
            style={{ paddingLeft: '-24px' }}
            justifyContent={isVeryBigScreen ? 'center' : 'initial'}
            spacing={3}
            container
          >
            <Grid
              style={{ paddingLeft: '0px' }}
              item
              xs={12}
              md={12}
              lg={isScreenWidthLessThan1350px ? 12 : 9}
              xl={6}
            >
              <WalletInformation />
              <Grid marginTop="15px" item xs={12} md={12} lg={12} xl={12}>
                <Box>
                  <LatestActivity />
                </Box>
              </Grid>
            </Grid>
            <Grid
              style={{ paddingLeft: isBigScreen ? '15px' : '0px' }}
              item
              xs={12}
              md={12}
              lg={isScreenWidthLessThan1350px ? 12 : 3}
              xl={2}
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
