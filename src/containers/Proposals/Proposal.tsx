import { Box, Typography, Button, Avatar, Tooltip } from '@mui/material'
import Card from 'components/Card'
import TestAvatar from 'assets/vectors/test-avatar-sm.svg'
import LinkIcon from 'assets/vectors/link-icon.svg'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { formatAddress } from 'utils/projectUtils'
import moment from 'moment'
import { VotingStatus } from 'store/votingModal'
import BigNumber from 'bignumber.js'
import useModal from './components/VotingModal/hooks'
import { styles } from './styles'
import { useProposals } from './hooks'

const Proposal = () => {
  useProposals()
  const proposalState = useSelector((state: RootState) => state.proposals)
  const { handleModal } = useModal()

  const handleExplorer = (address: string) => {
    window.open(
      `${import.meta.env.VITE_APP_EXPLORER_V2?.toString()}/accounts/${address}`,
      '_blank'
    )
  }

  const switchStatus = (status: string) => {
    switch (status) {
      case 'PROPOSAL_STATUS_UNSPECIFIED':
        return (
          <Typography sx={{ backgroundColor: '#ff5722' }}>
            Unspecified
          </Typography>
        )

      case 'PROPOSAL_STATUS_DEPOSIT_PERIOD':
        return (
          <Typography sx={styles.statusBox} style={{ background: '#52A6F8' }}>
            DEPOSIT
          </Typography>
        )

      case 'PROPOSAL_STATUS_VOTING_PERIOD':
        return (
          <Typography sx={styles.statusBox} style={{ background: '#9646F9' }}>
            VOTING
          </Typography>
        )

      case 'PROPOSAL_STATUS_PASSED':
        return (
          <Typography sx={styles.statusBox} style={{ background: '#65B48F' }}>
            PASSED
          </Typography>
        )

      case 'PROPOSAL_STATUS_REJECTED':
        return (
          <Typography sx={styles.statusBox} style={{ background: '#ff5722' }}>
            REJECTED
          </Typography>
        )

      case 'PROPOSAL_STATUS_FAILED':
        return (
          <Typography sx={styles.statusBox} style={{ background: '#ff5722' }}>
            FAILED
          </Typography>
        )

      case 'PROPOSAL_STATUS_INVALID':
        return (
          <Typography sx={styles.statusBox} style={{ background: 'black' }}>
            REMOVED
          </Typography>
        )

      case 'UNRECOGNIZED':
        return (
          <Typography sx={styles.statusBox} style={{ background: '#ff5722' }}>
            UNRECOGNIZED
          </Typography>
        )

      default:
        return (
          <Typography sx={styles.statusBox} style={{ background: '#ff5722' }}>
            UNRECOGNIZED
          </Typography>
        )
    }
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={styles.cardTitle}>{proposal.title}</Typography>
              </Box>
              {proposal.status === 'PROPOSAL_STATUS_VOTING_PERIOD' ? (
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleModal({
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
                      <Avatar
                        sx={styles.avatarStyle}
                        src={TestAvatar}
                        alt="Avatar"
                      />
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
                    {moment(proposal.submitTime).format('lll')}
                  </Typography>
                </Box>
                <Box sx={{ flex: '0 1 20%' }}>
                  <Typography
                    sx={{
                      fontSize: '14px'
                    }}
                  >
                    Voting End Time
                  </Typography>
                  <Typography color="text.secondary" sx={styles.timeStyle}>
                    {moment(proposal.votingEndTime).format('lll')}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: '14px'
                    }}
                  >
                    Status
                  </Typography>
                  <Box>{switchStatus(proposal.status)}</Box>
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
