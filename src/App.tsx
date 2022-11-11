/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Fragment, useCallback, useEffect, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { Box, CircularProgress, CssBaseline } from '@mui/material'
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { fetchRedelegations } from 'api/getAccountRedelegations'
import { fetchUndedelegations } from 'api/getAccountUndelegations'
import BigNumber from 'bignumber.js'
import { updateUser } from 'store/profile'
import { updateUserTransactions } from 'store/userTransactions'
import { fetchRewards } from 'api/getRewards'
import NotificationPopup from 'components/NotificationPopup'
import { fetchDelegations } from 'api/getAccountDelegations'
import CosmosNetworkConfig from 'ledgers/CosmosNetworkConfig'
import { switchLedgerType } from 'ledgers/utils'
import { getUnbondingBalance } from 'api/getUnbondingBalance'
import { getStakedBalance, getWalletBalance } from './utils/projectUtils'
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

  const connectAccount = useCallback(async (chosenNetwork: string, ledgerType: string) => {
    try {
      const { address, accountName } = await switchLedgerType(chosenNetwork!, ledgerType)
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
      const balance = await getWalletBalance(chosenNetwork!, address!)

      const stakedAmountBalance = await getStakedBalance(chosenNetwork!, address!)

      const { totalRewards, validatorArray } = await fetchRewards(chosenNetwork!, address!)

      const { delegationsArray } = await fetchDelegations(chosenNetwork!, address)

      const { redelegationsArray } = await fetchRedelegations(chosenNetwork!, address)

      const { undelegationsArray } = await fetchUndedelegations(chosenNetwork!, address)

      const { unbondingBalance } = await getUnbondingBalance(chosenNetwork!, address)

      dispatch(
        updateUser({
          chosenNetwork,
          address,
          lastLoggedAddress: address,
          connectedLedger: ledgerType,
          accountName,
          balance: new BigNumber(balance),
          availableRewards: new BigNumber(totalRewards),
          stakedValidators: validatorArray,
          stakedBalance: new BigNumber(stakedAmountBalance),
          unbondingBalance: new BigNumber(unbondingBalance),
          delegations: delegationsArray,
          redelegations: redelegationsArray,
          undelegations: undelegationsArray,
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

      await connectAccount(currentNetwork, CosmosNetworkConfig.KEPLR_LEDGER)
    })

    if (window.cosmostation) {
      window.cosmostation.cosmos.on('accountChanged', async () => {
        await connectAccount(currentNetwork, CosmosNetworkConfig.COSMOSTATION_LEDGER)
      })
    }

    return () => {
      window.removeEventListener('keplr_keystorechange', async () => {
        await connectAccount(currentNetwork, CosmosNetworkConfig.KEPLR_LEDGER)
      })
      window.removeEventListener('accountChanged', async () => {
        await connectAccount(currentNetwork, CosmosNetworkConfig.COSMOSTATION_LEDGER)
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
