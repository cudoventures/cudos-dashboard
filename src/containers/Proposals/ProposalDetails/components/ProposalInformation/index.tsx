import { Box, Button, Tooltip, Typography, Divider } from '@mui/material'
import { ArrowUpwardRounded as ArrowUpwardRoundedIcon } from '@mui/icons-material'
import LinkIcon from 'assets/vectors/link-icon.svg'
import Card from 'components/Card'
import { useSelector } from 'react-redux'
import BigNumber from 'bignumber.js'
import { RootState } from 'store'
import { DepositStatus } from 'store/depositModal'
import { formatAddress, formatDateTime } from 'utils/projectUtils'
import { VotingStatus } from 'store/votingModal'
import { useProposals } from 'containers/Proposals/hooks'
import { proposalStatus } from 'containers/Proposals/proposalStatus'
import { proposalType } from 'containers/Proposals/proposalType'
import useVotingModal from '../../../components/VotingModal/hooks'
import useDepositModal from '../../../components/DepositModal/hooks'

import { styles } from '../../../styles'

const ProposalInformation = () => {
  useProposals()
  const proposalState = useSelector((state: RootState) => state.proposalDetails)
  const { handleModal: handleVotingModal } = useVotingModal()
  const { handleModal: handleDepositModal } = useDepositModal()

  const handleExplorer = (address: string) => {
    window.open(
      `${import.meta.env.VITE_APP_EXPLORER_V2?.toString()}/accounts/${address}`,
      '_blank'
    )
  }

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ position: 'absolute' }}>
          <Typography color="text.secondary" sx={styles.cardEnumeration}>
            {`#${proposalState.id}`}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Typography sx={styles.cardTitle}>{proposalState.title}</Typography>
          </Box>
          {proposalState.status === 'PROPOSAL_STATUS_VOTING_PERIOD' ? (
            <Box sx={{ position: 'relevant' }}>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleVotingModal({
                      open: true,
                      status: VotingStatus.VOTE,
                      id: proposalState.id,
                      title: proposalState.title,
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
                      id: proposalState.id,
                      title: proposalState.title,
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
          {proposalState.status === 'PROPOSAL_STATUS_DEPOSIT_PERIOD' ? (
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
                    id: proposalState.id,
                    title: proposalState.title,
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
          <Typography>Description</Typography>
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
            <Box sx={{ flex: '0 1 15%' }}>
              <Typography
                sx={{
                  fontSize: '14px'
                }}
              >
                Proposal Type
              </Typography>
              <Box>
                <Typography color="text.secondary" sx={styles.proposerAddress}>
                  {proposalType(proposalState.proposalType)}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ flex: '0 1 25%' }}>
              <Typography
                sx={{
                  fontSize: '14px'
                }}
              >
                Proposer
              </Typography>
              <Box>
                <Typography color="primary.main" sx={styles.proposerAddress}>
                  {formatAddress(proposalState.proposerAddress, 18)}
                  <Tooltip
                    onClick={() =>
                      handleExplorer(proposalState.proposerAddress)
                    }
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

            <Box>
              <Typography
                sx={{
                  fontSize: '14px'
                }}
              >
                Status
              </Typography>
              <Box>{proposalStatus(proposalState.status)}</Box>
            </Box>
          </Box>
        </Box>
        <Divider
          sx={{
            width: '92%',
            marginLeft: '50px',
            marginTop: '30px',
            borderBottomWidth: 2
          }}
        />
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              marginLeft: '50px',
              marginTop: '30px',
              width: '100%'
            }}
          >
            <Box sx={{ flex: '0 0 65%' }}>
              <Typography
                sx={{
                  fontSize: '14px'
                }}
              >
                Submit Time
              </Typography>
              <Typography color="text.secondary" sx={styles.timeStyle}>
                {formatDateTime(proposalState.submitTime)}
              </Typography>
            </Box>
            {proposalState.status === 'PROPOSAL_STATUS_VOTING_PERIOD' ? (
              <>
                <Box sx={{ flex: '0 1 20%' }}>
                  <Typography
                    sx={{
                      fontSize: '14px'
                    }}
                  >
                    Voting Start Time
                  </Typography>
                  <Typography color="text.secondary" sx={styles.timeStyle}>
                    {formatDateTime(proposalState.votingStartTime)}
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
                    {formatDateTime(proposalState.votingEndTime)}
                  </Typography>
                </Box>
              </>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default ProposalInformation
