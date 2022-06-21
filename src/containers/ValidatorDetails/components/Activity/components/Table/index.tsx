import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  Tooltip
} from '@mui/material'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import moment from 'moment'
import Table from 'components/Table'
import getMiddleEllipsis from 'utils/get_middle_ellipsis'
import { defaultMessages } from 'ledgers/utils'
import numeral from 'numeral'
import { columns } from './utils'

type ActivityTableProps = {
  loadNextPage: () => Promise<void>
  filterByType: (type: string) => Promise<void>
  data: Transactions[]
  hasNextPage: boolean
  isNextPageLoading: boolean
}

const ActivityTable: React.FC<ActivityTableProps> = ({
  loadNextPage = async () => null,
  filterByType = async () => null,
  data = [],
  hasNextPage = false,
  isNextPageLoading = false
}) => {
  const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget

    if (scrollTop + clientHeight === scrollHeight && hasNextPage) {
      await loadNextPage()
    }
  }

  const formattedItems = data.map((tx, idx) => {
    const txType: string = tx.messages.items[0]['@type']
    const filter: string = tx.messages.items[0]['@type'].split('/').pop()
    const txBadge = defaultMessages[txType as keyof typeof defaultMessages]

    return {
      idx,
      block: (
        <Tooltip title="View in explorer" placement="right">
          <Typography
            variant="body2"
            component="span"
            color="primary.main"
            fontWeight={700}
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              window
                .open(
                  `${import.meta.env.VITE_APP_EXPLORER_V2}/blocks/${tx.height}`,
                  '_blank'
                )
                ?.focus()
            }
          >
            {numeral(tx.height).format('0,0')}
          </Typography>
        </Tooltip>
      ),
      txHash: (
        <Tooltip title="View in explorer" placement="right">
          <Typography
            variant="body2"
            component="span"
            color="primary.main"
            fontWeight={700}
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              window
                .open(
                  `${import.meta.env.VITE_APP_EXPLORER_V2}/transactions/${
                    tx.hash
                  }`,
                  '_blank'
                )
                ?.focus()
            }
          >
            {getMiddleEllipsis(tx.hash, {
              beginning: 10,
              ending: 12
            })}
          </Typography>
        </Tooltip>
      ),
      action: (
        <Typography
          component="span"
          sx={{
            background: txBadge.color,
            textTransform: 'uppercase',
            borderRadius: '10px',
            color: 'white',
            padding: '6px 17px',
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '2px',
            overflowWrap: 'anywhere',
            cursor: 'pointer'
          }}
          onClick={async () => {
            await filterByType(filter)
          }}
        >
          {txBadge.displayName}
        </Typography>
      ),
      date: (
        <Stack direction="row" gap={1} alignItems="center">
          <AccessTimeRoundedIcon color="primary" />
          <Typography fontSize={12} color="text.secondary">
            {moment(moment(tx.timestamp).parseZone().toLocaleString())
              .format('DD MMM YYYY LTS')
              .toLocaleString()}
          </Typography>
        </Stack>
      )
    }
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '347px',
        maxHeight: '250px',
        overflow: 'hidden',
        position: 'relative',
        alignItems: 'center'
      }}
    >
      <Table
        items={formattedItems}
        columns={columns}
        handleScroll={handleScroll}
      />
      {isNextPageLoading && <CircularProgress />}
    </Box>
  )
}

export default ActivityTable
