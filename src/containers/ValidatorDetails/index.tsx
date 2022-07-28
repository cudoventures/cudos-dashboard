import { Box, CircularProgress, Fade } from '@mui/material'
import Details from './components/Details'
import Navigation from './components/Navigation'
import Statistics from './components/Statistics'
import Delegators from './components/Delegators'
import Activity from './components/Activity'
import { useValidatorDetails } from './components/Details/hooks'

const ValidatorDetails = () => {
  const { state } = useValidatorDetails()

  return (
    <Fade in timeout={500}>
      <Box display="flex" flexDirection="column" gap={2} maxWidth="1320px">
        <Navigation />
        {!state.loading ? (
          <>
            <Details />
            <Statistics />
            <Delegators />
            <Activity />
          </>
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
