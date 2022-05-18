import { Box, Stack, Typography } from '@mui/material'
import { InfoRounded as InfoRoundedIcon } from '@mui/icons-material'
import Card from 'components/Card/Card'

const stats = [
  {
    type: 'available',
    cudos: '0.7456',
    value: '$20.76'
  },
  {
    type: 'delegated',
    cudos: '19,746.7456',
    value: '$10,234.76'
  },
  {
    type: 'unbonding',
    cudos: '0',
    value: '$0'
  },
  {
    type: 'rewards',
    cudos: '234.7465',
    value: '$202.76'
  },
  {
    type: 'commissions',
    cudos: '236.7465',
    value: '$134.76'
  }
]

const Statistics = () => {
  return (
    <Card style={{}}>
      <Typography
        letterSpacing={1}
        fontWeight={700}
        color="text.secondary"
        textTransform="uppercase"
        fontSize="14px"
      >
        Statistics
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        gap={10}
        sx={{ padding: '2rem' }}
      >
        {stats.map((stat) => (
          <Box display="flex" flexDirection="column" gap={0.5} key={stat.type}>
            <Stack direction="row" gap={0.5} alignItems="center">
              <Typography
                variant="caption"
                fontWeight={700}
                color="text.secondary"
                textTransform="uppercase"
              >
                {stat.type}
              </Typography>
              <InfoRoundedIcon fontSize="inherit" color="primary" />
            </Stack>
            <Stack direction="row" gap={1} alignItems="center">
              <Typography fontWeight={700}>{stat.cudos}</Typography>
              <Typography fontWeight={700} color="text.secondary">
                CUDOS
              </Typography>
            </Stack>
            <Typography variant="body2" fontWeight={700} color="primary.main">
              {stat.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  )
}

export default Statistics
