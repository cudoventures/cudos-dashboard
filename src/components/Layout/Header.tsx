import { Box, Grid, Toolbar, Typography } from '@mui/material'

const Header = () => {
  return (
    <Box position="fixed" sx={{ top: 0 }}>
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography variant="h6" noWrap>
            Header
          </Typography>
        </Grid>
      </Toolbar>
    </Box>
  )
}

export default Header
