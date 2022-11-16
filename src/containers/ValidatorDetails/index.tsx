import { Box, CircularProgress, Fade, Grid } from '@mui/material'
import Details from './components/Details'
import Navigation from './components/Navigation'
import Statistics from './components/Statistics'
import Delegators from './components/Delegators'
import Activity from './components/Activity'
import { useValidatorDetails } from './components/Details/hooks'
import MyDelegations from './components/MyDelegations'

const ValidatorDetails = () => {
  const { state } = useValidatorDetails()

  return (
    <Fade in timeout={500}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Navigation />
        {!state.loading ? (
          <Grid gap={2} display="flex" alignSelf="center" xl={8} container>
            <Grid width="100%" xl={12} lg={12} item>
              <Details />
            </Grid>
            <Grid xl={12} lg={12} md={12} item>
              <Statistics />
            </Grid>
            <Grid xl={12} lg={12} md={12} item>
              <MyDelegations />
            </Grid>
            <Grid xl={12} lg={12} item>
              <Delegators />
            </Grid>
            <Grid xl={12} lg={12} item>
              <Activity />
            </Grid>
          </Grid>
        ) : (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <CircularProgress size={80} />
          </Box>
        )}
      </Box>
    </Fade>
  )
}

export default ValidatorDetails
