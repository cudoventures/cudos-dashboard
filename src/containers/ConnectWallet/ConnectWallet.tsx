/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Fragment, useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Tooltip, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { updateUserTransactions } from 'store/userTransactions'
import { updateUser } from 'store/profile'
import InfoIcon from 'assets/vectors/info-icon.svg'
import Header from 'components/Layout/Header'
import { useNotifications } from 'components/NotificationPopup/hooks'
import { switchLedgerType } from 'ledgers/utils'
import { COLORS_DARK_THEME } from 'theme/colors'
import LinkIcon from 'assets/vectors/link-icon.svg?component'

import {
  connectUser,
  delay,
  getUserBrowserType,
  SUPPORTED_BROWSERS,
  SUPPORTED_LEDGERS,
  WALLET_EXTENSIONS_URL
} from 'utils/projectUtils'

import { styles } from './styles'

const ConnectWallet = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { lastLoggedAddress, chosenNetwork: currentNetwork } = useSelector((state: RootState) => state.profile)
  const { setWarning } = useNotifications()
  const [loading, setLoading] = useState(new Map())
  const [availableLedgers, setAvailableLedgers] = useState<Record<string, boolean>>({})
  const [userBrowser, setUserBrowser] = useState<SUPPORTED_BROWSERS | undefined>(undefined)

  const redirectToExtension = (ledgerType: string, browserType: SUPPORTED_BROWSERS | undefined) => {

    let url = WALLET_EXTENSIONS_URL[ledgerType][browserType!] || ''

    if (url) {
      window.open(url, '_blank')?.focus()
    }
  }

  const connect = async (chosenNetwork: string, ledgerType: string) => {

    try {
      setLoading(new Map(loading.set(ledgerType, true)))
      await delay(1000)
      const { address } = await switchLedgerType(chosenNetwork, ledgerType)

      if (address !== lastLoggedAddress) {
        dispatch(updateUserTransactions({ offsetCount: 0, data: [] }))
      }

      const connectedUser = await connectUser(chosenNetwork, ledgerType)
      dispatch(updateUser(connectedUser))
      navigate('dashboard')

    } catch (error) {
      setWarning(
        `Failed connecting to wallet! Please check your ${ledgerType} installation.`
      )

    } finally {
      setLoading(new Map())
    }
  }

  const click = (ledgerType: string) => {

    if (availableLedgers[ledgerType]) {
      connect(currentNetwork, ledgerType)
      return
    }

    redirectToExtension(ledgerType, userBrowser)
  }

  const btnText = (ledgerType: string): string | JSX.Element => {

    if (loading.get(ledgerType)) {
      return (
        <Fragment>
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
        </Fragment>
      )
    }

    if (availableLedgers[ledgerType]) {
      return `Connect ${ledgerType} wallet`
    }

    if (WALLET_EXTENSIONS_URL[ledgerType][userBrowser!]) {
      return (
        <Typography variant='subtitle2' sx={{ display: 'flex', alignItems: 'center' }}>
          {`Get ${ledgerType} plugin`}
          <LinkIcon style={{ marginLeft: '5px', color: 'white' }} />
        </Typography>
      )
    }

    return 'Unsupported browser'
  }

  const btnTooltip = (ledgerType: string): string => {

    let tooltipText = ''

    if (!WALLET_EXTENSIONS_URL[ledgerType][userBrowser!]) {
      tooltipText = `${ledgerType} supports: ${Object.entries(
        WALLET_EXTENSIONS_URL[ledgerType]).map(([key]) => {
          return ` ${key}`
        })}`
    }

    return tooltipText
  }

  const isDisabledBtn = (ledgerType: string): boolean => {

    // Disabling the Btn if cicked into loading state
    if (loading.get(ledgerType)) {
      return true
    }

    // Disabling the btn, when other btnType is loading
    if (loading.size > 0) {
      return true
    }

    // Disabling the btn if no extension is available for the current user browser
    if (!WALLET_EXTENSIONS_URL[ledgerType][userBrowser!]) {
      return true
    }

    return false
  }

  useEffect(() => {

    const userLedgers: Record<string, boolean> = {}

    for (const ledger of SUPPORTED_LEDGERS) {
      userLedgers[ledger.type] = ledger.isInstalled()
    }

    setAvailableLedgers(userLedgers)

  }, [loading])

  useEffect(() => {

    setUserBrowser(getUserBrowserType())
  }, [])

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
          {SUPPORTED_LEDGERS.map((ledger) => {
            return (
              <Tooltip placement='right' title={btnTooltip(ledger.type)}>
                <Box>
                  <Button
                    sx={styles.connectButton}
                    variant="contained"
                    color="primary"
                    disabled={isDisabledBtn(ledger.type)}
                    onClick={() => click(ledger.type)}
                  >
                    {ledger.logo}
                    {btnText(ledger.type)}
                  </Button>
                </Box>
              </Tooltip>
            )
          })}
          <Box sx={styles.pluginWarning} color="primary.main">
            <img style={styles.infoIcon} src={InfoIcon} alt="Info" />
            Make sure you have Keplr and/or Cosmostation plugins installed.
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ConnectWallet
