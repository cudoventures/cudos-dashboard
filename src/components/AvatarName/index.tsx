import { Typography } from '@mui/material'
import Avatar from '../Avatar'
import StyledAvatarNameContainer from './styles'

type AvatarNameProps = {
  address: string
  name: string
  imageUrl?: string
}

const AvatarName: React.FC<AvatarNameProps> = ({ address, name, imageUrl }) => {
  return (
    <StyledAvatarNameContainer>
      <Avatar address={address} imageUrl={imageUrl} />
      <Typography variant="body2" fontWeight={600}>
        {name}
      </Typography>
    </StyledAvatarNameContainer>
  )
}

export default AvatarName
