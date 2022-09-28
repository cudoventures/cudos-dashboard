/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BigNumber from 'bignumber.js'
import { RootState } from 'store'
import { updateUserTransactions } from 'store/userTransactions'
import { fetchRewards } from 'api/getRewards'
import { updateUser } from 'store/profile'
import { ConnectLedger } from 'ledgers/KeplrLedger'
import { getStakedBalance, getWalletBalance } from 'utils/projectUtils'
import InfoIcon from 'assets/vectors/info-icon.svg'
import KeplrLogo from 'assets/vectors/keplr-logo.svg'
import Header from 'components/Layout/Header'
import { useNotifications } from 'components/NotificationPopup/hooks'

import { fetchDelegations } from 'api/getAccountDelegations'
import { fetchRedelegations } from 'api/getAccountRedelegations'
import { fetchUndedelegations } from 'api/getAccountUndelegations'
import { getUnbondingBalance } from 'api/getUnbondingBalance'
import CosmosNetworkConfig from 'ledgers/CosmosNetworkConfig'
import { switchLedgerType } from 'ledgers/utils'

import { COLORS_DARK_THEME } from 'theme/colors'
import { styles } from './styles'

const ConnectWallet = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { lastLoggedAddress } = useSelector((state: RootState) => state.profile)
  const { setWarning } = useNotifications()

  const connect = async () => {
    try {
      const { address, keplrName } = await ConnectLedger()
      if (address !== lastLoggedAddress) {
        dispatch(updateUserTransactions({ offsetCount: 0, data: [] }))
      }
      const balance = await getWalletBalance(address!)
      const stakedAmountBalance = await getStakedBalance(address!)
      const { totalRewards, validatorArray } = await fetchRewards(address!)
      const { delegationsArray } = await fetchDelegations(address)
      const { redelegationsArray } = await fetchRedelegations(address)
      const { undelegationsArray } = await fetchUndedelegations(address)
      const { unbondingBalance } = await getUnbondingBalance(address)

      dispatch(
        updateUser({
          address,
          keplrName,
          balance: new BigNumber(balance),
          availableRewards: new BigNumber(totalRewards),
          stakedValidators: validatorArray,
          stakedBalance: new BigNumber(stakedAmountBalance),
          unbondingBalance: new BigNumber(unbondingBalance),
          delegations: delegationsArray,
          redelegations: redelegationsArray,
          undelegations: undelegationsArray
        })
      )
      navigate('dashboard')
    } catch (error) {
      setWarning(
        'Failed connecting to wallet! Please check your Keplr installation.'
      )
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
