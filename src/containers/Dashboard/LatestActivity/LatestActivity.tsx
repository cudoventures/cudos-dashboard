import { Box, CircularProgress, Typography } from '@mui/material'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import ClockIcon from 'assets/vectors/clock-icon.svg'
import { formatAddress } from 'utils/projectUtils'
import Card from 'components/Card'
import Table from 'components/Table'
import { columnNames } from 'store/userTransactions'

import { styles } from '../styles'
import { useUserTransactions } from './UserActivity/hooks'

const LatestActivity = () => {
  useUserTransactions()
  const { address } = useSelector((state: RootState) => state.profile)
  const { data, hasActivity, loading } = useSelector(
    (state: RootState) => state.userTransactions
  )

  const handleHashRedirect = (hash: string) => {
    window.open(`${import.meta.env.VITE_APP_EXPLORER_V2}/transactions/${hash}`)
  }

  const handleMsgAction = (msg: string, addr: string) => {
    switch (msg) {
      case '/cosmos.staking.v1beta1.MsgDelegate':
        return (
          <Typography
            style={{ background: '#3d5afe' }}
            sx={styles.latestActivityAction}
          >
            DELEGATE
          </Typography>
        )
      case '/cosmos.bank.v1beta1.MsgSend':
        return addr === address ? (
          <Typography
            style={{ background: '#52A6F8' }}
            sx={styles.latestActivityAction}
          >
            SEND
          </Typography>
        ) : (
          <Typography
            style={{ background: '#65B48F' }}
            sx={styles.latestActivityAction}
          >
            RECEIVE
          </Typography>
        )
      case '/cosmos.gov.v1beta1.MsgSubmitProposal':
        return (
          <Typography
            style={{ background: '#ff5722' }}
            sx={styles.latestActivityAction}
          >
            SUBMIT PROPOSAL
          </Typography>
        )
      case '/cosmos.bank.v1beta1.MsgMultiSend':
        return (
          <Typography
            style={{ background: '#52A6F8' }}
            sx={styles.latestActivityAction}
          >
            MULTI SEND
          </Typography>
        )
      case '/cosmos.gov.v1beta1.MsgVote':
        return (
          <Typography
            style={{ background: '#E89518' }}
            sx={styles.latestActivityAction}
          >
            VOTE
          </Typography>
        )
      case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
        return (
          <Typography
            style={{ background: '#9646F9' }}
            sx={styles.latestActivityAction}
          >
            WITHDRAW REWARD
          </Typography>
        )
      case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
        return (
          <Typography
            style={{ background: '#E89518' }}
            sx={styles.latestActivityAction}
          >
            REDELEGATE
          </Typography>
        )
      case '/cosmos.staking.v1beta1.MsgUndelegate':
        return (
          <Typography
            style={{ background: '#ff1744' }}
            sx={styles.latestActivityAction}
          >
            UNDELEGATE
          </Typography>
        )
      case '/cosmos.gov.v1beta1.MsgDeposit':
        return (
          <Typography
            style={{ background: '#65B48F' }}
            sx={styles.latestActivityAction}
          >
            DEPOSIT
          </Typography>
        )
      default:
        return (
          <Typography
            style={{ background: '#52A6F8' }}
            sx={styles.latestActivityAction}
          >
            {msg}
          </Typography>
        )
    }
  }

  const formattedItems = data.map((tr: any, index: number) => ({
    index: index + 1,
    txHash: (
      <Box onClick={() => handleHashRedirect(tr.hash)}>
        <Typography
          sx={{ fontSize: '14px', cursor: 'pointer' }}
          color="primary.main"
        >
          {formatAddress(tr.hash, 12)}
        </Typography>
      </Box>
    ),
    action: (
      <Box sx={{ display: 'flex' }}>
        {handleMsgAction(tr.messages[0]['@type'], tr.messages[0].from_address)}
      </Box>
    ),
    date: (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img style={{ marginRight: '10px' }} src={ClockIcon} alt="Clock Icon" />
        <Typography sx={{ fontSize: '12px' }}>
          {moment(tr.timestamp).format('lll')}
        </Typography>
      </Box>
    )
  }))

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
