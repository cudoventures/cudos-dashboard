import { styled } from '@mui/material'

const StyledCondition = styled('div')(({ theme, color }) => ({
  width: '10px',
  height: '10px',
  background: theme.custom.conditions[color],
  margin: '0 auto',
  borderRadius: '50%'
}))

export default StyledCondition
