import {
  InfoRounded as InfoRoundedIcon,
  OpenInNewRounded as OpenInNewRoundedIcon
} from '@mui/icons-material'
import { Box, Typography, Divider, Stack, Button } from '@mui/material'
import { initialModalState, ModalProps } from 'store/proposalsModal'

import { useSelector } from 'react-redux'
import { RootState } from 'store'
import SuccessIcon from 'assets/vectors/success.svg'
import { formatBigNum } from 'utils/projectUtils'
import { ModalContainer, CancelRoundedIcon } from './styles'

type SuccessProps = {
  modalProps: ModalProps
  handleModal: (modalProps: ModalProps) => void
}

const Success: React.FC<SuccessProps> = ({ modalProps, handleModal }) => {
  const { address } = useSelector(({ profile }: RootState) => profile)

  const { fee, hash, proposalData } = useSelector(
    (state: RootState) => state.proposalsModal.modal
  )

  const handleClose = () => {
    handleModal({
      ...initialModalState
    })
  }

  const switchProposalType = (proposalOption: number | null | undefined) => {
    switch (proposalOption) {
      case 1:
        return 'Text Proposal'
      case 2:
        return 'Software update proposal'
      case 3:
        return 'Cancel software update proposal'
      case 4:
        return 'Parameter change proposal'
      case 5:
        return 'Community pool spend proposal'
      case 6:
        return 'Update client proposal'
      case 7:
        return 'IBC upgrade proposal'
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
          The proposal was successfully created!
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <Box>
          <Typography variant="body2">Your wallet address</Typography>
          <Typography variant="body2" color="primary.main">
            {address}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2">Proposal Type</Typography>
          <Typography color="text.secondary" variant="body2">
            {switchProposalType(proposalData.type)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2">Tittle</Typography>
          <Typography color="text.secondary" variant="body2">
            {proposalData.title}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2">Description</Typography>
          <Typography color="text.secondary" variant="body2">
            {proposalData.description}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" alignItems="center" gap={1} padding="0.5rem 0">
          <Typography variant="body2">Gas used</Typography>
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
                  .open(
                    `${
                      import.meta.env.VITE_APP_EXPLORER_V2
                    }/transactions/${hash}`,
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
