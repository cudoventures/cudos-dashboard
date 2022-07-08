import { Box, Stack, Typography } from '@mui/material'
import AvatarName from 'components/AvatarName'
import NoData from 'components/NoData'
import Table from 'components/Table'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import { formatDateTime } from 'utils/projectUtils'
import { formatNumber } from 'utils/format_token'
import CudosLogo from 'assets/vectors/cudos-logo.svg?component'
import { useDeposits } from './hooks'
import { styles } from './styles'
import { depositsColumns } from './utils'

const Deposits: React.FC = () => {
  const { state } = useDeposits()

  const items = state.data.map((x, idx) => ({
    idx,
    depositor: (
      <Box sx={{ color: 'text.primary' }}>
        <AvatarName
          name={x.avatar.moniker || x.user}
          address={x.user}
          imageUrl={x.avatar.imageUrl}
        />
      </Box>
    ),
    amount: (
      <Stack direction="row" gap={1} alignItems="center">
        <CudosLogo />
        <Typography
          color="text.primary"
          fontWeight={700}
          textTransform="uppercase"
        >
          {formatNumber(x.amount.value, 2)}
        </Typography>
        <Typography
          fontWeight={700}
          color="text.secondary"
          textTransform="uppercase"
        >
          CUDOS
        </Typography>
      </Stack>
    ),
    date: (
      <Stack direction="row" alignItems="center" gap={1}>
        <AccessTimeRoundedIcon color="primary" />
        <Typography variant="body2" color="text.secondary">
          {formatDateTime(x.timestamp)}
        </Typography>
      </Stack>
    )
  }))

  return (
    <Box sx={styles.deposits}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          letterSpacing={1}
          fontWeight={700}
          color="text.secondary"
          textTransform="uppercase"
          fontSize="14px"
        >
          Deposits
        </Typography>
      </Box>
      {items.length ? (
        <Table items={items} columns={depositsColumns} />
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <NoData />
        </Box>
      )}
    </Box>
  )
}

export default Deposits
