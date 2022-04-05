import { Box, Typography } from '@mui/material'

const Staking = () => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700}>
        Staking
      </Typography>
      <Typography variant="h6" fontWeight={500} color="text.secondary">
        Here are displayed the validator to which you can delegate CUDOS tokens
      </Typography>
    </Box>
  )
}

export default Staking
