import { styled, Box } from '@mui/material'

const AvatarNameContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '10px',
  '& p': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  '&:hover': {
    cursor: 'pointer'
  }
}))

export default AvatarNameContainer
