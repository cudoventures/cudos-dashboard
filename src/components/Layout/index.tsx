import { Box } from '@mui/material'
import Footer from './Footer'

import Header from './Header'
import LeftMenu from './LeftMenu'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        paddingLeft: '2rem',
        height: '100vh',
        maxWidth: '1440px',
        margin: 'auto'
      }}
    >
      <Header />
      <Box display="flex" gap={8} flexGrow={1} sx={{ overflow: 'auto' }}>
        <LeftMenu />
        <Box>{children}</Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout
