import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BigNumber from 'bignumber.js'
import { RootState } from 'store'
import { updateUserTransactions } from 'store/userTransactions'
import { fetchRewards } from 'api/getRewards'
import { updateUser } from 'store/profile'
import { ConnectLedger } from 'ledgers/KeplrLedger'
import { getWalletBalance } from 'utils/projectUtils'
import InfoIcon from 'assets/vectors/info-icon.svg'
import KeplrLogo from 'assets/vectors/keplr-logo.svg'
import Header from 'components/Layout/Header'

import { styles } from './styles'

const ConnectWallet = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { lastLoggedAddress } = useSelector((state: RootState) => state.profile)

  const connect = async () => {
    try {
      const { address } = await ConnectLedger()
      if (address !== lastLoggedAddress) {
        dispatch(updateUserTransactions({ offsetCount: 0, data: [] }))
      }
      const balance = await getWalletBalance(address)
      const { totalRewards, validatorArray } = await fetchRewards(address)

      dispatch(
        updateUser({
          address,
          lastLoggedAddress: address,
          balance: new BigNumber(balance),
          availableRewards: new BigNumber(totalRewards),
          stakedValidators: validatorArray
        })
      )
      navigate('dashboard')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Box sx={styles.backgroundStyle}>
      <Header />
      <Box>
        <Box sx={styles.connectContainer}>
          <Box>
            <h1>Welcome to CUDOS Dashboard!</h1>
          </Box>
          <Box sx={styles.subHeaderContainer}>
            <Typography variant="subtitle1" color="text.secondary">
              CUDOS Dashboard allows you to manage your CUDOS easily. <br /> In
              order to continue you need to connect your Keplr Wallet.
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => connect()}
              sx={styles.connectButton}
            >
              <img style={styles.keplrLogo} src={KeplrLogo} alt="Keplr Logo" />
              Connect Keplr wallet
            </Button>
          </Box>
          <Box sx={styles.pluginWarning} color="primary.main">
            <img style={styles.infoIcon} src={InfoIcon} alt="Info" />
            Make sure you have Keplr plugin downloaded.
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ConnectWallet
