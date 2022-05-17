import { Box, Typography } from '@mui/material'
import DelegatorsTable from './components/Table'
import DelegatorsTabs from './components/Tabs'
import DelegatorsContainer from './styles'

const Delegators = () => {
  return (
    <DelegatorsContainer>
      <Box display="flex" justifyContent="space-between">
        <Typography
          letterSpacing={1}
          fontWeight={700}
          color="text.secondary"
          textTransform="uppercase"
          fontSize="14px"
        >
          Delegators
        </Typography>
        <DelegatorsTabs />
      </Box>
      <DelegatorsTable />
    </DelegatorsContainer>
  )
}

export default Delegators
