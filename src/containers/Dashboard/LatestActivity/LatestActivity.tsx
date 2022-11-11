import {
  Box,
  CircularProgress,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import moment from 'moment'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import getMiddleEllipsis from 'utils/get_middle_ellipsis'
import Card from 'components/Card'
import Table from 'components/Table'
import { columnNames } from 'store/userTransactions'

import { defaultMessages, unknownMessage } from 'ledgers/utils'
import numeral from 'numeral'
import { addEndingEllipsis } from 'utils/projectUtils'
import { styles } from '../styles'
import { useUserTransactions } from './UserActivity/hooks'
import { RootState } from 'store'
import { useSelector } from 'react-redux'
import { CHAIN_DETAILS } from 'utils/constants'

const LatestActivity = () => {
  const { state } = useUserTransactions()
  const { chosenNetwork } = useSelector((state: RootState) => state.profile)
  const { data, loading, hasActivity } = state

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md' || 'xs'))

  const formattedItems = data.map((tx: any, idx) => {
    const txType: string = tx.messages[0]['@type']
    const txBadge =
      defaultMessages[txType as keyof typeof defaultMessages] || unknownMessage

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
                  `${CHAIN_DETAILS.EXPLORER_URL[chosenNetwork as keyof typeof CHAIN_DETAILS.EXPLORER_URL]}/blocks/${tx.height}`,
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
                  `${CHAIN_DETAILS.EXPLORER_URL[chosenNetwork as keyof typeof CHAIN_DETAILS.EXPLORER_URL]}/transactions/${
                    tx.hash
                  }`,
                  '_blank'
                )
                ?.focus()
            }
          >
            {getMiddleEllipsis(tx.hash, {
              beginning: isSmallScreen ? 5 : 10,
              ending: isSmallScreen ? 3 : 12
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
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '1px'
          }}
        >
          {addEndingEllipsis(txBadge.displayName, {
            begining: isSmallScreen ? 6 : 0
          })}
        </Typography>
      ),
      date: (
        <Stack direction="row" gap={1} alignItems="center">
          <AccessTimeRoundedIcon color="primary" />
          <Typography fontSize={12} color="text.secondary">
            {moment(new Date(moment(tx.timestamp).parseZone().toLocaleString()))
              .format('DD MMM YYYY LTS')
              .toLocaleString()}
          </Typography>
        </Stack>
      )
    }
  })

  const hasLatestActivity = loading ? (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <CircularProgress size={60} />
    </Box>
  ) : (
    <Table items={formattedItems} columns={columnNames} />
  )

  const noActivity =
    loading && !hasActivity ? (
      <Box sx={styles.circularProgress}>
        <CircularProgress size={60} />
      </Box>
    ) : (
      <Typography sx={styles.noActivityStyle}>
        User has no activity to display
      </Typography>
    )

  return (
    <Card sx={styles.latestActivityCard}>
      <Typography
        sx={{ ...styles.subheaderStyle, marginBottom: '20px' }}
        color="text.secondary"
      >
        LATEST ACTIVITY
      </Typography>
      {hasActivity ? hasLatestActivity : noActivity}
    </Card>
  )
}

export default LatestActivity
