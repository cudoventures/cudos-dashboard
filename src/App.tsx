import { ThemeProvider } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { CssBaseline } from '@mui/material'
import { ApolloProvider } from '@apollo/client'
import { Routes, Route, useLocation } from 'react-router-dom'

import { RecoilRoot } from 'recoil'
import { useApollo } from './graphql/client'
import Layout from './components/Layout'
import Footer from './components/Layout/Footer'
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
              <Footer />
            </Layout>
          )}
        </ThemeProvider>
      </ApolloProvider>
    </RecoilRoot>
  )
}

export default App
