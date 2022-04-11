import { Typography } from '@mui/material'

import Validators from './components/Validators'
import { StakingContainer, ValidatorsContainer } from './styles'

const Staking = () => {
  return (
    <StakingContainer>
      <Typography variant="h5" fontWeight={700}>
        Staking
      </Typography>
      <Typography variant="subtitle1" fontWeight={500} color="text.secondary">
        Here are displayed the validator to which you can delegate CUDOS tokens
      </Typography>
      <ValidatorsContainer>
        <Validators />
      </ValidatorsContainer>
    </StakingContainer>
  )
}

export default Staking
