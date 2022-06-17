import { Typography, Box } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import _ from 'lodash'
import { InputContainer } from '../styles'
import useModal from '../hooks'

const UpdateClient = () => {
  const [event, setEvent] =
    useState<ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>()

  const { modal, handleModal } = useModal()

  const { proposalData } = useSelector(
    (state: RootState) => state.proposalsModal.modal
  )

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e) {
      handleModal({
        ...modal,
        proposalData: { ...proposalData, [e.target.name]: e.target.value }
      })
    }
  }

  const delayInput = _.debounce((value) => handleChange(value), 500)

  useEffect(() => {
    delayInput(event)

    return () => delayInput.cancel()
  }, [event])

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography variant="body2" fontWeight={700}>
        Description
      </Typography>
      <Box gap={1} display="flex">
        <InputContainer
          multiline
          onChange={(e) => setEvent(e)}
          name="description"
          rows={3}
          placeholder="e.g. This governance proposal is to..."
          disableUnderline
          fullWidth
        />
      </Box>
      <Box>
        <Typography
          sx={{ marginBottom: '10px' }}
          variant="body2"
          fontWeight={700}
        >
          Subject client ID
        </Typography>
        <Box gap={1} display="flex">
          <InputContainer
            placeholder="e.g. Subject client ID: {client-type}-{N}"
            disableUnderline
            onChange={(e) => setEvent(e)}
            name="subjectClientId"
            fullWidth
          />
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{ marginBottom: '10px' }}
          variant="body2"
          fontWeight={700}
        >
          Substitute client ID
        </Typography>
        <Box gap={1} display="flex">
          <InputContainer
            placeholder="e.g. Substitute client ID: {client-type}-{N}"
            disableUnderline
            onChange={(e) => setEvent(e)}
            name="substituteClientId"
            fullWidth
          />
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{ marginBottom: '10px' }}
          variant="body2"
          fontWeight={700}
        >
          Deposit amount
        </Typography>
        <Box gap={1} display="flex">
          <InputContainer
            type="number"
            placeholder="0.0"
            onChange={(e) => setEvent(e)}
            name="depositAmount"
            disableUnderline
            fullWidth
          />
        </Box>
      </Box>
    </Box>
  )
}

export default UpdateClient
