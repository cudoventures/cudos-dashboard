import { Box, Typography, Fade, useMediaQuery, Grid } from '@mui/material'
import theme from 'theme'
import Form from './components/Form'
import Activity from './components/Activity'

import { styles } from './styles'
import FaucetModal from './components/FaucetModal'

const Faucet = () => {
  const isVeryBigScreen = useMediaQuery(theme.dark.breakpoints.up('xl'))

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
        <Box sx={{ marginTop: "20vh" }}>
          <Grid
            justifyContent="center"
            gap={2}
            container
          >
            <Grid item lg={4} xl={3} md={12} sm={12} xs={12}>
              <Form />
            </Grid>
            <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
              <Activity />
            </Grid>
            <FaucetModal />
          </Grid>
        </Box>
      </Box>
    </Fade>
  )
}

export default Faucet
