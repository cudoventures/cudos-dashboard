/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback, useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { Box, CssBaseline } from '@mui/material'
import { ApolloProvider } from '@apollo/client'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { updateUser } from 'store/profile'
import { updateUserTransactions } from 'store/userTransactions'
import NotificationPopup from 'components/NotificationPopup'
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
import { defaultApolloLinks } from 'graphql/helpers'
import { CHAIN_DETAILS } from 'utils/constants'
import NetworkChangingLoading from 'components/NetworkChangeLoading'
import { networkLoadingStyles } from 'components/NetworkChangeLoading/styles'
import { isExtensionEnabled, SUPPORTED_WALLET } from 'cudosjs'

const App = () => {
  const location = useLocation()
  const themeColor = useSelector((state: RootState) => state.settings.theme)
  const newApolloClient = useApollo(null)
  const isMainnet = CHAIN_DETAILS.CHAIN_ID === 'cudos-1'
  const dispatch = useDispatch()

  const connectAccount = useCallback(async (walletName: SUPPORTED_WALLET) => {
    try {
      const connectedUser = await connectUser(walletName)
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

      await connectAccount(SUPPORTED_WALLET.Keplr)
    })

    if (isExtensionEnabled(SUPPORTED_WALLET.Cosmostation)) {
      window.cosmostation.cosmos.on('accountChanged', async () => {
        await connectAccount(SUPPORTED_WALLET.Cosmostation)
      })
    }

    return () => {
      window.removeEventListener('keplr_keystorechange', async () => {
        await connectAccount(SUPPORTED_WALLET.Keplr)
      })
      window.removeEventListener('accountChanged', async () => {
        await connectAccount(SUPPORTED_WALLET.Cosmostation)
      })
    }
  }, [])

  return (
    <ApolloProvider client={newApolloClient(defaultApolloLinks)}>
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
            <Box style={networkLoadingStyles.visible}>
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
                {isMainnet ? null : (
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
