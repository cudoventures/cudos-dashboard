import { Box, Grid, Toolbar, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box
      position="fixed"
      sx={{
        bottom: '0',
        height: '60px',
        width: '100%'
      }}
    >
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography variant="h6" noWrap>
            Footer
          </Typography>
        </Grid>
      </Toolbar>
    </Box>
  )
}

export default Footer
