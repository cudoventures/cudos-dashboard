import { Box, Typography, Fade, useMediaQuery } from '@mui/material'
import theme from 'theme'
import Form from './components/Form'
import Activity from './components/Activity'

import { styles } from './styles'
import FaucetModal from './components/FaucetModal'

const Faucet = () => {
  const isBigScreen = useMediaQuery(theme.dark.breakpoints.only('xl'))

  return (
    <Fade in timeout={500}>
      <Box
        style={{ maxWidth: isBigScreen ? '50vw' : '85vw' }}
        sx={styles.faucetContainer}
      >
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
        <Box display="flex" gap={2} sx={{ maxHeight: '500px' }}>
          <Form />
          <Activity />
          <FaucetModal />
        </Box>
      </Box>
    </Fade>
  )
}

export default Faucet
