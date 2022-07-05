import { Box, Tab, Tabs, Typography } from '@mui/material'
import AvatarName from 'components/AvatarName'
import NoData from 'components/NoData'
import Table from 'components/Table'
import { usePagination } from 'hooks'
import { useVotingStatistics } from './hooks'
import { styles } from './styles'
import { filterDataByTab, getVoteKey, votesColumns } from './utils'

const VotingStatistics: React.FC = () => {
  // const { resetPagination } = usePagination({})
  const { state, handleTabChange } = useVotingStatistics(() => {})
  const tabs = [
    { label: `All ${state.data.length}` },
    { label: `Yes ${state.voteCount.yes}` },
    { label: `No ${state.voteCount.no}` },
    { label: `Veto ${state.voteCount.veto}` },
    { label: `Abstain ${state.voteCount.abstain}` }
  ]

  const filteredItems = filterDataByTab({
    tab: state.tab,
    data: state.data,
    notVoted: state.validatorsNotVoted
  })

  const items = filteredItems.map((x, idx) => ({
    idx,
    voter: (
      <Box sx={{ color: 'text.primary' }}>
        <AvatarName
          name={x.avatar.moniker || x.user}
          address={x.user}
          imageUrl={x.avatar.imageUrl}
        />
      </Box>
    ),
    vote: (
      <Typography color="text.primary" textTransform="capitalize">
        {getVoteKey(x.vote)}
      </Typography>
    )
  }))

  return (
    <Box sx={styles.votingStatistics}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          letterSpacing={1}
          fontWeight={700}
          color="text.secondary"
          textTransform="uppercase"
          fontSize="14px"
        >
          Voting Statistics
        </Typography>
        <Tabs value={state.tab} onChange={handleTabChange} textColor="inherit">
          {tabs.map((tab, i) => (
            <Tab key={tab.label} label={tab.label} />
          ))}
        </Tabs>
      </Box>
      {items.length ? (
        <Table items={items} columns={votesColumns} />
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

export default VotingStatistics
