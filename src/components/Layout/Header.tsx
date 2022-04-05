import { Box, Grid, Switch } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { ThemeType, updateSettings } from '../../store/settings'

import LogoHeader from '../../assets/vectors/logo-header.svg'

const Header = () => {
  const { theme } = useSelector((state: RootState) => state.settings)
  const dispatch = useDispatch()

  const switchTheme = () => {
    dispatch(
      updateSettings({
        theme: theme === ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK
      })
    )
  }

  return (
    <Box>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ padding: '2rem' }}
      >
        <img src={LogoHeader} alt="logo" />
      </Grid>
    </Box>
  )
}

export default Header
