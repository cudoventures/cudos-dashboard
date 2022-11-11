/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BigNumber from 'bignumber.js'
import { RootState } from 'store'
import { updateUserTransactions } from 'store/userTransactions'
import { fetchRewards } from 'api/getRewards'
import { updateUser } from 'store/profile'
import { connectKeplrLedger } from 'ledgers/KeplrLedger'
import { getStakedBalance, getWalletBalance } from 'utils/projectUtils'
import InfoIcon from 'assets/vectors/info-icon.svg'
import CosmostationLogo from 'assets/vectors/cosmostation-logo.svg'
import KeplrLogo from 'assets/vectors/keplr-logo.svg'
import Header from 'components/Layout/Header'
import { useNotifications } from 'components/NotificationPopup/hooks'

import { fetchDelegations } from 'api/getAccountDelegations'
import { fetchRedelegations } from 'api/getAccountRedelegations'
import { fetchUndedelegations } from 'api/getAccountUndelegations'
import { getUnbondingBalance } from 'api/getUnbondingBalance'
import CosmosNetworkConfig from 'ledgers/CosmosNetworkConfig'
import { connectCosmostationLedger } from 'ledgers/CosmoStationLedger'
import { switchLedgerType } from 'ledgers/utils'

import { COLORS_DARK_THEME } from 'theme/colors'
import { styles } from './styles'

const ConnectWallet = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { lastLoggedAddress, chosenNetwork: currentNetwork } = useSelector((state: RootState) => state.profile)
  const { setWarning } = useNotifications()
  const [loading, setLoading] = useState<boolean>(false)
  const [ledger, setLedger] = useState<string>('')

  const connect = async (chosenNetwork: string, ledgerType: string) => {
    try {
      setLedger(ledgerType)
      setLoading(true)
      const { address, accountName } = await switchLedgerType(chosenNetwork, ledgerType)
      if (address !== lastLoggedAddress) {
        dispatch(updateUserTransactions({ offsetCount: 0, data: [] }))
      }
      const balance = await getWalletBalance(chosenNetwork, address!)
      const stakedAmountBalance = await getStakedBalance(chosenNetwork, address!)
      const { totalRewards, validatorArray } = await fetchRewards(chosenNetwork, address!)
      const { delegationsArray } = await fetchDelegations(chosenNetwork, address)
      const { redelegationsArray } = await fetchRedelegations(chosenNetwork, address)
      const { undelegationsArray } = await fetchUndedelegations(chosenNetwork, address)
      const { unbondingBalance } = await getUnbondingBalance(chosenNetwork, address)

      dispatch(
        updateUser({
          chosenNetwork,
          address,
          accountName,
          connectedLedger: ledgerType,
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
      setLoading(false)
      navigate('dashboard')
    } catch (error) {
      setLedger('')
      setLoading(false)
      setWarning(
        `Failed connecting to wallet! Please check your ${ledgerType} installation.`
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
              disabled={loading}
              color="primary"
              onClick={() => connect(currentNetwork!, CosmosNetworkConfig.KEPLR_LEDGER)}
              sx={styles.connectButton}
            >
              <img style={styles.keplrLogo} src={KeplrLogo} alt="Keplr Logo" />
              {loading && ledger === CosmosNetworkConfig.KEPLR_LEDGER ? (
                <>
                  <Typography sx={{ position: 'relative' }}>
                    Loading...
                  </Typography>
                  <CircularProgress
                    style={{
                      position: 'absolute',
                      right: 35,
                      color: COLORS_DARK_THEME.PRIMARY_BLUE
                    }}
                    size={30}
                  />
                </>
              ) : (
                'Connect Keplr wallet'
              )}
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              disabled={loading}
              color="primary"
              onClick={() => connect(currentNetwork!, CosmosNetworkConfig.COSMOSTATION_LEDGER)}
              sx={styles.cosmostationConnectBtn}
            >
              <img
                style={styles.cosmostationLogo}
                src={CosmostationLogo}
                alt="Cosmostation Logo"
              />
              {loading && ledger === CosmosNetworkConfig.COSMOSTATION_LEDGER ? (
                <>
                  <Typography sx={{ position: 'relative' }}>
                    Loading...
                  </Typography>
                  <CircularProgress
                    style={{
                      position: 'absolute',
                      right: 35,
                      color: COLORS_DARK_THEME.PRIMARY_BLUE
                    }}
                    size={30}
                  />
                </>
              ) : (
                'Connect Cosmostation wallet'
              )}
            </Button>
          </Box>
          <Box sx={styles.pluginWarning} color="primary.main">
            <img style={styles.infoIcon} src={InfoIcon} alt="Info" />
            Make sure you have either Keplr or Cosmostation plugin downloaded.
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ConnectWallet
