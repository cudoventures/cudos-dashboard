import { Box, InputAdornment, Typography, Chip, Button } from '@mui/material'
import Card from 'components/Card'
import SearchIcon from 'assets/vectors/search-icon.svg'
import CrossIcon from 'assets/vectors/cross-blue.svg'
import { RootState } from 'store'
import { useSelector } from 'react-redux'
import VotingModal from './components/VotingModal'
import ProposalModal from './components/ProposalModal'
import DepositModal from './components/DepositModal'
import { ProposalStatus } from '../../store/proposalsModal'
import useModal from './components/ProposalModal/hooks'

import { InputContainer, styles } from './styles'
import Proposal from './Proposal'

const Proposals = () => {
  const { handleModal } = useModal()
  const proposalState = useSelector((state: RootState) => state.proposals)

  return (
    <>
      <Box sx={styles.stickyHeader}>
        <Typography sx={styles.headerStyle}>Proposals</Typography>
        <Typography
          sx={styles.subheaderStyle}
          variant="subtitle1"
          color="text.secondary"
        >
          Here you can see the existing proposals’ statuses or create new one
        </Typography>
      </Box>
      <Card sx={styles.tableContainer}>
        <Box sx={styles.tableHeader}>
          <Typography
            color="text.secondary"
            sx={{ ...styles.subheaderStyle, marginTop: '5px' }}
          >
            PROPOSALS
          </Typography>
          <Chip
            label={proposalState.rawDataTotal}
            color="primary"
            sx={styles.chipStyle}
          />
          <Box>
            <InputContainer
              sx={{ marginLeft: '50px' }}
              disableUnderline
              placeholder="Search for proposal, proposer, ID..."
              startAdornment={
                <InputAdornment position="start">
                  <img
                    style={{ marginRight: '20px' }}
                    src={SearchIcon}
                    alt="Search"
                  />
                </InputAdornment>
              }
            />
          </Box>
          <Box sx={styles.createProposalBtnContainer}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                handleModal({ open: true, status: ProposalStatus.CREATE })
              }
              sx={styles.crateProposalBtn}
            >
              <img
                style={{ marginRight: '10px' }}
                src={CrossIcon}
                alt="Cross"
              />
              Create Proposal
            </Button>
          </Box>
        </Box>
        <Box>
          <Proposal />
        </Box>
      </Card>
      <ProposalModal />
      <VotingModal />
      <DepositModal />
    </>
  )
}

export default Proposals
