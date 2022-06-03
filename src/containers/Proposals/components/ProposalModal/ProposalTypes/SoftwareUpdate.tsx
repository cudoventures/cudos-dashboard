import { Typography, Box } from '@mui/material'
import { InputContainer } from '../styles'

const SoftwareUpdate = () => {
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
          Plan name
        </Typography>
        <Box gap={1} display="flex">
          <InputContainer placeholder="Plan name" disableUnderline fullWidth />
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{ marginBottom: '10px' }}
          variant="body2"
          fontWeight={700}
        >
          Plan height
        </Typography>
        <Box gap={1} display="flex">
          <InputContainer
            placeholder="Plan height"
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
          Plan info
        </Typography>
        <Box gap={1} display="flex">
          <InputContainer placeholder="Plan info" disableUnderline fullWidth />
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

export default SoftwareUpdate
