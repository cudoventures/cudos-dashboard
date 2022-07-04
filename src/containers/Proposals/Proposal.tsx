import { Box, Typography, Button, Tooltip } from '@mui/material'
import { ArrowUpwardRounded as ArrowUpwardRoundedIcon } from '@mui/icons-material'
import Card from 'components/Card'
import LinkIcon from 'assets/vectors/link-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { formatAddress, formatDateTime } from 'utils/projectUtils'
import { VotingStatus } from 'store/votingModal'
import BigNumber from 'bignumber.js'
import { DepositStatus } from 'store/depositModal'
import { useNavigate } from 'react-router-dom'
import { ProposalType } from 'store/proposals'
import { updateProposalDetails } from 'store/proposalDetails'
import useVotingModal from './components/VotingModal/hooks'
import useDepositModal from './components/DepositModal/hooks'
import { styles } from './styles'
import { proposalStatus } from './proposalStatus'

const Proposal = () => {
  const proposalState = useSelector((state: RootState) => state.proposals)
  const { handleModal: handleVotingModal } = useVotingModal()
  const { handleModal: handleDepositModal } = useDepositModal()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleExplorer = (address: string) => {
    window.open(
      `${import.meta.env.VITE_APP_EXPLORER_V2?.toString()}/accounts/${address}`,
      '_blank'
    )
  }

  const handleProposalDetails = (proposalObj: ProposalType) => {
    dispatch(updateProposalDetails({ id: proposalObj.id }))
    navigate(`/proposals/${proposalObj.id}`)
  }

  return (
    <>
      {proposalState.items.map((proposal) => (
        <Card key={proposal.id} sx={styles.cardContainer}>
          <Box sx={{ position: 'relative' }}>
            <Box sx={{ position: 'absolute' }}>
              <Typography color="text.secondary" sx={styles.cardEnumeration}>
                {`#${proposal.id}`}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Box
                onClick={() => handleProposalDetails(proposal)}
                sx={{ display: 'flex', cursor: 'pointer' }}
              >
                <Typography sx={styles.cardTitle}>{proposal.title}</Typography>
              </Box>
              {proposal.status === 'PROPOSAL_STATUS_VOTING_PERIOD' ? (
                <Box sx={{ position: 'relative' }}>
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleVotingModal({
                          open: true,
                          status: VotingStatus.VOTE,
                          id: proposal.id,
                          title: proposal.title,
                          fee: new BigNumber(0)
                        })
                      }
                      sx={styles.cardActionButton}
                    >
                      Vote Now
                    </Button>
                  </Box>
                  <Box sx={{ position: 'absolute', marginTop: '10px' }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={
                        <ArrowUpwardRoundedIcon
                          fontSize="small"
                          sx={{ transform: 'rotate3d(0, 0, 1, 0.125turn)' }}
                        />
                      }
                      onClick={() =>
                        handleDepositModal({
                          open: true,
                          status: DepositStatus.DEPOSIT,
                          id: proposal.id,
                          title: proposal.title,
                          amount: '',
                          fee: new BigNumber(0)
                        })
                      }
                      sx={styles.cardActionButton}
                    >
                      Deposit
                    </Button>
                  </Box>
                </Box>
              ) : null}
              {proposal.status === 'PROPOSAL_STATUS_DEPOSIT_PERIOD' ? (
                <Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={
                      <ArrowUpwardRoundedIcon
                        fontSize="small"
                        sx={{ transform: 'rotate3d(0, 0, 1, 0.125turn)' }}
                      />
                    }
                    onClick={() =>
                      handleDepositModal({
                        open: true,
                        status: DepositStatus.DEPOSIT,
                        id: proposal.id,
                        title: proposal.title,
                        amount: '',
                        fee: new BigNumber(0)
                      })
                    }
                    sx={styles.cardActionButton}
                  >
                    Deposit
                  </Button>
                </Box>
              ) : null}
            </Box>
            <Box color="text.secondary" sx={styles.proposalContent}>
              <Typography>{proposal.description}</Typography>
            </Box>
            <Box sx={{ display: 'flex', width: '100%' }}>
              <Box
                sx={{
                  display: 'flex',
                  marginLeft: '50px',
                  marginTop: '50px',
                  width: '85%'
                }}
              >
                <Box sx={{ flex: '0 1 30%' }}>
                  <Typography
                    sx={{
                      fontSize: '14px'
                    }}
                  >
                    Proposer
                  </Typography>
                  <Box>
                    <Typography
                      color="primary.main"
                      sx={styles.proposerAddress}
                    >
                      {formatAddress(proposal.proposerAddress, 18)}
                      <Tooltip
                        onClick={() => handleExplorer(proposal.proposerAddress)}
                        title="Go to Explorer"
                      >
                        <img
                          style={{ marginLeft: '10px', cursor: 'pointer' }}
                          src={LinkIcon}
                          alt="Link"
                        />
                      </Tooltip>
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: '0 0 20%' }}>
                  <Typography
                    sx={{
                      fontSize: '14px'
                    }}
                  >
                    Submit Time
                  </Typography>
                  <Typography color="text.secondary" sx={styles.timeStyle}>
                    {formatDateTime(proposal.submitTime)}
                  </Typography>
                </Box>
                {proposal.status === 'PROPOSAL_STATUS_VOTING_PERIOD' ? (
                  <Box sx={{ flex: '0 1 20%' }}>
                    <Typography
                      sx={{
                        fontSize: '14px'
                      }}
                    >
                      Voting End Time
                    </Typography>
                    <Typography color="text.secondary" sx={styles.timeStyle}>
                      {formatDateTime(proposal.votingEndTime)}
                    </Typography>
                  </Box>
                ) : null}
                <Box>
                  <Typography
                    sx={{
                      fontSize: '14px'
                    }}
                  >
                    Status
                  </Typography>
                  <Box>{proposalStatus(proposal.status)}</Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Card>
      ))}
    </>
  )
}

export default Proposal
