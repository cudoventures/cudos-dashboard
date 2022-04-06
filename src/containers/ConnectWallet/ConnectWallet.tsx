import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import InfoIcon from '../../assets/vectors/info-icon.svg'
import KeplrLogo from '../../assets/vectors/keplr-logo.svg'
import Header from '../../components/Layout/Header'

import { styles } from './styles'

const ConnectWallet = () => {
  return (
    <Box style={{ backgroundImage: 'url(/src/assets/background.svg)' }}>
      <Header />
      <Box style={styles.connectContainer}>
        <Box>
          <h1>Welcome to CUDOS Wallet!</h1>
        </Box>
        <Box style={styles.subHeaderContainer}>
          <Typography variant="subtitle1" color="text.secondary">
            CUDOS Wallet allows you to manage your CUDOS easily. <br /> In order
            to continue you need to connect your Keplr Wallet.
          </Typography>
        </Box>
        <Box>
          <Button style={styles.connectButton}>
            <img style={styles.keplrLogo} src={KeplrLogo} alt="Keplr Logo" />
            Connect Keplr wallet
          </Button>
        </Box>
        <Box style={styles.pluginWarning} color="primary.main">
          <img style={styles.infoIcon} src={InfoIcon} alt="Info" />
          Make sure you have Keplr plugin downloaded.
        </Box>
      </Box>
    </Box>
  )
}

export default ConnectWallet
