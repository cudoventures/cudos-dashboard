import { Box } from '@mui/material'

import Tabs from './components/Tabs'
import ValidatorsTable from './components/Table'
import ValidatorsCount from './components/Count'
import DelegationModal from './components/DelegationModal'

const Validators = () => {
  return (
    <Box
      sx={({ custom }) => ({
        background: custom.backgrounds.primary,
        padding: '1.2rem',
        borderRadius: '1.3rem',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        gap: 1
      })}
    >
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
    </Box>
  )
}

export default Validators
