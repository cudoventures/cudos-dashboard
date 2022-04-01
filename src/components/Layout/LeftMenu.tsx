import { Box, Grid, Toolbar, Typography } from '@mui/material'

const MenuItems = ['Dashboard', 'Staking', 'Validators', 'Settings']

const Menu = () => {
  return (
    <Box
      sx={{
        background: 'transparent',
        boxShadow: 'none',
        width: '60px',
        // height: '100%',
        border: '1px solid red'
      }}
    >
      <Toolbar>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          flexDirection="column"
        >
          {MenuItems.map((mi) => (
            <Typography key={mi}>{mi}</Typography>
          ))}
        </Grid>
      </Toolbar>
    </Box>
  )
}

export default Menu
