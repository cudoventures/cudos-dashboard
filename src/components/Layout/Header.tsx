import { Box } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { RootState } from 'store'
import { ThemeType, updateSettings } from 'store/settings'
import LogoHeader from 'assets/vectors/logo-header.svg'
import NetworkInfo from './NetworkInfo'

import UserInfo from './UserInfo'

const Header = () => {
  const { theme } = useSelector((state: RootState) => state.settings)
  const dispatch = useDispatch()
  const location = useLocation()

  const switchTheme = () => {
    dispatch(
      updateSettings({
        theme: theme === ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK
      })
    )
  }

  return (
    <Box>
      <Box sx={{ padding: '2rem', display: 'flex', flex: '1' }}>
        <img src={LogoHeader} alt="logo" />
        {location.pathname === '/' ? null : (
          <Box
            sx={{
              padding: '1rem',
              display: 'flex',
              justifyContent: 'flex-end',
              flex: '1'
            }}
          >
            <NetworkInfo />
            <UserInfo />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Header
