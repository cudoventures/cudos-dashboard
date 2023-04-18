import { useEffect, useState } from 'react'
import { Box, ToggleButton, Tooltip, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { getMenuItems, MenuItems } from './menuHelpers'
import { useIsScreenLessThan } from './hooks/useScreenChecks'

import { styles } from './styles'

const Menu = () => {
  const [selected, setSelected] = useState<number>(0)
  const [menuItems, setMenuItems] = useState<MenuItems[]>([])
  const { loadingState } = useSelector((state: RootState) => state.profile)
  const { pathname } = useLocation()
  const isScreenWidthLessThan1440px = useIsScreenLessThan('1440px', 'width')

  useEffect(() => {

    setMenuItems(getMenuItems(loadingState))

  }, [loadingState])

  useEffect(() => {

    if (menuItems.length) {
      const selectedIndex = menuItems.findIndex(
        (menuItem) => menuItem.link === pathname
      )
      setSelected(selectedIndex)
      return
    }

    setSelected(0)

  }, [pathname])

  return (
    <Box sx={styles.menuContainer}>
      <Box
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        gap={2}
        height="100%"
        width='100%'
      >
        {menuItems.map((item, index) => (
          <Link
            to={item.link}
            key={item.link}
            style={{
              width: '100%',
              textDecoration: 'none',
              marginTop: item.link === '/faucet' ? 'auto' : 0
            }}
          >
            <Tooltip
              title={isScreenWidthLessThan1440px ? item.text : ''}
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
                {isScreenWidthLessThan1440px ? null : <Typography
                  marginLeft={2.5}
                  variant='subtitle2'
                  color={selected === index ? 'white' : 'inherit'}
                >
                  {item.text}
                </Typography>}
              </ToggleButton>
            </Tooltip>
          </Link>
        ))}
      </Box>
    </Box>
  )
}

export default Menu
