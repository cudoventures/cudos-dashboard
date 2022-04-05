import { Grid, Box } from '@mui/material'

import Header from './Header'
import Footer from './Footer'
import LeftMenu from './LeftMenu'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ padding: '0 2rem', height: '100vh' }}>
      <Grid container direction="column" sx={{ height: '100%' }}>
        <Grid item>
          <Header />
        </Grid>
        <Grid item xl={10} md={9} container>
          <Grid item sm={1}>
            <LeftMenu />
          </Grid>
          <Grid item>{children}</Grid>
        </Grid>
        <Footer />
      </Grid>
    </Box>
  )
}

export default Layout
