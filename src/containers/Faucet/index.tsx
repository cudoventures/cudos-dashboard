import { Box, Typography, Fade } from '@mui/material'
import Form from './components/Form'
import Activity from './components/Activity'

import { styles } from './styles'

const Staking = () => {
  return (
    <Fade in timeout={500}>
      <Box sx={styles.faucetContainer}>
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
            Faucet
          </Typography>
          <Typography
            variant="subtitle2"
            fontWeight={700}
            letterSpacing={2}
            color="text.secondary"
          >
            Here your can recieve tokens for testing and development purposes
          </Typography>
        </Box>
        <Box display="flex" gap={2} overflow="hidden">
          <Form />
          <Activity />
        </Box>
      </Box>
    </Fade>
  )
}

export default Staking
