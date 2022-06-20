import { Box } from '@mui/material'
import ActivityTable from './components/Table'
import Header from './components/Header'
import { useActivity } from './hooks'

import { styles } from './styles'

const Activity = () => {
  const { state, loadNextPage, filterByType } = useActivity()

  return (
    <Box sx={styles.activityContainer}>
      <Header filter={state.filter} filterByType={filterByType} />
      <ActivityTable
        loadNextPage={loadNextPage}
        filterByType={filterByType}
        data={state.data}
        hasNextPage={state.hasNextPage}
        isNextPageLoading={state.isNextPageLoading}
      />
    </Box>
  )
}

export default Activity
