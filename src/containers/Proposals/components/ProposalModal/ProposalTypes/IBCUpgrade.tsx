import { Typography, Box, Button } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import _ from 'lodash'
import { InputContainer } from '../styles'
import useModal from '../hooks'

const IBCUpgrade = () => {
  const [event, setEvent] =
    useState<ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>()

  const { modal, handleModal } = useModal()

  const { proposalData } = useSelector(
    (state: RootState) => state.proposalsModal.modal
  )

  let fileReader: any = null

  const handleFileRead = () => {
    const content = fileReader?.result
    handleModal({
      ...modal,
      proposalData: {
        ...proposalData,
        ibcUpgradeFile: JSON.parse(content)
      }
    })
  }

  const handleUpload = (e: any) => {
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(e.target.files[0])
  }

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
          Upgrade name
        </Typography>
        <Box gap={1} display="flex">
          <InputContainer
            placeholder="Upgrade name"
            onChange={(e) => setEvent(e)}
            name="upgradeName"
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
          Target height to upgrade at
        </Typography>
        <Box gap={1} display="flex">
          <InputContainer
            type="number"
            placeholder="e.g. height 1,234,567"
            onChange={(e) => setEvent(e)}
            name="upgradeHeight"
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
          Upgrade info
        </Typography>
        <Box gap={1} display="flex">
          <InputContainer
            placeholder="Upgrade info"
            onChange={(e) => setEvent(e)}
            name="upgradeInfo"
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
          Please select {`<UpgradedClientState>.json`}
        </Typography>
        <Box>
          <Button
            sx={{ width: '150px' }}
            variant="contained"
            component="label"
            color="primary"
          >
            {' '}
            Upload a file
            <input
              accept=".json"
              type="file"
              onChange={(e) => handleUpload(e)}
              hidden
            />
          </Button>
        </Box>
      </Box>
      {proposalData.ibcUpgradeFile ? (
        <Box>
          <Typography>{proposalData.ibcUpgradeFile.lastModified}</Typography>
        </Box>
      ) : null}
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
            onChange={(e) => setEvent(e)}
            name="depositAmount"
            placeholder="0.0"
            disableUnderline
            fullWidth
          />
        </Box>
      </Box>
    </Box>
  )
}

export default IBCUpgrade
