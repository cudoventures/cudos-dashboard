import { styled, Box } from '@mui/material'

const NavigationContainer = styled(Box)(({ theme }) => ({
  background: theme.custom.backgrounds.dark,
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  position: 'sticky',
  top: 0,
  overflow: 'hidden',
  zIndex: 1,
  paddingBottom: '0.5rem'
}))

export default NavigationContainer
