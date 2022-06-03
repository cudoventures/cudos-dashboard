import { Box, Typography, Button } from '@mui/material'
import { InputContainer } from '../styles'

const IBCUpgrade = () => {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography variant="body2" fontWeight={700}>
        Description
      </Typography>
      <Box gap={1} display="flex">
        <InputContainer
          multiline
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
            <input accept=".json" type="file" hidden />
          </Button>
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
            disableUnderline
            fullWidth
          />
        </Box>
      </Box>
    </Box>
  )
}

export default IBCUpgrade
