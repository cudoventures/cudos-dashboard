import { Box, Typography } from '@mui/material'
import Card from 'components/Card'
import Avatar from 'components/Avatar'
import { OverviewType } from '../../types'

type AvatarProps = {
  overview: OverviewType
}

const ValidatorAvatar: React.FC<AvatarProps> = ({ overview }) => {
  const { moniker, avatarUrl, operatorAddress } = overview

  return (
    <Card
      sx={{
        minWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4
      }}
    >
      <Box sx={{ width: '120px', height: '120px' }}>
        <Avatar address={operatorAddress} imageUrl={avatarUrl} />
      </Box>
      <Box display="flex" alignItems="center" flexDirection="column">
        <Typography fontWeight={700} lineHeight="30px" letterSpacing={1}>
          {moniker}
        </Typography>
      </Box>
    </Card>
  )
}

export default ValidatorAvatar
