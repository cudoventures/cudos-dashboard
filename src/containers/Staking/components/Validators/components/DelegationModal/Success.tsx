import {
  ArrowCircleRightRounded as ArrowCircleRightRoundedIcon,
  InfoRounded as InfoRoundedIcon,
  OpenInNewRounded as OpenInNewRoundedIcon
} from '@mui/icons-material'
import { Box, Typography, Divider, Stack, Button } from '@mui/material'
import { initialModalState, ModalProps } from 'store/validator'

import { useSelector } from 'react-redux'
import { RootState } from 'store'
import getMiddleEllipsis from '../../../../../../utils/get_middle_ellipsis'
import SuccessIcon from '../../../../../../assets/vectors/success.svg'
import { ModalContainer, CancelRoundedIcon } from './styles'

type SuccessProps = {
  modalProps: ModalProps
  handleModal: (modalProps: ModalProps) => void
}

const Success: React.FC<SuccessProps> = ({ modalProps, handleModal }) => {
  const { validator, amount, gasUsed, txHash } = modalProps

  const { address } = useSelector(({ profile }: RootState) => profile)

  const handleClose = () => {
    handleModal({
      ...initialModalState
    })
  }

  return (
    validator && (
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
        <Box display="flex" flexDirection="column" gap={2}>
          <Box
            display="flex"
            gap={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography color="text.secondary" variant="body2">
                From
              </Typography>
              <Typography variant="body2">
                {getMiddleEllipsis(address, {
                  beginning: 12,
                  ending: 4
                })}
              </Typography>
            </Box>
            <ArrowCircleRightRoundedIcon
              sx={(theme) => ({
                color: theme.palette.primary.main,
                border: 'none'
              })}
            />
            <Box>
              <Typography color="text.secondary" variant="body2">
                To
              </Typography>
              <Typography variant="body2">
                {getMiddleEllipsis(validator?.address, {
                  beginning: 12,
                  ending: 4
                })}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography color="text.secondary" variant="body2">
              Amount
            </Typography>
            <Typography variant="body2">{amount} CUDOS</Typography>
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
              {gasUsed} CUDOS
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
          sx={(theme) => ({
            width: '50%',
            fontWeight: 700,
            '&:hover': {
              background: theme.palette.primary.main
            }
          })}
          onClick={handleClose}
        >
          Finish
        </Button>
      </ModalContainer>
    )
  )
}

export default Success
