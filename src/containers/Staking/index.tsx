import { Box, Typography, Fade } from '@mui/material'

import Validators from './components/Validators'
import { styles } from './styles'

const Staking = () => {
  return (
    <Fade in timeout={500}>
      <Box sx={styles.stakingContainer}>
        <Box
          position="sticky"
          top={0}
          sx={({ custom }) => ({
            background: custom.backgrounds.dark,
            zIndex: 1,
            paddingBottom: '1rem'
          })}
        >
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
        </Box>
        <Box sx={styles.validatorsContainer}>
          <Validators />
        </Box>
      </Box>
    </Fade>
  )
}

export default Staking
