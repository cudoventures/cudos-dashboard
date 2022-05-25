import { Box, Fade } from '@mui/material'
import Details from './components/Details'
import Navigation from './components/Navigation'
import Statistics from './components/Statistics'
import Delegators from './components/Delegators'
import Activity from './components/Activity'

const ValidatorDetails = () => {
  return (
    <Fade in timeout={500}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Navigation />
        <Details />
        <Statistics />
        <Delegators />
        <Activity />
      </Box>
    </Fade>
  )
}

export default ValidatorDetails
