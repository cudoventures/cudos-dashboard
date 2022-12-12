/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback, useEffect, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { Box, CssBaseline } from '@mui/material'
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { updateUser } from 'store/profile'
import { updateUserTransactions } from 'store/userTransactions'
import NotificationPopup from 'components/NotificationPopup'
import CosmosNetworkConfig from 'ledgers/CosmosNetworkConfig'
import { switchLedgerType } from 'ledgers/utils'
import { connectUser } from './utils/projectUtils'
import { useApollo } from './graphql/client'
import Layout from './components/Layout'
import RequireLedger from './components/RequireLedger/RequireLedger'
import ConnectWallet from './containers/ConnectWallet/ConnectWallet'
import Dashboard from './containers/Dashboard'
import Proposals from './containers/Proposals'
import Faucet from './containers/Faucet'
import ProposalDetails from './containers/Proposals/ProposalDetails'
import Staking from './containers/Staking'
import ValidatorDetails from './containers/ValidatorDetails'
import theme from './theme'
import { RootState } from './store'

import '@fontsource/poppins'
import { ApolloLinks, defaultApolloLinks } from 'graphql/helpers'
import { CHAIN_DETAILS } from 'utils/constants'
import NetworkChangingLoading from 'components/NetworkChangeLoading'
import { networkLoadingStyles } from 'components/NetworkChangeLoading/styles'
import { isExtensionEnabled, SUPPORTED_WALLET } from 'cudosjs'

const App = () => {
  const location = useLocation()
  const themeColor = useSelector((state: RootState) => state.settings.theme)
  const newApolloClient = useApollo(null)
  const [currentApolloClient, setCurrentApolloClient] = useState<ApolloClient<NormalizedCacheObject>>(
    newApolloClient(defaultApolloLinks)
  )
  const {
    lastLoggedAddress,
    chosenNetwork: currentNetwork,
    connectedLedger,
    loadingState
  } = useSelector((state: RootState) => state.profile)

  const dispatch = useDispatch()

  const connectAccount = useCallback(async (chosenNetwork: string, walletName: SUPPORTED_WALLET) => {
    try {

      const { address } = await switchLedgerType(chosenNetwork!, walletName)
      if (address !== lastLoggedAddress || lastLoggedAddress === '') {
        dispatch(
          updateUserTransactions({
            offsetCount: 0,
            data: [],
            hasActivity: false,
            loading: true
          })
        )
      }

      const connectedUser = await connectUser(chosenNetwork, walletName)
      dispatch(updateUser(connectedUser))

    } catch (e) {
      throw new Error('Failed to connect!')
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keplr_keystorechange', async () => {
      dispatch(updateUser({ lastLoggedAddress: '' }))
      dispatch(
        updateUserTransactions({
          offsetCount: 0,
          data: [],
          hasActivity: false,
          loading: true
        })
      )

      await connectAccount(currentNetwork, SUPPORTED_WALLET.Keplr)
    })

    if (isExtensionEnabled(SUPPORTED_WALLET.Cosmostation)) {
      window.cosmostation.cosmos.on('accountChanged', async () => {
        await connectAccount(currentNetwork, SUPPORTED_WALLET.Cosmostation)
      })
    }

    return () => {
      window.removeEventListener('keplr_keystorechange', async () => {
        await connectAccount(currentNetwork, SUPPORTED_WALLET.Keplr)
      })
      window.removeEventListener('accountChanged', async () => {
        await connectAccount(currentNetwork, SUPPORTED_WALLET.Cosmostation)
      })
    }
  }, [])


  useEffect(() => {
    dispatch(updateUser({ loadingState: true })
    )
    const newApolloLinks: ApolloLinks = {
      uri: CHAIN_DETAILS.GRAPHQL_URL[currentNetwork! as keyof typeof CHAIN_DETAILS.GRAPHQL_URL],
      url: CHAIN_DETAILS.GRAPHQL_WS[currentNetwork! as keyof typeof CHAIN_DETAILS.GRAPHQL_WS]
    }

    setCurrentApolloClient(newApolloClient(newApolloLinks))

    if (connectedLedger) {
      connectAccount(currentNetwork, connectedLedger)
    }

    setTimeout(() => { dispatch(updateUser({ loadingState: false })) }, 4000)

  }, [currentNetwork])

  return (
    <ApolloProvider client={currentApolloClient!}>
      <ThemeProvider theme={theme[themeColor!]}>
        <CssBaseline />
        {location.pathname !== '/' ? null : (
          <>
            <Routes>
              <Route path="/" element={<ConnectWallet />} />
            </Routes>
            <NotificationPopup type="warning" />
          </>
        )}
        {location.pathname === '/' ? null : (
          <Layout>
            {loadingState ? <NetworkChangingLoading /> : null}
            <Box style={loadingState ? networkLoadingStyles.hidden : networkLoadingStyles.visible}>
              <Routes>
                <Route element={<RequireLedger />}>
                  <Route path="dashboard">
                    <Route index element={<Dashboard />} />
                  </Route>
                  <Route path="staking">
                    <Route index element={<Staking />} />
                    <Route path=":validatorId" element={<ValidatorDetails />} />
                  </Route>
                  <Route path="proposals">
                    <Route index element={<Proposals />} />
                    <Route path=":proposalId" element={<ProposalDetails />} />
                  </Route>
                </Route>
                {
                  CHAIN_DETAILS.CHAIN_ID[currentNetwork! as keyof typeof CHAIN_DETAILS.CHAIN_ID]
                    === CHAIN_DETAILS.CHAIN_ID.MAINNET ? null : (
                    <Route path="faucet">
                      <Route index element={<Faucet />} />
                    </Route>
                  )}
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>

              <NotificationPopup type="error" />
              <NotificationPopup type="warning" />
              <NotificationPopup type="info" />
            </Box>
          </Layout>

        )}
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
