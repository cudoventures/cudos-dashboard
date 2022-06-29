import { Box, Fade } from '@mui/material'
import Navigation from './components/Navigation'

import VotingModal from '../components/VotingModal'
import DepositModal from '../components/DepositModal'
import ProposalInformation from './components/ProposalInformation'

const ProposalDetails = () => {
  return (
    <>
      <Fade in timeout={500}>
        <Box>
          <Navigation />
          <ProposalInformation />
        </Box>
      </Fade>
      <VotingModal />
      <DepositModal />
    </>
  )
}

export default ProposalDetails
