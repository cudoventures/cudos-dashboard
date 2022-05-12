import { ChangeEvent, useEffect, useState } from 'react'
import { Typography, Box, InputAdornment, Button, Stack } from '@mui/material'
import {
  AccountBalanceWalletRounded as AccountBalanceWalletRoundedIcon,
  ArrowCircleRightRounded as ArrowCircleRightRoundedIcon,
  InfoRounded as InfoRoundedIcon
} from '@mui/icons-material'
import { MsgDelegate } from 'cosmjs-types/cosmos/staking/v1beta1/tx'
import {
  coin,
  GasPrice,
  MsgDelegateEncodeObject,
  SigningStargateClient,
  StargateClient
} from 'cudosjs'

import {
  DelegationStatus,
  initialModalState,
  ModalProps
} from 'store/validator'
import { calculateFee, delegate } from 'ledgers/transactions'
import getMiddleEllipsis from 'utils/get_middle_ellipsis'
import CudosLogo from 'assets/vectors/cudos-logo.svg'
import AvatarName from 'components/AvatarName'
import { useSelector } from 'react-redux'
import BigNumber from 'bignumber.js'
import { RootState } from 'store'
import CosmosNetworkConfig from 'ledgers/CosmosNetworkConfig'
import { formatToken } from 'utils/format_token'
import {
  ModalContainer,
  StyledTextField,
  SummaryContainer,
  CancelRoundedIcon
} from './styles'

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
  const { validator, amount, fee } = modalProps

  const { address } = useSelector(({ profile }: RootState) => profile)

  useEffect(() => {
    const loadBalance = async () => {
      const client = await StargateClient.connect(import.meta.env.VITE_APP_RPC)
      const walletBalance = await client.getBalance(
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

  const handleAmount = async (ev: ChangeEvent<HTMLInputElement>) => {
    handleModal({ ...modalProps, amount: ev.target.value })
    let fee = ''

    if (Number(ev.target.value) > 0) {
      window.keplr.defaultOptions = {
        sign: {
          preferNoSetFee: true
        }
      }
      const offlineSigner = window.getOfflineSigner(
        import.meta.env.VITE_APP_CHAIN_ID
      )

      const client = await SigningStargateClient.connectWithSigner(
        import.meta.env.VITE_APP_RPC,
        offlineSigner
      )

      const msg = MsgDelegate.fromPartial({
        delegatorAddress: address,
        validatorAddress: validator?.address,
        amount: coin(
          Number(ev.target.value),
          CosmosNetworkConfig.CURRENCY_DENOM
        )
      })

      const msgAny: MsgDelegateEncodeObject = {
        typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
        value: msg
      }

      const gasUsed = await client.simulate(address, [msgAny], 'memo')

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
      amount: ev.target.value
    })
  }

  const handleSubmit = async (): Promise<void> => {
    handleModal({ ...modalProps, status: DelegationStatus.LOADING })

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

      handleModal({
        ...modalProps,
        status: DelegationStatus.SUCCESS,
        gasUsed: delegationResult.gasUsed,
        txHash: delegationResult.transactionHash
      })
    } catch (e) {
      handleModal({ ...modalProps, status: DelegationStatus.FAILURE })
    }
  }

  const handleClose = () => {
    handleModal({
      ...initialModalState
    })
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
                    {Number(balance.toString()).toFixed(2)} CUDOS
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
                        handleModal({
                          ...modalProps,
                          amount: Math.floor(Number(balance)).toString()
                        })
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
                onChange={handleAmount}
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
            disabled={Number(amount) > Number(balance)}
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
                  Estimated Gas fee
                </Typography>
                <InfoRoundedIcon
                  sx={{ fontSize: '16px', color: 'primary.main' }}
                />
              </Stack>
              <Typography variant="body2">{fee}</Typography>
            </Box>
          </Box>
        </SummaryContainer>
      </>
    )
  )
}

export default Delegation
