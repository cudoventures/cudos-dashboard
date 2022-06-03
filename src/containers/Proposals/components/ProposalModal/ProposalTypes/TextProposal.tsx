import { Typography, Box } from '@mui/material'
import { InputContainer } from '../styles'

const TextProposal = () => {
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
            name=""
            multiline
            rows={3}
            placeholder="e.g. This governance proposal is to..."
            disableUnderline
            fullWidth
          />
        </Box>
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            sx={{ marginBottom: '10px' }}
            variant="body2"
            fontWeight={700}
          >
            Note
          </Typography>
          <Typography
            sx={{ marginBottom: '10px' }}
            variant="body2"
            fontWeight={600}
            color="text.secondary"
          >
            Optional
          </Typography>
        </Box>
        <Box gap={1} display="flex">
          <InputContainer
            multiline
            rows={3}
            placeholder="e.g. Add ability to..."
            disableUnderline
            fullWidth
          />
        </Box>
      </Box>
    </>
  )
}

export default TextProposal
