import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
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

  const themeBreakpoint = useTheme()
  const isSmallScreen = useMediaQuery(
    themeBreakpoint.breakpoints.down('md' || 'xs')
  )
  const isBigScreen = useMediaQuery(themeBreakpoint.breakpoints.up('lg'))

  const switchTheme = () => {
    dispatch(
      updateSettings({
        theme: theme === ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK
      })
    )
  }

  return (
    <Box sx={{ padding: '2rem', display: 'flex' }}>
      <Grid container>
        <img src={LogoHeader} alt="logo" />
        {location.pathname === '/' ? null : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              flex: '1'
            }}
          >
            <Container style={{ marginRight: 0 }}>
              <Grid
                justifyContent="flex-end"
                sx={{ pr: isSmallScreen ? 0 : 7 }}
                rowSpacing={2}
                spacing={2}
                container
              >
                <Grid alignSelf="center" item xl={2} lg={3} md={4} sm={8}>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      width: '200px'
                    }}
                    onClick={() =>
                      window
                        .open(import.meta.env.VITE_BRIDGE_URL, '_blank')
                        ?.focus()
                    }
                  >
                    <CudosLogo />
                    <Typography variant="body2" fontWeight={700}>
                      Cudos Bridge
                    </Typography>
                    <LinkIcon style={{ color: 'white' }} />
                  </Box>
                </Grid>
                <Grid
                  marginRight={isBigScreen ? '55px' : '0px'}
                  item
                  xl={2}
                  lg={3}
                  md={5}
                  sm={8}
                >
                  <NetworkInfo />
                </Grid>
                <Grid item xl={2} lg={3} md={5} sm={8}>
                  <UserInfo />
                </Grid>
              </Grid>
            </Container>
          </Box>
        )}
      </Grid>
    </Box>
  )
}

export default Header
