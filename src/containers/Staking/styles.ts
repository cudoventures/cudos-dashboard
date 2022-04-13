import { styled, Box } from '@mui/material'

export const StakingContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  gap: 10
}))

export const ValidatorsContainer = styled(Box)(() => ({
  overflow: 'hidden',
  display: 'flex',
  flexGrow: 1,
  borderRadius: '20px'
}))
