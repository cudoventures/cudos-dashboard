import { Box, Typography } from '@mui/material'
import OnlineStatus from 'assets/vectors/online-status.svg'

import { styles } from './styles'

const NetworkInfo = () => {
  return (
    <Box sx={styles.networkContainer}>
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {import.meta.env.VITE_APP_CHAIN_NAME}
        <img
          style={{ marginLeft: '10px' }}
          src={OnlineStatus}
          alt="Online Status"
        />
      </Typography>
    </Box>
  )
}

export default NetworkInfo
