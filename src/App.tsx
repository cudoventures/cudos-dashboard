import { ThemeProvider } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { CssBaseline } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'

import { useApollo } from './graphql/client'
import Layout from './components/Layout'
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
  const themeColor = useSelector((state: RootState) => state.settings.theme)
  const apolloClient = useApollo(null)

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme[themeColor]}>
        <CssBaseline />
        <BrowserRouter>
          <ConnectWallet />
          <Layout>
            <Routes>
              <Route path="/">
                <Route index element={<Dashboard />} />
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
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
