import { styled, Box, ToggleButton } from '@mui/material'
import calculateRem from '../../utils/calculateRem'

export const StyledBox = styled(Box)(({ theme }) => ({
  background: theme.backgrounds.primary,
  width: `${calculateRem(88)}rem`,
  borderRadius: `${calculateRem(20)}rem`,
  height: '100%',
  padding: `${calculateRem(20)}rem 0`
}))

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  padding: `${calculateRem(16)}rem`,
  height: `${calculateRem(48)}rem`,
  width: `${calculateRem(48)}rem`,
  borderRadius: `${calculateRem(10)}rem`,
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
