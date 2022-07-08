import { styled, Box, TextField, BoxProps, Input } from '@mui/material'
import { CancelRounded } from '@mui/icons-material'

export const StyledTextField = styled(TextField)(({ theme }) => ({
  background: theme.custom.backgrounds.dark,
  borderRadius: '5px',
  fontSize: '12px',
  padding: '11px 16px'
}))

export const InputContainer = styled(Input)(() => ({
  background: '#28314E',
  padding: '10px 20px 10px 20px',
  borderRadius: '5px',
  '&:before': {
    border: 'none'
  },
  '&:after': {
    border: 'none'
  }
}))

export const ModalContainer = styled(Box)(({ theme }) => ({
  margin: 'auto',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '30px',
  background: theme.custom.backgrounds.primary,
  padding: '30px 57px',
  borderRadius: '20px',
  boxShadow: '2px 10px 20px rgba(2, 6, 20, 0.6)',
  zIndex: 1,
  minWidth: '540px',
  overflow: 'auto'
}))

export const CancelRoundedIcon = styled(CancelRounded)(({ theme }) => ({
  color: theme.palette.text.secondary,
  position: 'absolute',
  top: 32,
  right: 32,
  cursor: 'pointer'
}))
