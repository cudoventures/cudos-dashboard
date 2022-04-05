import { styled, Box, ToggleButton } from '@mui/material'

export const StyledBox = styled(Box)(({ theme }) => ({
  background: theme.backgrounds.primary,
  width: '5.5rem',
  borderRadius: '1.3rem',
  height: '100%',
  padding: '1.3rem 0'
}))

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  padding: '1rem',
  height: '3rem',
  width: '3rem',
  borderRadius: '10px',
  '&:hover': {
    backgroundColor: theme.backgrounds.light
  },
  border: 'none',
  '&.Mui-selected': {
    background: theme.backgrounds.light,
    color: theme.palette.primary.main,
    '&:focus': {
      backgroundColor: theme.backgrounds.light
    },
    '&:hover': {
      backgroundColor: theme.backgrounds.light
    }
  }
}))

export const StyledFooter = styled(Box)(() => ({
  position: 'fixed',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  bottom: 0,
  right: 0,
  left: 0,
  width: 'inherit',
  padding: '2rem 4rem'
}))
