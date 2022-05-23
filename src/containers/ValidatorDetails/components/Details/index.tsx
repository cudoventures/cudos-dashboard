import { Box } from '@mui/material'
import ValidatorAvatar from './components/Avatar'
import ValidatorInfo from './components/ValidatorInfo'

const Details = () => {
  return (
    <Box display="flex" gap={2}>
      <ValidatorAvatar />
      <ValidatorInfo />
    </Box>
  )
}

export default Details
