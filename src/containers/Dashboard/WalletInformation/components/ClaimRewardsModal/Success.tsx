import { OpenInNewRounded as OpenInNewRoundedIcon } from '@mui/icons-material'
import { Box, Typography, Divider, Stack, Button } from '@mui/material'
import { initialModalState, ModalProps } from 'store/validator'

import numeral from 'numeral'
import SuccessIcon from 'assets/vectors/success.svg'
import {
  ModalContainer,
  CancelRoundedIcon
} from 'components/Dialog/components/styles'

type SuccessProps = {
  modalProps: ModalProps
  handleModal: (modalProps: ModalProps) => void
}

const Success: React.FC<SuccessProps> = ({ modalProps, handleModal }) => {
  const { gasUsed, txHash, fee } = modalProps

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
          Transaction was successfully executed!
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap={2} width="80%">
        <Box display="flex" alignItems="center" padding="0.5rem 0">
          <Typography variant="body2">Fee</Typography>
          <Typography
            variant="body2"
            color="primary.main"
            fontWeight={700}
            letterSpacing={1}
            sx={{ marginLeft: 'auto' }}
          >
            {fee} CUDOS
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" alignItems="center" padding="0.5rem 0">
          <Typography variant="body2">Gas used</Typography>
          <Typography
            variant="body2"
            color="primary.main"
            fontWeight={700}
            letterSpacing={1}
            sx={{ marginLeft: 'auto' }}
          >
            {numeral(gasUsed).format('0,0')}
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
                    }/transactions/${txHash}`,
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
        sx={() => ({
          width: '50%',
          fontWeight: 700
        })}
        onClick={handleClose}
      >
        Finish
      </Button>
    </ModalContainer>
  )
}

export default Success
