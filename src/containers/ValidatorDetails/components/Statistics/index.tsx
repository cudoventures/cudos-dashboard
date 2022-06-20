import { Box, Stack, Typography } from '@mui/material'
import { InfoRounded as InfoRoundedIcon } from '@mui/icons-material'
import Card from 'components/Card'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { formatNumber } from 'utils/format_token'
import { useStatistics } from './hooks'

const Statistics = () => {
  const { state } = useStatistics()
  const price = useSelector((state: RootState) => state.market.price)

  const calculateValue = (cudos: string) => {
    return `${Number(price) * Number(cudos)}`
  }

  const stats = Object.entries(state.balance)
    .filter(([key, value]) => key !== 'total')
    .map(([key, value]) => {
      return {
        type: key,
        cudos: formatNumber(value.value, 2),
        value: `$${formatNumber(calculateValue(value.value), 2)}`
      }
    })
  return (
    <Card>
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
