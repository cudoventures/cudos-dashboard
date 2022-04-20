import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import Card from '../../components/Card/Card'
import CudosLogo from '../../assets/vectors/cudos-logo.svg'

import { styles } from './styles'

const WalletBalance = () => {
  return (
    <Card style={styles.walletBalanceCard}>
      <Box>
        <Box sx={{ marginBottom: '30px' }}>
          <Typography style={styles.subheaderStyle} color="text.secondary">
            WALLET BALANCE
          </Typography>
        </Box>
        <Box style={styles.networkCardStyle}>
          <Typography
            color="text.secondary"
            sx={styles.networkCardTitleStyle}
            style={{ marginBottom: '15px' }}
          >
            TOTAL BALANCE
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography
              sx={{ display: 'flex' }}
              style={styles.networkCardContentStyle}
            >
              <img
                style={{ marginRight: '5px' }}
                src={CudosLogo}
                alt="Cudos Logo"
              />
              2,517.5
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ marginLeft: '5px' }}
              style={styles.networkCardContentStyle}
            >
              CUDOS
            </Typography>
            <Typography
              color="primary.main"
              sx={{ marginLeft: '5px' }}
              style={styles.amountDollarStyle}
            >
              $115.76
            </Typography>
          </Box>
        </Box>
        <Box style={{ marginBottom: '0px' }} sx={styles.networkCardStyle}>
          <Typography color="text.secondary" sx={styles.networkCardTitleStyle}>
            AVAILABLE REWARDS
            <Box
              style={{ display: 'flex', justifyContent: 'flex-end', flex: '1' }}
            >
              <Button style={styles.claimButtonStyle}>Claim</Button>
            </Box>
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography
              sx={{ display: 'flex' }}
              style={styles.networkCardContentStyle}
            >
              <img
                style={{ marginRight: '5px' }}
                src={CudosLogo}
                alt="Cudos Logo"
              />
              517.5
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ marginLeft: '5px' }}
              style={styles.networkCardContentStyle}
            >
              CUDOS
            </Typography>
            <Typography
              color="primary.main"
              sx={{ marginLeft: '5px' }}
              style={styles.amountDollarStyle}
            >
              $20.76
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default WalletBalance
