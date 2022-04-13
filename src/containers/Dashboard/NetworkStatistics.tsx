import { Box, Typography } from '@mui/material'
import React from 'react'

import Card from '../../components/Card/Card'

import { styles } from './styles'

const NetworkStatistics = () => {
  return (
    <Card style={styles.networkStatisticsCard}>
      <Box>
        <Box sx={{ marginBottom: '30px' }}>
          <Typography style={styles.subheaderStyle} color="text.secondary">
            NETWORK STATISTICS
          </Typography>
        </Box>
        <Box style={styles.networkCardStyle}>
          <Typography
            color="text.secondary"
            style={styles.networkCardTitleStyle}
          >
            REWARDS
          </Typography>
          <Typography style={styles.networkCardContentStyle}>11%</Typography>
          <Typography
            color="primary.main"
            style={styles.networkCardFooterStyle}
          >
            Annual Percentage Rate
          </Typography>
        </Box>
        <Box style={styles.networkCardStyle}>
          <Typography
            color="text.secondary"
            style={styles.networkCardTitleStyle}
          >
            TOTAL AMOUNT STAKED
          </Typography>
          <Typography style={styles.networkCardContentStyle}>
            20,160,261,982.41
          </Typography>
          <Typography
            color="primary.main"
            style={styles.networkCardFooterStyle}
          >
            CUDOS
          </Typography>
        </Box>
        <Box style={styles.networkCardStyle}>
          <Typography
            color="text.secondary"
            style={styles.networkCardTitleStyle}
          >
            ACTIVE VALIDATORS
          </Typography>
          <Typography style={styles.networkCardContentStyle}>15</Typography>
          <Typography
            color="primary.main"
            style={styles.networkCardFooterStyle}
          >
            All validators: 36
          </Typography>
        </Box>
        <Box style={styles.networkCardStyle}>
          <Typography
            color="text.secondary"
            style={styles.networkCardTitleStyle}
          >
            ONLINE VOTING POWER
          </Typography>
          <Typography style={styles.networkCardContentStyle}>99.99%</Typography>
          <Typography
            color="primary.main"
            style={styles.networkCardFooterStyle}
          >
            72,544,241 / 72,544,259
          </Typography>
        </Box>
        <Box style={{ marginBottom: '0px' }} sx={styles.networkCardStyle}>
          <Typography
            color="text.secondary"
            style={styles.networkCardTitleStyle}
          >
            LATEST BLOCK
          </Typography>
          <Typography style={styles.networkCardContentStyle}>
            2,345,699
          </Typography>
          <Typography
            color="primary.main"
            style={styles.networkCardFooterStyle}
          >
            BLOCK
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default NetworkStatistics
