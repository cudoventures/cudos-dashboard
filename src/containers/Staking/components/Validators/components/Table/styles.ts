import { styled, Box } from '@mui/material'

const TableContainer = styled(Box)(({ theme }) => ({
  background: theme.custom.backgrounds.primary,
  padding: '1.2rem',
  borderRadius: '1.3rem',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  gap: 10
}))

export default TableContainer
