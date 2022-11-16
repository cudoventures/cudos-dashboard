import { Box, Tooltip, Typography } from '@mui/material'
import Card from 'components/Card'
import Avatar from 'components/Avatar'
import { addEndingEllipsis } from 'utils/projectUtils'
import { OverviewType } from '../../types'

type AvatarProps = {
  overview: OverviewType
}

const ValidatorAvatar: React.FC<AvatarProps> = ({ overview }) => {
  const { moniker, avatarUrl, operatorAddress } = overview

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        textAlign: 'center'
      }}
    >
      <Box sx={{ width: '120px', height: '130px' }}>
        <Avatar address={operatorAddress} imageUrl={avatarUrl} />
      </Box>
      <Box display="flex" alignItems="center" flexDirection="column">
        <Typography fontWeight={700} lineHeight="30px" letterSpacing={1}>
          {moniker.length > 25 ? (
            <Tooltip
              title={moniker}
              placement="right"
              componentsProps={{
                tooltip: {
                  sx: {
                    background: 'white',
                    color: 'black',
                    padding: '13px 20px',
                    fontSize: '14px',
                    fontWeight: 700,
                    borderRadius: '15px'
                  }
                }
              }}
            >
              <Box sx={{ cursor: 'pointer' }}>
                {' '}
                {addEndingEllipsis(moniker, { begining: 22 })}{' '}
              </Box>
            </Tooltip>
          ) : (
            moniker
          )}
        </Typography>
      </Box>
    </Card>
  )
}

export default ValidatorAvatar
