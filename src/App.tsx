import { useCallback, useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { CssBaseline } from '@mui/material'
import { ApolloProvider } from '@apollo/client'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import BigNumber from 'bignumber.js'

import { ConnectLedger } from 'ledgers/KeplrLedger'
import { updateUser } from 'store/profile'
import { updateUserTransactions } from 'store/userTransactions'
import { fetchRewards } from 'api/getRewards'
import NotificationPopup from 'components/NotificationPopup'
import { getStakedBalance, getWalletBalance } from './utils/projectUtils'
import { useApollo } from './graphql/client'
import Layout from './components/Layout'
import RequireKeplr from './components/RequireKeplr/RequireKeplr'
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

const App = () => {
  const location = useLocation()

  const themeColor = useSelector((state: RootState) => state.settings.theme)
  const apolloClient = useApollo(null)
  const { lastLoggedAddress } = useSelector((state: RootState) => state.profile)

  const dispatch = useDispatch()

  const connectAccount = useCallback(async () => {
    try {
      const { address, keplrName } = await ConnectLedger()
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
      const balance = await getWalletBalance(address)

      const stakedAmountBalance = await getStakedBalance(address)

      const { totalRewards, validatorArray } = await fetchRewards(address)

      dispatch(
        updateUser({
          address,
          lastLoggedAddress: address,
          keplrName,
          balance: new BigNumber(balance),
          availableRewards: new BigNumber(totalRewards),
          stakedValidators: validatorArray,
          stakedBalance: new BigNumber(stakedAmountBalance)
        })
      )
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

      await connectAccount()
    })

    return () => {
      window.removeEventListener('keplr_keystorechange', async () => {
        await connectAccount()
      })
    }
  }, [])

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme[themeColor]}>
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
            <Routes>
              <Route element={<RequireKeplr />}>
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
              {import.meta.env.VITE_CHAIN_STATUS !== 'mainnet' && (
                <Route path="faucet">
                  <Route index element={<Faucet />} />
                </Route>
              )}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
            <NotificationPopup type="error" />
            <NotificationPopup type="warning" />
            <NotificationPopup type="info" />
          </Layout>
        )}
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
