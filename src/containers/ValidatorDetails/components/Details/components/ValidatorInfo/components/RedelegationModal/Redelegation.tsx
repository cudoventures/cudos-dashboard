import { useEffect, useState } from 'react'
import { Typography, Box, InputAdornment, Button, Stack } from '@mui/material'
import {
  AccountBalanceWalletRounded as AccountBalanceWalletRoundedIcon,
  ArrowCircleRightRounded as ArrowCircleRightRoundedIcon
} from '@mui/icons-material'
import { MsgBeginRedelegate } from 'cosmjs-types/cosmos/staking/v1beta1/tx'
import { coin, GasPrice } from 'cudosjs'
import {
  ModalStatus,
  RedelegationModalProps,
  initialRedelegationModalState,
  FailureMessage
} from 'store/modal'
import { calculateFee, redelegate } from 'ledgers/transactions'
import getMiddleEllipsis from 'utils/get_middle_ellipsis'
import CudosLogo from 'assets/vectors/cudos-logo.svg'
import AvatarName from 'components/AvatarName'
import { useDispatch, useSelector } from 'react-redux'
import BigNumber from 'bignumber.js'
import { RootState } from 'store'
import CosmosNetworkConfig from 'ledgers/CosmosNetworkConfig'
import { formatNumber, formatToken } from 'utils/format_token'
import Dropdown from 'components/Dropdown'
import {
  ModalContainer,
  StyledTextField,
  SummaryContainer,
  CancelRoundedIcon
} from 'components/Dialog/components/styles'
import _ from 'lodash'
import { signingClient } from 'ledgers/utils'
import { fetchRedelegations } from 'api/getAccountRedelegations'
import { updateUser } from 'store/profile'

const feeMultiplier = import.meta.env.VITE_APP_FEE_MULTIPLIER
const gasPrice = GasPrice.fromString(
  `${import.meta.env.VITE_APP_GAS_PRICE}${CosmosNetworkConfig.CURRENCY_DENOM}`
)

type RedelegationProps = {
  modalProps: RedelegationModalProps
  handleModal: (modalProps: Partial<RedelegationModalProps>) => void
}

const Redelegation: React.FC<RedelegationProps> = ({
  modalProps,
  handleModal
}) => {
  const [delegated, setDelegated] = useState<string>('')
  const [redelegationAmount, setRedelegationAmount] = useState<string>('')
  const { validator, amount, fee } = modalProps
  const dispatch = useDispatch()

  const { address } = useSelector(({ profile }: RootState) => profile)
  const validators = useSelector(({ validator }: RootState) => validator.items)

  const filteredValidators = validators.filter(
    (item) => item.validator !== validator?.address
  )

  const handleError = (error: string) => {
    switch (error) {
      case FailureMessage.REJECTED_BY_USER:
        return 'Request rejected by the user'
      case FailureMessage.REDELEGATION_IN_PROGRESS:
        return 'Redelegation to this validator already in progress. First redelegation to this validator must complete before next redelegation.'
      default:
        return FailureMessage.DEFAULT
    }
  }

  const data = filteredValidators.map((item, idx) => ({
    value: (idx + 1).toString(),
    address: item.validator,
    label: (
      <AvatarName
        name={item.moniker}
        imageUrl={item.avatarUrl}
        address={item.validator}
      />
    )
  }))

  const [redelegationAddress, setRedelegationAddress] = useState<string>(
    data[0].address
  )

  const handleDropdown = (validatorIndex: string) => {
    const validatorAddress = data.filter(
      (item, idx) => idx + 1 === Number(validatorIndex)
    )

    setRedelegationAddress(validatorAddress[0].address)
  }

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
    handleModal({
      amount
    })
    let fee = ''

    if (Number(amount) > 0) {
      try {
        const msg = MsgBeginRedelegate.fromPartial({
          delegatorAddress: address,
          validatorSrcAddress: validator?.address,
          validatorDstAddress: redelegationAddress,
          amount: coin(
            new BigNumber(amount || 0)
              .multipliedBy(CosmosNetworkConfig.CURRENCY_1_CUDO)
              .toString(10),
            CosmosNetworkConfig.CURRENCY_DENOM
          )
        })

        const msgAny = {
          typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
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
      } catch (error) {
        fee = '0'
      }
    }

    handleModal({
      amount,
      fee
    })
  }

  const handleAmountChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRedelegationAmount(ev.target.value)
  }

  const delayInput = _.debounce((value) => handleAmount(value), 500)

  const getEstimatedFee = async (amount: string) => {
    const msg = MsgBeginRedelegate.fromPartial({
      delegatorAddress: address,
      validatorSrcAddress: validator?.address,
      validatorDstAddress: redelegationAddress,
      amount: coin(
        new BigNumber(amount || 0)
          .multipliedBy(CosmosNetworkConfig.CURRENCY_1_CUDO)
          .toString(10),
        CosmosNetworkConfig.CURRENCY_DENOM
      )
    })

    const msgAny = {
      typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
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
      amount: delegated,
      fee
    })

    setRedelegationAmount(delegated)
  }

  const handleSubmit = async (): Promise<void> => {
    handleModal({ status: ModalStatus.LOADING })

    try {
      const walletAccount = await window.keplr.getKey(
        import.meta.env.VITE_APP_CHAIN_ID
      )

      const redelegationResult = await redelegate(
        walletAccount.bech32Address,
        validator?.address || '',
        redelegationAddress,
        amount || '',
        ''
      )

      handleModal({
        status: ModalStatus.SUCCESS,
        gasUsed: redelegationResult.gasUsed,
        txHash: redelegationResult.transactionHash
      })

      const { redelegationsArray } = await fetchRedelegations(address)
      dispatch(
        updateUser({
          redelegations: redelegationsArray
        })
      )
    } catch (e) {
      handleModal({
        status: ModalStatus.FAILURE,
        failureMessage: {
          title: 'Redelegation Failed!',
          subtitle: handleError(e.message)
        }
      })
    }
  }

  const handleClose = () => {
    handleModal({
      ...initialRedelegationModalState
    })
  }

  useEffect(() => {
    delayInput(redelegationAmount)

    return () => delayInput.cancel()
  }, [redelegationAmount])

  return (
    validator && (
      <>
        <ModalContainer>
          <Typography variant="h5" fontWeight={900} textAlign="center">
            Redelegate CUDOS
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
            <Typography variant="body2" fontWeight={700}>
              Redelegate to
            </Typography>
            <Box>
              <Dropdown selectedValue={handleDropdown} data={data} />
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
                value={redelegationAmount || ''}
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
                      disabled={!redelegationAddress}
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
            disabled={
              Number(amount) > Number(delegated) ||
              !amount ||
              !redelegationAddress
            }
          >
            Submit
          </Button>
        </ModalContainer>
        <SummaryContainer show={!!amount && !!redelegationAddress}>
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
                {getMiddleEllipsis(redelegationAddress, {
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

export default Redelegation
