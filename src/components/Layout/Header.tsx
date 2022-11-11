import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { headerStyles } from './headerstyles'
import { useMidLowerResCheck, useMidlowResCheck } from './hooks/useScreenChecks'
import { useLocation, useNavigate } from 'react-router-dom'
import { CHAIN_DETAILS } from 'utils/constants'
import NetworkInfo from './NetworkInfo'
import UserInfo from './UserInfo'
import LogoHeader from 'assets/vectors/logo-header.svg?component'
import TestNetLogoHeader from 'assets/vectors/testnet-logo-header.svg?component'
import CudosLogo from 'assets/vectors/cudos-logo.svg?component'
import LinkIcon from 'assets/vectors/link-icon.svg?component'
import { useEffect, useState } from 'react'

const Header = () => {

  const location = useLocation()
  const nagivate = useNavigate()
  const isMidLowewRes = useMidLowerResCheck()
  const isMidLowRes = useMidlowResCheck()
  const { chosenNetwork, loadingState } = useSelector((state: RootState) => state.profile)
  const isMainnet = CHAIN_DETAILS.CHAIN_ID[chosenNetwork as keyof typeof CHAIN_DETAILS.CHAIN_ID] === CHAIN_DETAILS.CHAIN_ID.MAINNET
  const [logoComponent, setLogoComponent] = useState<JSX.Element>()

  useEffect(() => {

    if (location.pathname === '/') {
      setLogoComponent(<LogoHeader />)
      return
    }

    if (!loadingState) {
      setLogoComponent(
        isMainnet ? <LogoHeader /> : <TestNetLogoHeader />
      )
    }

  }, [loadingState, location.pathname])

  return (
    <Box>
      <Box gap={2} sx={isMidLowRes ? headerStyles.smallerScreenHeaderContainer : headerStyles.headerContainer}>
        <Box onClick={() => nagivate('dashboard')} sx={headerStyles.logoHolder}>
          {logoComponent}
        </Box>
        {location.pathname === '/' ? null :
          <Box gap={2} sx={{ display: 'flex', alignItems: 'center', flexDirection: isMidLowewRes ? 'column' : 'row' }}>
            <Box
              gap={1}
              sx={headerStyles.linkHolder}
              onClick={() => window
                .open(CHAIN_DETAILS.BRIDGE_URL[chosenNetwork as keyof typeof CHAIN_DETAILS.BRIDGE_URL], '_blank')
                ?.focus()}
            >
              <CudosLogo />
              <Typography variant="body2" fontWeight={700}>
                Cudos Bridge
              </Typography>
              <LinkIcon style={{ color: 'white' }} />
            </Box>
            <Box sx={{ display: 'flex' }}>
              <NetworkInfo />
              <UserInfo />
            </Box>
          </Box>}
      </Box>
    </Box>
  )
}

export default Header
