import { useEffect, useState } from 'react'
import {
  Typography,
  Box,
  InputAdornment,
  Button,
  Stack,
  Tooltip
} from '@mui/material'
import {
  AccountBalanceWalletRounded as AccountBalanceWalletRoundedIcon,
  ArrowCircleRightRounded as ArrowCircleRightRoundedIcon
} from '@mui/icons-material'
import { MsgDelegate } from 'cosmjs-types/cosmos/staking/v1beta1/tx'
import { coin, GasPrice, MsgDelegateEncodeObject } from 'cudosjs'

import { ModalStatus, initialModalState, ModalProps } from 'store/validator'
import { calculateFee, delegate } from 'ledgers/transactions'
import getMiddleEllipsis from 'utils/get_middle_ellipsis'
import CudosLogo from 'assets/vectors/cudos-logo.svg'
import AvatarName from 'components/AvatarName'
import { useSelector } from 'react-redux'
import BigNumber from 'bignumber.js'
import { RootState } from 'store'
import CosmosNetworkConfig from 'ledgers/CosmosNetworkConfig'
import { formatNumber, formatToken } from 'utils/format_token'
import _ from 'lodash'
import { signingClient } from 'ledgers/utils'
import {
  ModalContainer,
  StyledTextField,
  SummaryContainer,
  CancelRoundedIcon
} from '../styles'

const feeMultiplier = import.meta.env.VITE_APP_FEE_MULTIPLIER
const gasPrice = GasPrice.fromString(
  `${import.meta.env.VITE_APP_GAS_PRICE}${CosmosNetworkConfig.CURRENCY_DENOM}`
)

type DelegationProps = {
  modalProps: ModalProps
  handleModal: (modalProps: ModalProps) => void
}

const Delegation: React.FC<DelegationProps> = ({ modalProps, handleModal }) => {
  const [balance, setBalance] = useState<string>('')
  const [delegationAmount, setDelegationAmount] = useState<string>('')
  const { validator, amount, fee } = modalProps

  const { address } = useSelector(({ profile }: RootState) => profile)

  useEffect(() => {
    const loadBalance = async () => {
      if (signingClient === null) {
        return
      }

      const walletBalance = await signingClient.getBalance(
        address,
        CosmosNetworkConfig.CURRENCY_DENOM
      )

      setBalance(
        new BigNumber(walletBalance.amount)
          .dividedBy(CosmosNetworkConfig.CURRENCY_1_CUDO)
          .toString(10)
      )
    }

    loadBalance()
  }, [address])

  const getEstimatedFee = async (amount: string) => {
    const msg = MsgDelegate.fromPartial({
      delegatorAddress: address,
      validatorAddress: validator?.address,
      amount: coin(
        new BigNumber(amount || 0)
          .multipliedBy(CosmosNetworkConfig.CURRENCY_1_CUDO)
          .toString(10),
        CosmosNetworkConfig.CURRENCY_DENOM
      )
    })

    const msgAny: MsgDelegateEncodeObject = {
      typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
      value: msg
    }

    if (signingClient === null) {
      return null
    }

    const gasUsed = await signingClient.simulate(address, [msgAny], 'memo')

    const gasLimit = Math.round(gasUsed * feeMultiplier)

    const calculatedFee = calculateFee(gasLimit, gasPrice).amount[0]

    return calculatedFee
  }

  const handleAmount = async (amount: string) => {
    handleModal({ ...modalProps, amount })
    let fee = ''

    if (Number(amount) > 0) {
      const estimatedFee = await getEstimatedFee(amount)

      if (estimatedFee === null) {
        return null
      }

      fee = formatToken(
        estimatedFee.amount,
        CosmosNetworkConfig.CURRENCY_DENOM
      ).value
    }

    handleModal({
      ...modalProps,
      fee,
      amount
    })

    return {}
  }

  const handleAmountChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDelegationAmount(ev.target.value)
  }

  const delayInput = _.debounce((value) => handleAmount(value), 500)

  const handleMaxAmoount = async () => {
    let fee = ''
    const estimatedFee = await getEstimatedFee(balance)

    if (Number(balance) > 0 && estimatedFee !== null) {
      fee = formatToken(
        estimatedFee.amount,
        CosmosNetworkConfig.CURRENCY_DENOM
      ).value
    }

    handleModal({
      ...modalProps,
      fee,
      amount: `${Number(balance) - Math.ceil(Number(fee) * 4)}` // multiplying by 4 because of Keplr
    })
  }

  const handleSubmit = async (): Promise<void> => {
    handleModal({ ...modalProps, status: ModalStatus.LOADING })

    try {
      const walletAccount = await window.keplr.getKey(
        import.meta.env.VITE_APP_CHAIN_ID
      )

      const delegationResult = await delegate(
        walletAccount.bech32Address,
        validator?.address || '',
        amount || '',
        ''
      )

      if (delegationResult === null) {
        return
      }

      handleModal({
        ...modalProps,
        status: ModalStatus.SUCCESS,
        gasUsed: delegationResult.gasUsed,
        txHash: delegationResult.transactionHash
      })
    } catch (e) {
      handleModal({ ...modalProps, status: ModalStatus.FAILURE })
    }
  }

  const handleClose = () => {
    handleModal({
      ...initialModalState
    })
  }

  useEffect(() => {
    delayInput(delegationAmount)

    return () => delayInput.cancel()
  }, [delegationAmount])

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
              <Typography variant="body2" fontWeight={700}>
                Validator
              </Typography>
              <StyledTextField
                variant="standard"
                margin="dense"
                fullWidth
                disabled
                value={getMiddleEllipsis(validator?.address, {
                  beginning: 12,
                  ending: 4
                })}
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
                    {formatNumber(balance.toString(), 2)} CUDOS
                  </Typography>
                </Box>
              </Box>
              <StyledTextField
                variant="standard"
                margin="dense"
                type="number"
                fullWidth
                placeholder="0 CUDOS"
                value={delegationAmount || ''}
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
                    <Tooltip title="Total balance minus the highest estimated fee">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={() => ({
                          padding: '4px 15px',
                          fontWeight: 600
                        })}
                        onClick={handleMaxAmoount}
                      >
                        MAX
                      </Button>
                    </Tooltip>
                  )
                }}
                sx={(theme) => ({
                  background: theme.custom.backgrounds.light
                })}
                size="small"
                onChange={(e) => handleAmountChange(e)}
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
            disabled={
              Number(amount) > Number(balance) || !amount || Number(amount) <= 0
            }
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
                  Estimated Transaction fee
                </Typography>
              </Stack>
              <Typography variant="body2">{fee} CUDOS</Typography>
            </Box>
          </Box>
        </SummaryContainer>
      </>
    )
  )
}

export default Delegation
