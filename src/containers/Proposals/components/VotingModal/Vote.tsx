import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import Dropdown from 'components/Dropdown'
import {
  ModalProps,
  VotingStatus,
  initialModalState,
  VotingTypes
} from 'store/votingModal'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { voteProposal } from 'ledgers/transactions'
import BigNumber from 'bignumber.js'
import { CancelRoundedIcon, ModalContainer, StyledTextField } from './styles'

type VotingProps = {
  modalProps: ModalProps
  handleModal: (modalProps: ModalProps) => void
}

const Vote: React.FC<VotingProps> = ({ handleModal, modalProps }) => {
  const [vote, setVote] = useState<string>('1')

  const { id, title } = useSelector(
    (state: RootState) => state.votingModal.modal
  )

  const { address } = useSelector((state: RootState) => state.profile)

  const handleSubmitVote = async (
    voterAddress: string,
    proposalId: any,
    votingOption: number
  ) => {
    try {
      handleModal({
        open: true,
        status: VotingStatus.LOADING,
        fee: new BigNumber(0)
      })

      const { gasFee, result } = await voteProposal(
        voterAddress,
        proposalId,
        votingOption
      )

      handleModal({
        open: true,
        status: VotingStatus.SUCCESS,
        title,
        id,
        type: votingOption,
        fee: new BigNumber(gasFee),
        hash: result.transactionHash
      })
    } catch (error) {
      handleModal({
        open: true,
        status: VotingStatus.FAILURE,
        fee: new BigNumber(0)
      })
    }
  }

  const handleProposalType = (voteValue: string) => {
    setVote(voteValue)
  }

  const handleClose = () => {
    handleModal({
      ...initialModalState
    })
  }

  return (
    <ModalContainer>
      <Typography variant="h5" fontWeight={900} textAlign="center">
        Vote for Proposal
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
          <Typography
            sx={{ marginBottom: '10px' }}
            variant="body2"
            fontWeight={700}
          >
            Vote with
          </Typography>
          <Dropdown selectedValue={handleProposalType} data={VotingTypes} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmitVote(address, id, Number(vote))}
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

export default Vote
