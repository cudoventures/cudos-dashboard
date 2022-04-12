import React from 'react'
import { Typography } from '@mui/material'
import Card from '../../components/Card/Card'

import { styles } from './styles'

const LatestActivity = () => {
  return (
    <Card style={styles.latestActivityCard}>
      <Typography style={styles.subheaderStyle} color="text.secondary">
        LATEST ACTIVITY
      </Typography>
    </Card>
  )
}

export default LatestActivity
