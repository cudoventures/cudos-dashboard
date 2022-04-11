import { styled } from '@mui/material'

const AvatarContainer = styled('div')(({ theme }) => ({
  width: '28px',
  height: '28px',
  minWidth: '28px',
  minHeight: '28px',
  borderRadius: '50%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center'
  }
}))

export default AvatarContainer
