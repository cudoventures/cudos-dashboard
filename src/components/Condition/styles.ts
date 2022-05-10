import { styled } from '@mui/material'

const ConditionContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'color'
})<{ color: string }>(({ theme, color }) => ({
  width: '10px',
  height: '10px',
  background:
    theme.custom.conditions[color as keyof typeof theme.custom.conditions],
  margin: '0 auto',
  borderRadius: '50%'
}))

export default ConditionContainer
