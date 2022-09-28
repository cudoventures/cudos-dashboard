import { Box, Button, InputAdornment, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { AccountBalanceWalletRounded as AccountBalanceWalletRoundedIcon } from '@mui/icons-material'
import Dropdown from 'components/Dropdown'
import { createProposal } from 'ledgers/transactions'
import _ from 'lodash'
import BigNumber from 'bignumber.js'
import { useNotifications } from 'components/NotificationPopup/hooks'
import {
  FailureMessage,
  initialProposalModalState,
  ModalStatus,
  ProposalModalProps,
  ProposalTypes
} from 'store/modal'
import {
  CancelRoundedIcon,
  InputContainer,
  ModalContainer,
  StyledTextField
} from './styles'
import { typeSwitch } from './ProposalTypes/types'
import { validateInput } from './ProposalTypes/validateInput'

type ProposalProps = {
  modalProps: ProposalModalProps
  handleModal: (modalProps: Partial<ProposalModalProps>) => void
}

const Proposals: React.FC<ProposalProps> = ({ handleModal, modalProps }) => {
  const { setError } = useNotifications()
  const { address, connectedLedger } = useSelector(
    ({ profile }: RootState) => profile
  )

  const { proposalData } = modalProps
  const [proposal, setProposal] = useState<string>('1')
  const [title, setTitle] = useState<string>('')
  const [proposalError, setProposalError] = useState<boolean>()

  const delayInput = _.debounce(
    (value) =>
      handleModal({
        proposalData: {
          ...proposalData,
          title: value,
          type: Number(proposal)
        }
      }),
    250
  )

  const handleClose = () => {
    handleModal({
      ...initialProposalModalState
    })
  }

  const handleProposalType = (proposalValue: string) => {
    setProposal(proposalValue)
    setTitle('')
    handleModal({
      proposalData: { ...initialProposalModalState.proposalData }
    })
  }

  const handleError = (error: string) => {
    if (
      error.includes(
        FailureMessage.CREATING_PROPOSAL_FAILED_TO_UNMARSHAL_NUMBER
      )
    ) {
      return FailureMessage.CREATING_PROPOSAL_FAILED_TO_UNMARSHAL_END_USER
    }
    return FailureMessage.DEFAULT_PROPOSAL_FAILED
  }

  const handleProposalSubmit = async (proposerAddress: string) => {
    try {
      handleModal({
        open: true,
        status: ModalStatus.LOADING,
        proposalData: {
          ...proposalData,
          type: Number(proposal)
        }
      })
      const { result, gasFee } = await createProposal(
        proposalData,
        proposerAddress,
        connectedLedger
      )
      handleModal({
        open: true,
        status: ModalStatus.SUCCESS,
        fee: new BigNumber(gasFee),
        hash: result.transactionHash
      })
    } catch (error) {
      handleModal({
        open: true,
        status: ModalStatus.FAILURE,
        failureMessage: {
          title: 'Creating Proposal Failed.',
          subtitle: handleError(error.message)
        }
      })
    }
  }

  useEffect(() => {
    delayInput(title)

    return () => delayInput.cancel()
  }, [title, proposal])

  useEffect(() => {
    const { error } = validateInput(proposalData)

    setProposalError(error)
  }, [proposalData])

  return (
    <ModalContainer>
      <Typography variant="h5" fontWeight={900} textAlign="center">
        Create Proposal
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
          <Typography
            sx={{ marginBottom: '10px' }}
            variant="body2"
            fontWeight={700}
          >
            Title
          </Typography>
          <Box gap={1} display="flex">
            <InputContainer
              placeholder="e.g. Voting guides update"
              required
              disableUnderline
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{ marginBottom: '10px' }}
            variant="body2"
            fontWeight={700}
          >
            Type
          </Typography>
          <Dropdown selectedValue={handleProposalType} data={ProposalTypes} />
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          {typeSwitch(proposal)}
        </Box>
      </Box>
      <Box>
        <Button
          variant="contained"
          disabled={proposalError}
          color="primary"
          onClick={() => handleProposalSubmit(address)}
          sx={({ palette }) => ({
            width: '225px',
            height: '50px',
            '&:hover': {
              background: palette.primary.main
            }
          })}
        >
          Submit
        </Button>
      </Box>
    </ModalContainer>
  )
}

export default Proposals
