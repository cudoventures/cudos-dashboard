import React from 'react'
import { Typography } from '@mui/material'
import Card from '../../components/Card/Card'
import Table from '../../components/Table'
import { dummyColNames, dummyData } from '../../utils/dummyData'

import { styles } from './styles'

const LatestActivity = () => {
  return (
    <Card style={styles.latestActivityCard}>
      <Typography
        sx={{ marginBottom: '20px' }}
        style={styles.subheaderStyle}
        color="text.secondary"
      >
        LATEST ACTIVITY
      </Typography>
      <Table items={dummyData} columns={dummyColNames} />
    </Card>
  )
}

export default LatestActivity
