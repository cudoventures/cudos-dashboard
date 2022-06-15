import { Box } from '@mui/material'

import Header from './Header'
import LeftMenu from './LeftMenu'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        paddingLeft: '2rem',
        height: '100vh'
      }}
    >
      <Header />
      <Box display="flex" gap={8} flexGrow={1} sx={{ overflow: 'auto' }}>
        <LeftMenu />
        <Box sx={{ paddingRight: '2rem' }} flexGrow={1}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default Layout
