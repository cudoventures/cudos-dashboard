import { Box, CircularProgress, Fade } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import Navigation from './components/Navigation'

import VotingModal from '../components/VotingModal'
import DepositModal from '../components/DepositModal'
import ProposalInformation from './components/ProposalInformation'
import ProposalVoting from './components/ProposalVoting'
import VotingStatistics from './components/VotingStatistics'
import Deposits from './components/Deposits'
import { useVotesGraph } from './components/ProposalVoting/hooks'
import { useProposalDetails } from './hooks'

const ProposalDetails = () => {
  useVotesGraph()
  useProposalDetails()

  const { overview } = useSelector((state: RootState) => state.proposalDetails)

  return (
    <>
      <Fade in timeout={500}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Navigation />
          {!overview?.content['@type'] ? (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <CircularProgress size={60} />
            </Box>
          ) : (
            <>
              <ProposalInformation />
              <ProposalVoting />
              <VotingStatistics />
              <Deposits />
            </>
          )}
        </Box>
      </Fade>
      <VotingModal />
      <DepositModal />
    </>
  )
}

export default ProposalDetails
