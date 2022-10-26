import {
  Typography,
  Box,
  InputAdornment,
  Button,
  Switch,
  Stack,
  Tooltip
} from '@mui/material'
import { AccountBalanceWalletRounded as AccountBalanceWalletRoundedIcon } from '@mui/icons-material'
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
import { fetchRewards } from 'api/getRewards'
import { useEffect, useState } from 'react'
import InfoIcon from 'assets/vectors/info-alt.svg?component'
import {
  initialRewardsModalProps,
  ModalStatus,
  RewardsModalProps
} from 'store/modal'
import { ValidatorType } from 'store/validator'
import { toValidatorAddress } from 'utils/prefix_convert'
import useValidators from 'containers/Staking/components/Validators/components/Table/hooks'

type RewardsProps = {
  modalProps: RewardsModalProps
  handleModal: (modalProps: Partial<RewardsModalProps>) => void
}

const Rewards: React.FC<RewardsProps> = ({ modalProps, handleModal }) => {
  const [restake, setRestake] = useState<boolean>(true)
  const [claimAndRestakeSeparateMsg, setClaimAndRestakeSeparateMsg] =
    useState<boolean>(false)
  const { amount, isSingleRewardWithdraw } = modalProps
  const { setError } = useNotifications()
  const dispatch = useDispatch()
  const { state: validatorsState } = useValidators()

  const { address, balance, availableRewards, connectedLedger } = useSelector(
    ({ profile }: RootState) => profile
  )

  const { stakedValidators } = useSelector((state: RootState) => state.profile)

  const { validator } = useSelector(
    (state: RootState) => state.validatorDetails
  )

  const getSingleReward = stakedValidators.filter(
    (value) => value.address === validator
  )

  const handleSubmit = async (): Promise<void> => {
    handleModal({ status: ModalStatus.LOADING })

    try {
      if (Number.isNaN(new BigNumber(amount || 0))) {
        setError('No available rewards to claim.')
        return
      }

      const { validatorArray } = await fetchRewards(address)

      const isValidator =
        validatorsState.items.findIndex(
          (item: ValidatorType) =>
            item.validator === toValidatorAddress(address)
        ) > -1

      const { result, fee, restakeTx } = await claimRewards(
        isSingleRewardWithdraw ? getSingleReward : validatorArray,
        address,
        {
          restake,
          withdrawCommission: isValidator,
          claimAndRestakeSeparateMsg
        },
        connectedLedger
      )

      handleModal({
        status: ModalStatus.SUCCESS,
        gasUsed: restakeTx?.transactionHash
          ? result.gasUsed + restakeTx.gasUsed
          : result.gasUsed,
        txHash: result.transactionHash,
        txRestakeHash: restakeTx?.transactionHash || '',
        fee: formatToken(fee, CosmosNetworkConfig.CURRENCY_DENOM).value
      })

      const { validatorArray: updatedValidatorArray, totalRewards } =
        await fetchRewards(address)

      dispatch(
        updateUser({
          availableRewards: new BigNumber(totalRewards),
          stakedValidators: updatedValidatorArray
        })
      )
    } catch (err) {
      handleModal({
        status: ModalStatus.FAILURE,
        failureMessage: {
          subtitle: err.message,
          title: 'Claiming Rewards Failed'
        }
      })
    }
  }

  const handleClose = () => {
    handleModal({
      ...initialRewardsModalProps
    })
  }

  const handleRestakeToggle = () => {
    setRestake(!restake)
    if (availableRewards.isGreaterThan(balance)) {
      setClaimAndRestakeSeparateMsg(true)
    }
  }

  useEffect(() => {
    if (new BigNumber(availableRewards).isGreaterThan(balance)) {
      setClaimAndRestakeSeparateMsg(true)
    } else {
      setClaimAndRestakeSeparateMsg(false)
    }
  }, [availableRewards, balance, claimAndRestakeSeparateMsg])

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
        <Stack direction="row" alignItems="center">
          <Switch checked={restake} onChange={() => handleRestakeToggle()} />
          <Typography fontWeight={700}>Restake</Typography>
          <Tooltip
            title="By enabling Restake your claimed rewards will be automatically re-delegated to the respective Validators"
            placement="right"
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                padding: 0.5
              }}
            >
              <InfoIcon style={{ width: '20px', height: 'auto' }} />
            </Box>
          </Tooltip>
        </Stack>
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
