import { Typography, Box } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { RootState } from 'store'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { InputContainer } from '../styles'
import useModal from '../hooks'

const ParameterChange = () => {
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

  const delayInput = _.debounce((value) => handleChange(value), 250)

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
          name="description"
          onChange={(e) => setEvent(e)}
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
          Change subspace
        </Typography>
        <Box gap={1} display="flex">
          <InputContainer
            placeholder="Change subspace"
            name="changeSubspace"
            onChange={(e) => setEvent(e)}
            disableUnderline
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
          Change key
        </Typography>
        <Box gap={1} display="flex">
          <InputContainer
            placeholder="Change key"
            name="changeKey"
            onChange={(e) => setEvent(e)}
            disableUnderline
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
          Change Value
        </Typography>
        <Box gap={1} display="flex">
          <InputContainer
            placeholder="Change Value"
            type="number"
            name="changeValue"
            onChange={(e) => setEvent(e)}
            disableUnderline
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
            name="depositAmount"
            onChange={(e) => setEvent(e)}
            placeholder="0.0"
            disableUnderline
            fullWidth
          />
        </Box>
      </Box>
    </Box>
  )
}

export default ParameterChange
