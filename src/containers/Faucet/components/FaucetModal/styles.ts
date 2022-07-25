import { styled, Box } from '@mui/material'
import { CancelRounded } from '@mui/icons-material'

export const CancelRoundedIcon = styled(CancelRounded)(({ theme }) => ({
  color: theme.palette.text.secondary,
  position: 'absolute',
  top: 32,
  right: 32,
  cursor: 'pointer'
}))

export const ModalContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '32px',
  background: theme.custom.backgrounds.primary,
  padding: '30px 57px',
  borderRadius: '20px',
  boxShadow: '2px 10px 20px rgba(2, 6, 20, 0.6)',
  zIndex: 1,
  minWidth: '540px'
}))
