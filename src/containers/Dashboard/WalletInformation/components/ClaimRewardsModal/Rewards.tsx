import { Typography, Box, InputAdornment, Button } from '@mui/material'
import { AccountBalanceWalletRounded as AccountBalanceWalletRoundedIcon } from '@mui/icons-material'

import { ModalStatus, initialModalState, ModalProps } from 'store/validator'
import { claimRewards } from 'ledgers/transactions'
import CudosLogo from 'assets/vectors/cudos-logo.svg?component'
import { useSelector, useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { RootState } from 'store'
import { formatNumber, formatToken } from 'utils/format_token'
import {
  ModalContainer,
  StyledTextField,
  CancelRoundedIcon
} from 'components/Dialog/components/styles'
import { updateUser } from 'store/profile'
import { useNotifications } from 'components/NotificationPopup/hooks'
import CosmosNetworkConfig from 'ledgers/CosmosNetworkConfig'

type RewardsProps = {
  modalProps: ModalProps
  handleModal: (modalProps: ModalProps) => void
  validators: string[]
}

const Rewards: React.FC<RewardsProps> = ({
  modalProps,
  handleModal,
  validators
}) => {
  const { amount } = modalProps
  const { setError } = useNotifications()
  const dispatch = useDispatch()

  const { address } = useSelector(({ profile }: RootState) => profile)

  const handleSubmit = async (): Promise<void> => {
    handleModal({ ...modalProps, status: ModalStatus.LOADING })

    try {
      if (Number.isNaN(new BigNumber(amount || 0))) {
        setError('No available rewards to claim.')
        return
      }

      const { result, fee } = await claimRewards(validators, address)

      handleModal({
        ...modalProps,
        status: ModalStatus.SUCCESS,
        gasUsed: result.gasUsed,
        txHash: result.transactionHash,
        fee: formatToken(fee, CosmosNetworkConfig.CURRENCY_DENOM).value
      })

      dispatch(updateUser({ availableRewards: new BigNumber(0) }))
    } catch (err) {
      handleModal({ ...modalProps, status: ModalStatus.FAILURE })
    }
  }

  const handleClose = () => {
    handleModal({
      ...initialModalState
    })
  }

  return (
    <ModalContainer>
      <Typography variant="h5" fontWeight={900} textAlign="center">
        Claim Rewards
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
              <Typography variant="body2" fontWeight={700} color="primary.main">
                {import.meta.env.VITE_APP_CHAIN_NAME}
              </Typography>
            </Box>
          </Box>
          <StyledTextField
            variant="standard"
            margin="dense"
            fullWidth
            disabled
            value={address}
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={6}
          >
            <Typography variant="body2" fontWeight={700}>
              Rewards
            </Typography>
          </Box>
          <StyledTextField
            variant="standard"
            margin="dense"
            fullWidth
            disabled
            value={formatNumber(amount || '0', 2)}
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: 'white'
              }
            }}
            InputProps={{
              disableUnderline: true,
              inputProps: {
                style: {
                  padding: 0
                }
              },
              startAdornment: (
                <InputAdornment position="start">
                  <CudosLogo />
                </InputAdornment>
              )
            }}
            size="small"
          />
        </Box>
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={() => ({
          width: '50%'
        })}
        onClick={handleSubmit}
        disabled={!amount || Number(amount) <= 0}
      >
        Submit
      </Button>
    </ModalContainer>
  )
}

export default Rewards
