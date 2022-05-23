import {
  InfoRounded as InfoRoundedIcon,
  OpenInNewRounded as OpenInNewRoundedIcon
} from '@mui/icons-material'
import { Box, Typography, Divider, Stack, Button } from '@mui/material'
import { initialModalState, ModalProps } from 'store/proposals'

import { useSelector } from 'react-redux'
import { RootState } from 'store'
import SuccessIcon from '../../../../assets/vectors/success.svg'
import { ModalContainer, CancelRoundedIcon } from './styles'

type SuccessProps = {
  modalProps: ModalProps
  handleModal: (modalProps: ModalProps) => void
}

const Success: React.FC<SuccessProps> = ({ modalProps, handleModal }) => {
  const { address } = useSelector(({ profile }: RootState) => profile)

  const handleClose = () => {
    handleModal({
      ...initialModalState
    })
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
            Text Proposal
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2">Tittle</Typography>
          <Typography color="text.secondary" variant="body2">
            Voting guides update
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2">Description</Typography>
          <Typography color="text.secondary" variant="body2">
            Lorem ipsum dolor sit amet, consectetiy...
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
            0.00012 CUDOS
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
                    `${import.meta.env.VITE_APP_EXPLORER_V2}/transactions/`,
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
        sx={(theme) => ({
          width: '50%',
          fontWeight: 700,
          '&:hover': {
            background: theme.palette.primary.main
          }
        })}
        onClick={handleClose}
      >
        Go to proposals
      </Button>
    </ModalContainer>
  )
}

export default Success
