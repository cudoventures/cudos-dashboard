import { Box, Slide } from '@mui/material'
import Details from './components/Details'
import Navigation from './components/Navigation'
import Statistics from './components/Statistics'
import Delegators from './components/Delegators'
import Activity from './components/Activity'

const ValidatorDetails = () => {
  return (
    <Slide direction="up" in timeout={450}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Navigation />
        <Details />
        <Statistics />
        <Delegators />
        <Activity />
      </Box>
    </Slide>
  )
}

export default ValidatorDetails
