import { Avatar, Box, Typography } from '@mui/material'
import TestAvatar from 'assets/vectors/test-avatar.svg'
import Card from 'components/Card/Card'

const ValidatorAvatar = () => {
  return (
    <Card
      style={{
        minWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4
      }}
    >
      <Avatar
        src={TestAvatar}
        alt="Avatar"
        sx={{
          width: '120px',
          height: 'auto'
        }}
      />
      <Box display="flex" alignItems="center" flexDirection="column">
        <Typography fontWeight={700} lineHeight="30px" letterSpacing={1}>
          cudos-validator
        </Typography>
        <Typography color="text.secondary">100% UPTIME</Typography>
      </Box>
    </Card>
  )
}

export default ValidatorAvatar
