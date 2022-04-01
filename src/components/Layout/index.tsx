import { Box } from '@mui/material'

import Header from './Header'
import Footer from './Footer'

const Layout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh'
      }}
    >
      <Header />
      <Footer />
    </Box>
  )
}

export default Layout
