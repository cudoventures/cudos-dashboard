import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import ValidatorAvatar from './components/Avatar'
import ValidatorInfo from './components/ValidatorInfo'
import { useValidatorDetails } from './hooks'

const Details: React.FC = () => {
  const { state } = useValidatorDetails()
  const overview = useSelector(
    (reduxState: RootState) => reduxState.validatorDetails
  )

  return (
    <Box display="flex" gap={2}>
      <ValidatorAvatar overview={overview} />
      <ValidatorInfo overview={overview} status={state.status} />
    </Box>
  )
}

export default Details
