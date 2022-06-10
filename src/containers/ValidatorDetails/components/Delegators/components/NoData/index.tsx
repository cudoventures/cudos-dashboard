import { Box, Typography } from '@mui/material'

const NoData: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={1}
      sx={{ color: 'text.secondary', padding: '2rem' }}
    >
      <Typography fontWeight={700}>No data to show</Typography>
    </Box>
  )
}

export default NoData
