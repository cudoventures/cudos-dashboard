import { Typography } from '@mui/material'
import Avatar from '../Avatar'
import AvatarNameContainer from './styles'

type AvatarNameProps = {
  address: string
  name: string
  imageUrl?: string
}

const AvatarName: React.FC<AvatarNameProps> = ({ address, name, imageUrl }) => {
  return (
    <AvatarNameContainer>
      <Avatar address={address} imageUrl={imageUrl} />
      <Typography variant="body2" fontWeight={600}>
        {name}
      </Typography>
    </AvatarNameContainer>
  )
}

export default AvatarName
