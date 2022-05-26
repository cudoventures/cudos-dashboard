import { Box, Typography } from '@mui/material'
import ActivityTable from './components/Table'
import ActivityTabs from './components/Tabs'

import { styles } from './styles'

const Activity = () => {
  return (
    <Box sx={styles.activityContainer}>
      <Box display="flex" justifyContent="space-between">
        <Typography
          letterSpacing={1}
          fontWeight={700}
          color="text.secondary"
          textTransform="uppercase"
          fontSize="14px"
        >
          Activity
        </Typography>
        <ActivityTabs />
      </Box>
      <ActivityTable />
    </Box>
  )
}

export default Activity
