import { Box, Stack, Tooltip, Typography } from '@mui/material'
import Card from 'components/Card'
import numeral from 'numeral'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { TooltipValidatorMessages } from 'store/validatorDetails'
import { formatNumber } from 'utils/format_token'
import { useStatistics } from './hooks'

const Statistics = () => {
  const { state } = useStatistics()
  const price = useSelector((state: RootState) => state.market.price)

  const calculateValue = (cudos: string) => {
    return `${Number(price) * Number(cudos)}`
  }

  const votingPowerPercent = numeral(
    (state.votingPower.self / Number(state.votingPower.overall.value)) * 100
  )

  const switchStatType = (statType: string) => {
    switch (statType.toUpperCase()) {
      case 'AVAILABLE':
        return TooltipValidatorMessages.AVAILABLE
      case 'DELEGATE':
        return TooltipValidatorMessages.DELEGATE
      case 'UNBONDING':
        return TooltipValidatorMessages.UNBONDING
      case 'REWARD':
        return TooltipValidatorMessages.REWARD
      case 'COMMISSION':
        return TooltipValidatorMessages.COMMISSION
      default:
        return ''
    }
  }

  const stats = Object.entries(state.balance)
    .filter(([key, value]) => key !== 'total')
    .map(([key, value]) => {
      return {
        type: key,
        cudos: formatNumber(value.value, 2),
        value: `$${formatNumber(calculateValue(value.value), 2)}`,
        info: switchStatType(key)
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
        sx={{ padding: '2rem' }}
      >
        {stats.map((stat) => (
          <Tooltip
            key={stat.type}
            title={stat.info}
            placement="right"
            componentsProps={{
              tooltip: {
                sx: {
                  background: 'white',
                  color: 'black',
                  padding: '13px 20px',
                  fontSize: '14px',
                  fontWeight: 700,
                  borderRadius: '15px'
                }
              }
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              gap={0.5}
              key={stat.type}
            >
              <Typography
                variant="caption"
                fontWeight={700}
                color="text.secondary"
                textTransform="uppercase"
              >
                {stat.type}
              </Typography>
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
          </Tooltip>
        ))}
        <Tooltip
          title={TooltipValidatorMessages.VOTING_POWER}
          placement="right"
          componentsProps={{
            tooltip: {
              sx: {
                background: 'white',
                color: 'black',
                padding: '13px 20px',
                fontSize: '14px',
                fontWeight: 700,
                borderRadius: '15px'
              }
            }
          }}
        >
          <Box display="flex" flexDirection="column" gap={0.5}>
            <Typography
              variant="caption"
              fontWeight={700}
              color="text.secondary"
              textTransform="uppercase"
            >
              Voting Power
            </Typography>
            <Typography fontWeight={700}>
              {votingPowerPercent.format('0,0.00')}%
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    </Card>
  )
}

export default Statistics
