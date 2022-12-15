import { styled, Box, TextField, BoxProps } from '@mui/material'
import { CancelRounded } from '@mui/icons-material'
import { COLORS_DARK_THEME } from 'theme/colors'

export const StyledTextField = styled(TextField)(({ theme }) => ({
  background: theme.custom.backgrounds.dark,
  borderRadius: '5px',
  fontSize: '12px',
  padding: '11px 16px'
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

interface ExtendedBoxProps extends BoxProps {
  show?: boolean
}

export const SummaryContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'show'
})<ExtendedBoxProps>(({ theme, show }) => ({
  width: '85%',
  display: 'flex',
  gap: '1rem',
  flexDirection: 'column',
  padding: show ? '20px 40px' : 0,
  margin: 'auto',
  background: theme.custom.backgrounds.light,
  boxShadow: '0px 4px 30px rgba(9, 36, 126, 0.1)',
  borderBottomLeftRadius: '20px',
  borderBottomRightRadius: '20px',
  transition: 'all .3s ease-in',
  maxHeight: show ? '200px' : 0
}))

export const CancelRoundedIcon = styled(CancelRounded)(({ theme }) => ({
  color: theme.palette.text.secondary,
  position: 'absolute',
  top: 32,
  right: 32,
  cursor: 'pointer'
}))

export const customInputStyle = {
  color: 'white',
  outline: 'none',
  border: '0px',
  background: COLORS_DARK_THEME.LIGHT_BACKGROUND,
  height: '30px',
  width: '100%',
  padding: '0 10px'
}
