import { useEffect, useState } from 'react'
import { Typography, Box, InputAdornment, Button, Stack } from '@mui/material'
import _ from 'lodash'
import {
  AccountBalanceWalletRounded as AccountBalanceWalletRoundedIcon,
  ArrowCircleRightRounded as ArrowCircleRightRoundedIcon
} from '@mui/icons-material'
import { MsgUndelegate } from 'cosmjs-types/cosmos/staking/v1beta1/tx'
import { coin, GasPrice, MsgUndelegateEncodeObject } from 'cudosjs'

import { ModalStatus, initialModalState, ModalProps } from 'store/validator'
import { calculateFee, undelegate } from 'ledgers/transactions'
import getMiddleEllipsis from 'utils/get_middle_ellipsis'
import CudosLogo from 'assets/vectors/cudos-logo.svg'
import AvatarName from 'components/AvatarName'
import { useSelector } from 'react-redux'
import BigNumber from 'bignumber.js'
import { RootState } from 'store'
import CosmosNetworkConfig from 'ledgers/CosmosNetworkConfig'
import { formatNumber, formatToken } from 'utils/format_token'
import {
  ModalContainer,
  StyledTextField,
  SummaryContainer,
  CancelRoundedIcon
} from 'components/Dialog/components/styles'
import { signingClient } from 'ledgers/utils'

const feeMultiplier = import.meta.env.VITE_APP_FEE_MULTIPLIER
const gasPrice = GasPrice.fromString(
  `${import.meta.env.VITE_APP_GAS_PRICE}${CosmosNetworkConfig.CURRENCY_DENOM}`
)

type UndelegationProps = {
  modalProps: ModalProps
  handleModal: (modalProps: ModalProps) => void
}

const Undelegation: React.FC<UndelegationProps> = ({
  modalProps,
  handleModal
}) => {
  const [delegated, setDelegated] = useState<string>('')
  const [undelegationAmount, setUndelegationAmount] = useState<string>('')
  const { validator, amount, fee } = modalProps

  const { address } = useSelector(({ profile }: RootState) => profile)

  useEffect(() => {
    const loadBalance = async () => {
      const walletBalance = await (
        await signingClient
      ).getDelegation(address, validator?.address || '')

      setDelegated(
        new BigNumber(walletBalance?.amount || 0)
          .dividedBy(CosmosNetworkConfig.CURRENCY_1_CUDO)
          .toString(10)
      )
    }

    loadBalance()
  }, [address])

  const handleAmount = async (amount: string) => {
    handleModal({ ...modalProps, amount })
    let fee = ''

    if (Number(amount) > 0) {
      const msg = MsgUndelegate.fromPartial({
        delegatorAddress: address,
        validatorAddress: validator?.address,
        amount: coin(Number(amount), CosmosNetworkConfig.CURRENCY_DENOM)
      })

      const msgAny: MsgUndelegateEncodeObject = {
        typeUrl: '/cosmos.staking.v1beta1.MsgUndelegate',
        value: msg
      }

      const gasUsed = await (
        await signingClient
      ).simulate(address, [msgAny], 'memo')

      const gasLimit = Math.round(gasUsed * feeMultiplier)

      const calculatedFee = calculateFee(gasLimit, gasPrice).amount[0]

      fee = formatToken(
        calculatedFee.amount,
        CosmosNetworkConfig.CURRENCY_DENOM
      ).value
    }

    handleModal({
      ...modalProps,
      fee,
      amount
    })
  }

  const handleAmountChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUndelegationAmount(ev.target.value)
  }

  const delayInput = _.debounce((value) => handleAmount(value), 500)

  const getEstimatedFee = async (amount: string) => {
    const msg = MsgUndelegate.fromPartial({
      delegatorAddress: address,
      validatorAddress: validator?.address,
      amount: coin(
        new BigNumber(amount || 0)
          .multipliedBy(CosmosNetworkConfig.CURRENCY_1_CUDO)
          .toString(10),
        CosmosNetworkConfig.CURRENCY_DENOM
      )
    })

    const msgAny: MsgUndelegateEncodeObject = {
      typeUrl: '/cosmos.staking.v1beta1.MsgUndelegate',
      value: msg
    }

    const gasUsed = await (
      await signingClient
    ).simulate(address, [msgAny], 'memo')

    const gasLimit = Math.round(gasUsed * feeMultiplier)

    const calculatedFee = calculateFee(gasLimit, gasPrice).amount[0]

    return calculatedFee
  }

  const handleMaxAmoount = async () => {
    let fee = ''

    if (Number(delegated) > 0) {
      const estimatedFee = await getEstimatedFee(delegated)

      fee = formatToken(
        estimatedFee.amount,
        CosmosNetworkConfig.CURRENCY_DENOM
      ).value
    }

    handleModal({
      ...modalProps,
      fee,
      amount: delegated
    })

    setUndelegationAmount(delegated)
  }

  const handleSubmit = async (): Promise<void> => {
    handleModal({ ...modalProps, status: ModalStatus.LOADING })

    try {
      const walletAccount = await window.keplr.getKey(
        import.meta.env.VITE_APP_CHAIN_ID
      )

      const delegationResult = await undelegate(
        walletAccount.bech32Address,
        validator?.address || '',
        amount || '',
        ''
      )

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
    delayInput(undelegationAmount)

    return () => delayInput.cancel()
  }, [undelegationAmount])

  return (
    validator && (
      <>
        <ModalContainer>
          <Typography variant="h5" fontWeight={900} textAlign="center">
            Undelegate CUDOS
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
                    Delegated
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color="primary.main"
                  >
                    {formatNumber(delegated, 2)} CUDOS
                  </Typography>
                </Box>
              </Box>
              <StyledTextField
                variant="standard"
                margin="dense"
                type="number"
                fullWidth
                placeholder="0 CUDOS"
                value={undelegationAmount || ''}
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
            disabled={Number(amount) > Number(delegated) || !amount}
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
                {getMiddleEllipsis(validator?.address, {
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
                {getMiddleEllipsis(address, {
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

export default Undelegation
