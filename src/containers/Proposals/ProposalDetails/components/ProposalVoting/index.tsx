import React from 'react'
import Card from 'components/Card'
import { Box, Typography } from '@mui/material'
import VotingRectangle from 'assets/vectors/voting-rectangle.svg?component'

import LinearProgressChart from 'components/LinearProgress'
import { CHART_COLORS } from 'theme/colors'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import BigNumber from 'bignumber.js'
import numeral from 'numeral'
import * as R from 'ramda'
import { formatNumber } from 'utils/format_token'
import { styles } from '../../../styles'

const ProposalVoting = () => {
  const proposalState = useSelector((state: RootState) => state.proposalDetails)

  const keys = R.keys(proposalState.votes)
  const color = [
    CHART_COLORS.GREEN,
    CHART_COLORS.RED,
    CHART_COLORS.PURPLE,
    CHART_COLORS.ORANGE
  ]
  const colorGradient = [
    CHART_COLORS.GREEN_GRADIENT,
    CHART_COLORS.RED_GRADIENT,
    CHART_COLORS.PURPLE_GRADIENT,
    CHART_COLORS.ORANGE_GRADIENT
  ]

  const total = new BigNumber(proposalState.votes.yes.value)
    .plus(proposalState.votes.no.value)
    .plus(proposalState.votes.veto.value)
    .plus(proposalState.votes.abstain.value)

  const totalVotedFormat = numeral(total.toFixed(2)).format('0,0.[00]')
  const totalBondedFormat = numeral(proposalState.bonded.value).format(
    '0,0.[00]'
  )

  const formatVotes = keys.map((x, i) => {
    const selectedData = proposalState.votes[x] as TokenUnit
    return {
      name: x,
      value: numeral(
        new BigNumber(selectedData.value).toNumber().toFixed(2)
      ).format('0,0.[00]'),
      display: formatNumber(selectedData.value, selectedData.exponent),
      percentage: total.gt(0)
        ? `${new BigNumber(selectedData.value)
            .div(total.toString())
            .times(100)
            .toPrecision(3)}`
        : '0',
      color: color[i],
      colorGradient: colorGradient[i]
    }
  })

  const totalVotedPercent =
    total.gt(0) && parseFloat(proposalState.bonded.value) > 0
      ? `${numeral(
          new BigNumber(total.toFixed(2))
            .div(proposalState.bonded.value)
            .times(100)
            .toFixed(2)
        ).format('0.[00]')}`
      : '0'

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ position: 'absolute' }}>
          <Typography
            color="text.secondary"
            sx={{ fontWeight: '600', fontSize: '14px', letterSpacing: '2px' }}
          >
            VOTING
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            marginLeft: '50px',
            marginTop: '50px',
            width: '85%'
          }}
        >
          <Box sx={{ flex: '0 1 50%' }}>
            <Typography
              color="primary.main"
              sx={{
                fontSize: '14px'
              }}
            >
              {proposalState.overview.status ===
              'PROPOSAL_STATUS_DEPOSIT_PERIOD'
                ? `Voted / Total (Not started yet)`
                : `Voted / Total (${totalVotedPercent}%)`}
            </Typography>
            <Box>
              <Typography
                color="text.primary"
                sx={{ fontSize: '20px', fontWeight: '700', marginTop: '10px' }}
              >
                {`${totalVotedFormat} / ${totalBondedFormat}`}
              </Typography>
              <Box sx={{ width: '300px', marginTop: '10px' }}>
                <LinearProgressChart
                  value={Number(totalVotedPercent)}
                  color={CHART_COLORS.GREEN_GRADIENT}
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ flex: '0 1 15%' }}>
            {formatVotes.map((vote) => (
              <Box key={vote.name} sx={{ marginBottom: '22px' }}>
                <Typography
                  textTransform="capitalize"
                  sx={styles.votingOptions}
                >
                  <VotingRectangle
                    style={{ marginRight: '15px' }}
                    color={vote.color}
                  />
                  {vote.name}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ flex: '0 1 5%' }}>
            {formatVotes.map((vote) => (
              <Box key={vote.name} sx={{ marginBottom: '22px' }}>
                <Typography sx={styles.votingOptions}>
                  {`${vote.percentage}%`}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ flex: '0 1 35%' }}>
            <Box>
              {formatVotes.map((vote) => (
                <Box key={vote.name} sx={{ marginBottom: '20px' }}>
                  <LinearProgressChart
                    value={Number(vote.percentage)}
                    color={vote.colorGradient}
                  />
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ flex: '0 0 1%', marginLeft: '15px' }}>
            {formatVotes.map((vote) => (
              <Box key={vote.name} sx={{ marginBottom: '22px' }}>
                <Typography sx={styles.votingOptions}>
                  {`${vote.value}`}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default ProposalVoting
