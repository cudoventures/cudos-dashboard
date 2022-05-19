import { useCallback, useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { CssBaseline } from '@mui/material'
import { ApolloProvider } from '@apollo/client'
import { Routes, Route, useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'

import { RecoilRoot } from 'recoil'
import { ConnectLedger } from 'ledgers/KeplrLedger'
import { updateUser } from 'store/profile'
import { updateUserTransactions } from 'store/userTransactions'
import { fetchRewards } from 'api/getRewards'
import { getWalletBalance } from './utils/projectUtils'
import { useApollo } from './graphql/client'
import Layout from './components/Layout'
import RequireKeplr from './components/RequireKeplr/RequireKeplr'
import ConnectWallet from './containers/ConnectWallet/ConnectWallet'
import Dashboard from './containers/Dashboard'
import Proposals from './containers/Proposals'
import ProposalDetails from './containers/Proposals/ProposalDetails'
import Staking from './containers/Staking'
import ValidatorDetails from './containers/ValidatorDetails'
import Settings from './containers/Settings'
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
      const { address } = await ConnectLedger()
      if (address !== lastLoggedAddress) {
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
    } catch (e) {
      throw new Error('Failed to connect!')
    }
  }, [dispatch, lastLoggedAddress])

  useEffect(() => {
    window.addEventListener('keplr_keystorechange', async () => {
      await connectAccount()
    })
  }, [connectAccount])

  return (
    <RecoilRoot>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme[themeColor]}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<ConnectWallet />} />
          </Routes>
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
                  <Route path="proposals" element={<Proposals />}>
                    <Route
                      path="proposals/:proposalId"
                      element={<ProposalDetails />}
                    />
                  </Route>
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Routes>
            </Layout>
          )}
        </ThemeProvider>
      </ApolloProvider>
    </RecoilRoot>
  )
}

export default App
