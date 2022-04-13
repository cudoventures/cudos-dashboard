import { Box, Typography, Chip } from '@mui/material'

const ValidatorsCount: React.FC<{ count: number }> = ({ count }) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography
        variant="body2"
        color="text.secondary"
        textTransform="uppercase"
        fontWeight={600}
        letterSpacing={1}
      >
        Validators
      </Typography>
      <Chip
        label={count}
        color="primary"
        sx={{ borderRadius: '10px', color: 'white', fontWeight: 600 }}
      />
    </Box>
  )
}

export default ValidatorsCount
