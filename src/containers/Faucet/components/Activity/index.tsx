import {
  Box,
  Stack,
  Table,
  TableBody,
  TableRow,
  Typography
} from '@mui/material'
import moment from 'moment'
import Card from 'components/Card'
import { formatNumber, formatToken } from 'utils/format_token'
import getMiddleEllipsis from 'utils/get_middle_ellipsis'
import InfoIcon from 'assets/vectors/info-alt.svg?component'
import { useActivity } from './hooks'
import { styles, StyledTableCell } from './styles'

const Activity = () => {
  const { state } = useActivity()

  const items = state.items.map((item: any, idx: number) => ({
    idx,
    address: (
      <Typography color="primary.main" variant="body2" fontWeight={700}>
        {getMiddleEllipsis(item.address, { beginning: 14, ending: 12 })}
      </Typography>
    ),
    amount: (
      <Typography variant="body2" fontWeight={700}>
        {formatNumber(formatToken(item.amount, 'cudos').value, 2)} CUDOS
      </Typography>
    ),
    timestamp: (
      <Typography variant="body2" color="text.secondary">
        {moment(new Date(item.timestamp)).parseZone().fromNow(true)}
      </Typography>
    )
  }))

  return (
    <Box sx={styles.activityContainer}>
      <Card
        sx={({ custom }) => ({
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          background: custom.backgrounds.light
        })}
      >
        <Stack direction="row" gap={1} alignItems="center">
          <InfoIcon style={{ width: '20px', height: 'auto' }} />
          <Typography variant="h5" fontWeight={900}>
            What is a Faucet?
          </Typography>
        </Stack>
        <Typography color="text.secondary">
          A faucet is a way to distribute small amounts of a token to its users
          for testing and development purposes. This faucet allows you to create
          an account on the specified network as well as fund small amounts of
          crypto to any account on these networks.
        </Typography>
      </Card>
      <Card sx={{ overflow: 'hidden' }}>
        <Typography
          color="text.secondary"
          fontWeight={900}
          textTransform="uppercase"
          letterSpacing={2}
          paddingBottom={1}
        >
          Recent Activity
        </Typography>
        <Box sx={{ height: '100%', overflow: 'auto', paddingBottom: '1rem' }}>
          <Table>
            <TableBody
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden'
              }}
            >
              {items.map((item) => (
                <TableRow
                  key={item.idx}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell>{item.address}</StyledTableCell>
                  <StyledTableCell align="right">{item.amount}</StyledTableCell>
                  <StyledTableCell align="right">
                    {item.timestamp}
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Card>
    </Box>
  )
}

export default Activity
