import { Typography, Box, InputAdornment, Button, Stack } from '@mui/material'
import {
  AccountBalanceWalletRounded as AccountBalanceWalletRoundedIcon,
  ArrowCircleRightRounded as ArrowCircleRightRoundedIcon,
  InfoRounded as InfoRoundedIcon
} from '@mui/icons-material'
import { ModalProps } from 'store/validator'

import getMiddleEllipsis from '../../../../../../utils/get_middle_ellipsis'
import CudosLogo from '../../../../../../assets/vectors/cudos-logo.svg'
import AvatarName from '../../../../../../components/AvatarName'
import {
  ModalContainer,
  StyledTextField,
  SummaryContainer,
  CancelRoundedIcon
} from './styles'

type DelegationProps = {
  modalProps: ModalProps
  handleModal: (modalProps: ModalProps) => void
}

const Delegation: React.FC<DelegationProps> = ({ modalProps, handleModal }) => {
  const { validator, amount } = modalProps

  const handleSubmit = () => {}

  const handleClose = () => {
    handleModal({ open: false, validator: null, amount: null, status: null })
  }

  return (
    validator && (
      <>
        <ModalContainer>
          <Typography variant="h5" fontWeight={900} textAlign="center">
            Delegate CUDOS
          </Typography>
          <CancelRoundedIcon onClick={handleClose} />
          <Box display="flex" flexDirection="column" gap={2}>
            <Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={6}
              >
                <Typography variant="body2" fontWeight={700}>
                  Connected account address
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={1}
                >
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color="text.secondary"
                  >
                    Network
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color="primary.main"
                  >
                    CUDOS mainnet
                  </Typography>
                </Box>
              </Box>
              <StyledTextField
                variant="standard"
                margin="dense"
                fullWidth
                disabled
                value="cudos1e5zf59p7hflznwnsur84xuvcmjefwq6dl37l3e"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontSize: '12px'
                  },
                  inputProps: {
                    style: {
                      padding: 0
                    }
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBalanceWalletRoundedIcon
                        sx={({ palette }) => ({
                          color: palette.primary.main
                        })}
                      />
                    </InputAdornment>
                  )
                }}
                size="small"
              />
            </Box>
            <Box>
              <Typography variant="body2" fontWeight={700}>
                Validator
              </Typography>
              <StyledTextField
                variant="standard"
                margin="dense"
                fullWidth
                disabled
                value={validator?.address}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontSize: '12px'
                  },
                  inputProps: {
                    style: {
                      padding: 0
                    }
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <AvatarName
                        name={validator?.name}
                        imageUrl={validator?.imageUrl}
                        address={validator?.address}
                      />
                    </InputAdornment>
                  )
                }}
                size="small"
              />
            </Box>
            <Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={6}
              >
                <Typography variant="body2" fontWeight={700}>
                  Amount
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={1}
                >
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color="text.secondary"
                  >
                    Balance
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color="primary.main"
                  >
                    3217.4 CUDOS
                  </Typography>
                </Box>
              </Box>
              <StyledTextField
                variant="standard"
                margin="dense"
                type="number"
                fullWidth
                placeholder="0 CUDOS"
                value={amount || ''}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    padding: 0
                  },
                  inputProps: {
                    style: {
                      padding: '0 10px'
                    }
                  },
                  startAdornment: <img src={CudosLogo} alt="cudos-logo" />,
                  endAdornment: (
                    <Button
                      size="small"
                      sx={(theme) => ({
                        padding: '4px 15px',
                        fontWeight: 600,
                        '&:hover': {
                          background: theme.palette.primary.main
                        }
                      })}
                      onClick={() =>
                        handleModal({ ...modalProps, amount: '3217.4' })
                      }
                    >
                      MAX
                    </Button>
                  )
                }}
                sx={(theme) => ({
                  background: theme.custom.backgrounds.light
                })}
                size="small"
                onChange={(ev) =>
                  handleModal({ ...modalProps, amount: ev.target.value })
                }
              />
            </Box>
          </Box>
          <Button
            sx={({ palette }) => ({
              width: '50%',
              '&:hover': {
                background: palette.primary.main
              }
            })}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </ModalContainer>
        <SummaryContainer show={!!amount}>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            letterSpacing={1}
            sx={{ alignSelf: 'center', display: 'flex' }}
          >
            Transaction summary
          </Typography>
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
                {getMiddleEllipsis(
                  'cudos1e5zf59p7hflznwnsur84xuvcmjefwq6dl37l3e',
                  {
                    beginning: 12,
                    ending: 4
                  }
                )}
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
          <Box display="flex" gap={4} alignSelf="flex-start">
            <Box>
              <Typography color="text.secondary" variant="body2">
                Amount
              </Typography>
              <Typography variant="body2">{amount} CUDOS</Typography>
            </Box>
            <Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography color="text.secondary" variant="body2">
                  Estimated Gas fee
                </Typography>
                <InfoRoundedIcon
                  sx={{ fontSize: '16px', color: 'primary.main' }}
                />
              </Stack>
              <Typography variant="body2">0.000123 CUDOS</Typography>
            </Box>
          </Box>
        </SummaryContainer>
      </>
    )
  )
}

export default Delegation
