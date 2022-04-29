import { Box } from '@mui/material'

import Tabs from './components/Tabs'
import TableContainer from './components/Table/styles'
import ValidatorsTable from './components/Table'
import ValidatorsCount from './components/Count'
import DelegationModal from './components/DelegationModal'

const Validators = () => {
  return (
    <TableContainer>
      <Box display="flex" justifyContent="space-between">
        <ValidatorsCount />
        <Tabs />
      </Box>
      <Box
        sx={{ display: 'flex', overflow: 'hidden', flexDirection: 'column' }}
      >
        <ValidatorsTable />
      </Box>
      <DelegationModal />
    </TableContainer>
  )
}

export default Validators
