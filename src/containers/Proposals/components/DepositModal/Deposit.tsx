import { ChangeEvent, useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import {
  ModalProps,
  DepositStatus,
  initialModalState
} from 'store/depositModal'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { depositProposal } from 'ledgers/transactions'
import BigNumber from 'bignumber.js'
import CudosLogo from 'assets/vectors/cudos-logo.svg'
import { CancelRoundedIcon, ModalContainer, StyledTextField } from './styles'

type DepositProps = {
  modalProps: ModalProps
  handleModal: (modalProps: ModalProps) => void
}

const Deposit: React.FC<DepositProps> = ({ handleModal, modalProps }) => {
  const [depositAmount, setDepositAmount] = useState<string>('')

  const { id, title } = useSelector(
    (state: RootState) => state.depositModal.modal
  )

  const { address, balance } = useSelector((state: RootState) => state.profile)

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
        status: DepositStatus.LOADING,
        fee: new BigNumber(0)
      })

      const { gasFee, result } = await depositProposal(
        depositorAddress,
        proposalId,
        amount
      )

      handleModal({
        open: true,
        status: DepositStatus.SUCCESS,
        amount,
        title,
        id,
        fee: new BigNumber(gasFee),
        hash: result.transactionHash
      })
    } catch (error) {
      handleModal({
        open: true,
        status: DepositStatus.FAILURE,
        fee: new BigNumber(0)
      })
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
        Deposit CUDOS for Proposal
      </Typography>
      <CancelRoundedIcon onClick={handleClose} />
      <Box display="flex" flexDirection="column" gap={1}>
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
              startAdornment: <img src={CudosLogo} alt="cudos-logo" />,
              endAdornment: (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={balance.eq(new BigNumber('0'))}
                  sx={() => ({
                    padding: '4px 15px',
                    fontWeight: 600
                  })}
                  onClick={() => setDepositAmount(Number(balance).toString())}
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
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            disabled={Number(depositAmount) > Number(balance) || !depositAmount}
            onClick={() => handleSubmitDeposit(address, id, depositAmount)}
            sx={({ palette }) => ({
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
