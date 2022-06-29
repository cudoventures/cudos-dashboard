import { Box, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { RootState } from 'store'
import { ThemeType, updateSettings } from 'store/settings'
import LogoHeader from 'assets/vectors/logo-header.svg'
import CudosLogo from 'assets/vectors/cudos-logo.svg?component'
import LinkIcon from 'assets/vectors/link-icon.svg?component'
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
    <Box sx={{ padding: '2rem', display: 'flex' }}>
      <img src={LogoHeader} alt="logo" />
      {location.pathname === '/' ? null : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            flex: '1'
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
            onClick={() =>
              window.open(import.meta.env.VITE_BRIDGE_URL, '_blank')?.focus()
            }
          >
            <CudosLogo />
            <Typography variant="body2" fontWeight={700}>
              Gravity Bridge
            </Typography>
            <LinkIcon style={{ color: 'white' }} />
          </Box>
          <NetworkInfo />
          <UserInfo />
        </Box>
      )}
    </Box>
  )
}

export default Header
