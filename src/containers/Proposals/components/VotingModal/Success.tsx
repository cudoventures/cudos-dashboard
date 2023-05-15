import {
  InfoRounded as InfoRoundedIcon,
  OpenInNewRounded as OpenInNewRoundedIcon
} from '@mui/icons-material'
import { Box, Typography, Divider, Stack, Button } from '@mui/material'
import { initialVotingModalState, VotingModalProps } from 'store/modal'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import SuccessIcon from 'assets/vectors/success.svg'
import { formatBigNum } from 'utils/projectUtils'
import { ModalContainer, CancelRoundedIcon } from './styles'
import { CHAIN_DETAILS } from 'utils/constants'

type SuccessProps = {
  modalProps: VotingModalProps
  handleModal: (modalProps: Partial<VotingModalProps>) => void
}

const Success: React.FC<SuccessProps> = ({ modalProps, handleModal }) => {
  const { address } = useSelector(({ profile }: RootState) => profile)
  const { type, title, id, fee, hash } = modalProps

  const handleClose = () => {
    handleModal({
      ...initialVotingModalState
    })
  }

  const switchVoteOption = (voteOption: number | null | undefined) => {
    switch (voteOption) {
      case 1:
        return 'Yes'
      case 2:
        return 'Abstain'
      case 3:
        return 'No'
      case 4:
        return 'No with Veto'
      default:
        return ''
    }
  }

  return (
    <ModalContainer sx={{ padding: '4rem' }}>
      <img src={SuccessIcon} alt="success-icon" />
      <CancelRoundedIcon onClick={handleClose} />
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <Typography variant="h4" fontWeight={900} letterSpacing={2}>
          Success!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          You have voted successfully for this proposal!
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <Box>
          <Typography color="text.secondary" variant="body2">
            Your wallet address
          </Typography>
          <Typography variant="body2" color="primary.main">
            {address}
          </Typography>
        </Box>
        <Box>
          <Typography color="text.secondary" variant="body2">
            Proposal ID
          </Typography>
          <Typography variant="body2">{`#${id} ${title}`}</Typography>
        </Box>
        <Box>
          <Typography color="text.secondary" variant="body2">
            Vote with
          </Typography>
          <Typography variant="body2">{switchVoteOption(type)}</Typography>
        </Box>
        <Divider />
        <Box display="flex" alignItems="center" gap={1} padding="0.5rem 0">
          <Typography variant="body2">Fee</Typography>
          <InfoRoundedIcon
            fontSize="small"
            sx={({ palette }) => ({ color: palette.primary.main })}
          />
          <Typography
            variant="body2"
            color="primary.main"
            fontWeight={700}
            letterSpacing={1}
            sx={{ marginLeft: 'auto' }}
          >
            {formatBigNum(fee)}
          </Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="body2">Transaction</Typography>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ cursor: 'pointer' }}
          >
            <Typography
              variant="body2"
              color="primary.main"
              sx={{ textDecoration: 'underline' }}
              onClick={() =>
                window
                  .open(`${CHAIN_DETAILS.EXPLORER_URL}/transactions/${hash}`,
                    '_blank'
                  )
                  ?.focus()
              }
            >
              Transaction link
            </Typography>
            <OpenInNewRoundedIcon
              fontSize="small"
              sx={(theme) => ({
                color: theme.palette.primary.main
              })}
            />
          </Stack>
        </Box>
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={(theme) => ({
          width: '50%',
          fontWeight: 700
        })}
        onClick={handleClose}
      >
        Go to proposals
      </Button>
    </ModalContainer>
  )
}

export default Success
