import { Box } from '@mui/material'

import useValidators from '../../hooks'
import Tabs from './components/Tabs'

import TableContainer from './components/Table/styles'
import ValidatorsTable from './components/Table'
import ValidatorsCount from './components/Count'
import DelegationModal from './components/DelegationModal'

const Validators = () => {
  const { state, handleTabChange, handleSort, sortItems, handleModal } =
    useValidators()

  const items = sortItems(state.items)

  return (
    <TableContainer>
      <Box display="flex" justifyContent="space-between">
        <ValidatorsCount count={state.items.length} />
        <Tabs handleTabChange={handleTabChange} tab={state.tab} />
      </Box>
      <Box
        sx={{ display: 'flex', overflow: 'hidden', flexDirection: 'column' }}
      >
        <ValidatorsTable
          sortDirection={state.sortDirection}
          sortKey={state.sortKey}
          handleSort={handleSort}
          handleModal={handleModal}
          items={items}
        />
      </Box>
      <DelegationModal modalProps={state.modal} handleModal={handleModal} />
    </TableContainer>
  )
}

export default Validators
