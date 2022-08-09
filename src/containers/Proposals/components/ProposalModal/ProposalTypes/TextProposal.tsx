import { Typography, Box } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { RootState } from 'store'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { InputContainer } from '../styles'
import useModal from '../hooks'

const TextProposal = () => {
  const [event, setEvent] =
    useState<ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>()

  const { modal, handleModal } = useModal()

  const { proposalData } = useSelector(
    (state: RootState) => state.modal.proposal
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
    <>
      <Box>
        <Typography
          sx={{ marginBottom: '10px' }}
          variant="body2"
          fontWeight={700}
        >
          Description
        </Typography>
        <Box gap={1} display="flex">
          <InputContainer
            name="description"
            onChange={(e) => setEvent(e)}
            multiline
            rows={3}
            placeholder="e.g. This governance proposal is to..."
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
    </>
  )
}

export default TextProposal
