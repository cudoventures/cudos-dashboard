import { ThemeProvider } from '@mui/material/styles'
import { useSelector, useDispatch } from 'react-redux'
import { CssBaseline } from '@mui/material'

import ConnectWallet from './containers/ConnectWallet/ConnectWallet'
import { updateSettings, Theme } from './store/settings'
import Layout from './components/Layout'
import theme from './theme'
import { RootState } from './store'

const App = () => {
  const dispatch = useDispatch()
  const themeColor = useSelector((state: RootState) => state.settings.theme)

  const toggleTheme = () => {
    dispatch(
      updateSettings({
        theme: themeColor === Theme.DARK ? Theme.LIGHT : Theme.DARK
      })
    )
  }

  return (
    <ThemeProvider theme={theme[themeColor]}>
      <CssBaseline />
      <ConnectWallet />
      <Layout />
    </ThemeProvider>
  )
}

export default App
