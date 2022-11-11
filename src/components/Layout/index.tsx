import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import Footer from './Footer'

import Header from './Header'
import LeftMenu from './LeftMenu'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const { loadingState } = useSelector((state: RootState) => state.profile)

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      width="100%"
      position="relative"
      sx={{
        paddingLeft: '2rem'
      }}
    >
      <Header />
      <Box display="flex" gap={8} flexGrow={1} sx={{ flexDirection: loadingState ? 'column' : 'row', overflow: 'auto' }}>
        {loadingState ? null : <LeftMenu />}
        <Box
          sx={{ paddingRight: '2rem' }}
          flexGrow={1}
          flex={1}
          overflow="auto"
        >
          {children}
          {loadingState ? null : <Footer />}
        </Box>
        {loadingState ? <Footer /> : null}
      </Box>
    </Box>
  )
}

export default Layout
