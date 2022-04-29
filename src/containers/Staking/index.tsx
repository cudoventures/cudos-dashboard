import { Typography } from '@mui/material'

import Validators from './components/Validators'
import { StakingContainer, ValidatorsContainer } from './styles'

const Staking = () => {
  return (
    <StakingContainer>
      <Typography fontSize={30} letterSpacing={1} fontWeight={700}>
        Staking
      </Typography>
      <Typography
        variant="subtitle2"
        fontWeight={700}
        letterSpacing={2}
        color="text.secondary"
      >
        Here are displayed the validators to which you can delegate CUDOS
      </Typography>
      <ValidatorsContainer>
        <Validators />
      </ValidatorsContainer>
    </StakingContainer>
  )
}

export default Staking
