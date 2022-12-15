import { ChangeEvent, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { depositProposal } from 'ledgers/transactions'
import BigNumber from 'bignumber.js'
import CudosLogo from 'assets/vectors/cudos-logo.svg'
import { formatNumber } from 'utils/format_token'
import {
  DepositModalProps,
  initialDepositModalState,
  ModalStatus
} from 'store/modal'
import { getWalletBalance } from 'utils/projectUtils'
import { updateUser } from 'store/profile'
import { CancelRoundedIcon, ModalContainer, StyledTextField } from './styles'

type DepositProps = {
  modalProps: DepositModalProps
  handleModal: (modalProps: Partial<DepositModalProps>) => void
}

const Deposit: React.FC<DepositProps> = ({ handleModal, modalProps }) => {
  const [depositAmount, setDepositAmount] = useState<string>('')
  const { address, balance, connectedLedger, chosenNetwork } = useSelector(
    (state: RootState) => state.profile
  )

  const { id, title } = modalProps

  const dispatch = useDispatch()

  const handleAmount = async (ev: ChangeEvent<HTMLInputElement>) => {
    setDepositAmount(ev.target.value)
  }

  const handleSubmitDeposit = async (
    depositorAddress: string,
    proposalId: any,
    amount: string
  ) => {
    try {
      handleModal({
        open: true,
        status: ModalStatus.LOADING,
        fee: new BigNumber(0)
      })

      const { gasFee, result } = await depositProposal(
        chosenNetwork,
        depositorAddress,
        proposalId,
        amount,
        connectedLedger!
      )

      handleModal({
        open: true,
        status: ModalStatus.SUCCESS,
        amount,
        title,
        id,
        fee: new BigNumber(gasFee),
        hash: result.transactionHash
      })

      const walletBalance = await getWalletBalance(chosenNetwork!, address)

      dispatch(
        updateUser({
          balance: walletBalance
        })
      )
    } catch (error) {
      handleModal({
        open: true,
        status: ModalStatus.FAILURE,
        fee: new BigNumber(0)
      })
    }
  }

  const handleClose = () => {
    handleModal({
      ...initialDepositModalState
    })
  }

  return (
    <ModalContainer>
      <Typography variant="h5" fontWeight={900} textAlign="center">
        Deposit CUDOS for Proposal
      </Typography>
      <CancelRoundedIcon onClick={handleClose} />
      <Box minWidth="400px" display="flex" flexDirection="column" gap={1}>
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={6}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap={1}
            >
              <Typography variant="body2" fontWeight={700}>
                Proposal #
              </Typography>
            </Box>
          </Box>
          <StyledTextField
            variant="standard"
            margin="dense"
            fullWidth
            value={`#${id} ${title}`}
            InputProps={{
              disableUnderline: true,
              sx: {
                fontSize: '12px'
              },
              inputProps: {
                style: {
                  padding: 0
                }
              }
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
              <Typography variant="body2" fontWeight={700} color="primary.main">
                {formatNumber(Number(balance).toFixed(2), 2)} CUDOS
              </Typography>
            </Box>
          </Box>
          <StyledTextField
            variant="standard"
            margin="dense"
            type="number"
            fullWidth
            placeholder="0 CUDOS"
            value={depositAmount || ''}
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
              startAdornment: <img src={CudosLogo} alt="cudos-logo" />
            }}
            sx={(theme) => ({
              background: theme.custom.backgrounds.light
            })}
            size="small"
            onChange={handleAmount}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            disabled={Number(depositAmount) > Number(balance) || !depositAmount}
            onClick={() => handleSubmitDeposit(address, id, depositAmount)}
            sx={() => ({
              width: '225px',
              height: '50px',
              marginTop: '40px'
            })}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </ModalContainer>
  )
}

export default Deposit
