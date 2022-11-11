import { useEffect, useState } from 'react'
import { Box, ToggleButton, Tooltip } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import DashboardIcon from 'assets/vectors/dashboard.svg?component'
import ProposalsIcon from 'assets/vectors/proposals.svg?component'
import StakingIcon from 'assets/vectors/staking.svg?component'
import FaucetIcon from 'assets/vectors/faucet.svg?component'

import { styles } from './styles'
import { CHAIN_DETAILS } from 'utils/constants'
import { useSelector } from 'react-redux'
import { RootState } from 'store'

const Menu = () => {
  const [selected, setSelected] = useState<number>(0)
  const { chosenNetwork } = useSelector((state: RootState) => state.profile)
  const { pathname } = useLocation()

  const MenuItems = [
    { icon: <DashboardIcon />, link: '/dashboard', text: 'Dashboard' },
    { icon: <StakingIcon />, link: '/staking', text: 'Staking' },
    { icon: <ProposalsIcon />, link: '/proposals', text: 'Proposals' }
  ]

  if (CHAIN_DETAILS.CHAIN_ID[chosenNetwork! as keyof typeof CHAIN_DETAILS.CHAIN_ID]
    !== CHAIN_DETAILS.CHAIN_ID.MAINNET) {
    MenuItems.push({ icon: <FaucetIcon />, link: '/faucet', text: 'Faucet' })
  }

  useEffect(() => {
    const selectedIndex = MenuItems.findIndex(
      (menuItem) => menuItem.link === pathname
    )
    setSelected(selectedIndex)
  }, [pathname])

  return (
    <Box sx={styles.menuContainer}>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap={2}
        height="100%"
      >
        {MenuItems.map((item, index) => (
          <Link
            to={item.link}
            key={item.link}
            style={{ marginTop: item.link === '/faucet' ? 'auto' : 0 }}
          >
            <Tooltip
              title={item.text}
              placement="right"
              componentsProps={{
                tooltip: {
                  sx: {
                    background: 'white',
                    color: 'black',
                    padding: '13px 20px',
                    fontSize: '14px',
                    fontWeight: 700,
                    borderRadius: '15px'
                  }
                }
              }}
            >
              <ToggleButton
                sx={styles.navigationButton}
                value={index}
                key={item.link}
                selected={selected === index}
                onClick={() => setSelected(index)}
              >
                {item.icon}
              </ToggleButton>
            </Tooltip>
          </Link>
        ))}
      </Box>
    </Box>
  )
}

export default Menu
