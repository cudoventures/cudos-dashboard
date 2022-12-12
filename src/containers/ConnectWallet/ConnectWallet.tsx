/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Fragment, useEffect, useState } from 'react'
import { Box, Button, Tooltip, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { updateUserTransactions } from 'store/userTransactions'
import { updateUser } from 'store/profile'
import InfoIcon from 'assets/vectors/info-icon.svg'
import Header from 'components/Layout/Header'
import { useNotifications } from 'components/NotificationPopup/hooks'
import { switchLedgerType } from 'ledgers/utils'
import { ThreeDots as ThreeDotsLoading } from 'svg-loaders-react'
import LinkIcon from 'assets/vectors/link-icon.svg?component'

import {
  detectUserBrowser,
  getExtensionUrlForBrowser,
  getSupportedBrowsersForWallet,
  getSupportedWallets,
  isExtensionAvailableForBrowser,
  isExtensionEnabled,
  isSupportedBrowser,
  SUPPORTED_BROWSER,
  SUPPORTED_WALLET
} from 'cudosjs'

import {
  connectUser,
  delay,
  SUPPORTED_WALLET_LOGOS
} from 'utils/projectUtils'

import { styles } from './styles'

const ConnectWallet = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { lastLoggedAddress, chosenNetwork: currentNetwork } = useSelector((state: RootState) => state.profile)
  const { setWarning } = useNotifications()
  const [loading, setLoading] = useState(new Map())
  const [userBrowser, setUserBrowser] = useState<SUPPORTED_BROWSER | undefined>(undefined)

  const redirectToExtension = (extensionUrl: string | undefined) => {
    if (extensionUrl) {
      window.open(extensionUrl, '_blank')?.focus()
    }
  }

  const connect = async (chosenNetwork: string, walletName: SUPPORTED_WALLET) => {

    try {
      setLoading(new Map(loading.set(walletName, true)))
      await delay(1000)
      const { address } = await switchLedgerType(chosenNetwork, walletName)

      if (address !== lastLoggedAddress) {
        dispatch(updateUserTransactions({ offsetCount: 0, data: [] }))
      }

      const connectedUser = await connectUser(chosenNetwork, walletName)
      dispatch(updateUser(connectedUser))
      navigate('dashboard')

    } catch (error) {
      setWarning(
        `Failed connecting to wallet! Please check your ${walletName} installation.`
      )

    } finally {
      setLoading(new Map())
    }
  }

  const click = (walletName: SUPPORTED_WALLET) => {

    if (isExtensionEnabled(walletName)) {
      connect(currentNetwork, walletName)
      return
    }

    const extensionUrl = getExtensionUrlForBrowser(walletName, userBrowser!)
    redirectToExtension(extensionUrl)
  }

  const btnText = (walletName: SUPPORTED_WALLET): string | JSX.Element => {

    if (loading.get(walletName)) {
      return <LoadingButtonComponent />
    }

    if (isExtensionEnabled(walletName)) {
      return `Connect ${walletName} wallet`
    }

    if (isExtensionAvailableForBrowser(walletName, userBrowser!)) {
      return (
        <Typography variant='subtitle2' sx={{ display: 'flex', alignItems: 'center' }}>
          {`Get ${walletName} plugin`}
          <LinkIcon style={{ marginLeft: '5px', color: 'white' }} />
        </Typography>
      )
    }

    return 'Unsupported browser'
  }

  const btnTooltip = (walletName: SUPPORTED_WALLET): string => {

    let tooltipText = ''

    // We only need a tooltip for a wallet not supported by the current browser
    if (!isExtensionAvailableForBrowser(walletName, userBrowser!)) {
      tooltipText = `${walletName} supports: ${getSupportedBrowsersForWallet(walletName).map((browser) => {
        return ` ${browser}`
      })}`
    }

    return tooltipText
  }

  const isDisabledBtn = (walletName: SUPPORTED_WALLET): boolean => {

    // Disabling the Btn if into loading state
    if (loading.get(walletName)) {
      return true
    }

    // Disabling the btn, when other btn is loading
    if (loading.size > 0) {
      return true
    }

    // Disabling the btn if no extension is available for the current user browser
    if (!isExtensionAvailableForBrowser(walletName, userBrowser!)) {
      return true
    }

    return false
  }

  const displayLogo = (walletName: SUPPORTED_WALLET): JSX.Element => {
    if (loading.get(walletName)) {
      return <Fragment></Fragment>
    }

    return SUPPORTED_WALLET_LOGOS[walletName] || <Fragment></Fragment>
  }

  const LoadingButtonComponent = (): JSX.Element => {
    return (
      <ThreeDotsLoading
        style={{ width: '30px', height: '30px' }}
      />
    )
  }

  useEffect(() => {
    const userBrowser = detectUserBrowser()
    if (isSupportedBrowser(userBrowser)) {
      setUserBrowser(userBrowser as SUPPORTED_BROWSER)
      return
    }
    setUserBrowser(undefined)
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
          {getSupportedWallets().map((wallet) => {
            return (
              <Tooltip placement='right' title={btnTooltip(wallet)}>
                <Box>
                  <Button
                    sx={styles.connectButton}
                    variant="contained"
                    color="primary"
                    disabled={isDisabledBtn(wallet)}
                    onClick={() => click(wallet)}
                  >
                    {displayLogo(wallet)}
                    {btnText(wallet)}
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
