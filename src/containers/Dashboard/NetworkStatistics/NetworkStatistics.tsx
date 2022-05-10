import React from 'react'
import { Box, Typography } from '@mui/material'
import numeral from 'numeral'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { useOnlineVotingPower } from '../VotingPower/hooks'
import { useDataBlocks } from './Blocks/hooks'
import { useMarketRecoil } from './Market/hooks'
import Card from '../../../components/Card/Card'

import { styles } from '../styles'

const NetworkStatistics = () => {
  const { price } = useSelector((state: RootState) => state.market)
  const { state: votingState } = useOnlineVotingPower()
  const { state: blockState } = useDataBlocks()
  useMarketRecoil()

  const votingPowerPercent =
    votingState.totalVotingPower === 0
      ? numeral(0)
      : numeral((votingState.votingPower / votingState.totalVotingPower) * 100)

  return (
    <Card style={styles.networkStatisticsCard}>
      <Box>
        <Box sx={{ marginBottom: '30px' }}>
          <Typography style={styles.subheaderStyle} color="text.secondary">
            NETWORK STATISTICS
          </Typography>
        </Box>
        <Box style={styles.networkCardStyle}>
          <Typography
            color="text.secondary"
            style={styles.networkCardTitleStyle}
          >
            PRICE
          </Typography>
          <Typography style={styles.networkCardContentStyle}>
            {`$${price}`}
          </Typography>
          <Typography
            color="primary.main"
            style={styles.networkCardFooterStyle}
          >
            USD
          </Typography>
        </Box>
        <Box style={styles.networkCardStyle}>
          <Typography
            color="text.secondary"
            style={styles.networkCardTitleStyle}
          >
            TOTAL AMOUNT STAKED
          </Typography>
          <Typography style={styles.networkCardContentStyle}>
            {numeral(votingState.totalVotingPower).format('0,0')}
          </Typography>
          <Typography
            color="primary.main"
            style={styles.networkCardFooterStyle}
          >
            CUDOS
          </Typography>
        </Box>
        <Box style={styles.networkCardStyle}>
          <Typography
            color="text.secondary"
            style={styles.networkCardTitleStyle}
          >
            ACTIVE VALIDATORS
          </Typography>
          <Typography style={styles.networkCardContentStyle}>
            {blockState.validators.active}
          </Typography>
          <Typography
            color="primary.main"
            style={styles.networkCardFooterStyle}
          >
            All validators: {blockState.validators.total}
          </Typography>
        </Box>
        <Box style={styles.networkCardStyle}>
          <Typography
            color="text.secondary"
            style={styles.networkCardTitleStyle}
          >
            ONLINE VOTING POWER
          </Typography>
          <Typography
            style={styles.networkCardContentStyle}
          >{`${votingPowerPercent.format('0,0.00', (n) => ~~n)}%`}</Typography>
          <Typography
            color="primary.main"
            style={styles.networkCardFooterStyle}
          >
            {numeral(votingState.votingPower).format('0,0')} /{' '}
            {numeral(votingState.totalVotingPower).format('0,0')}
          </Typography>
        </Box>
        <Box style={{ marginBottom: '0px' }} sx={styles.networkCardStyle}>
          <Typography
            color="text.secondary"
            style={styles.networkCardTitleStyle}
          >
            LATEST BLOCK
          </Typography>
          <Typography style={styles.networkCardContentStyle}>
            {numeral(blockState.blockHeight).format('0,0')}
          </Typography>
          <Typography
            color="primary.main"
            style={styles.networkCardFooterStyle}
          >
            BLOCK
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default NetworkStatistics
