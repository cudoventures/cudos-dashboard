import React from 'react'
import { Typography } from '@mui/material'
import OnlineStatus from '../../assets/vectors/online-status.svg'

import { StyledNetwork } from './styles'

const NetworkInfo = () => {
  return (
    <StyledNetwork sx={{ marginRight: '20px' }}>
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        CUDOS Mainnet
        <img
          style={{ marginLeft: '10px' }}
          src={OnlineStatus}
          alt="Online Status"
        />
      </Typography>
    </StyledNetwork>
  )
}

export default NetworkInfo
