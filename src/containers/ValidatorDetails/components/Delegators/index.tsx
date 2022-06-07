import { Box, Tabs, Tab, Typography } from '@mui/material'
import Delegations from './components/Delegations'
import Redelegations from './components/Redelegations'
import Unbondings from './components/Unbondings'
import { useDelegators } from './hooks'

import { styles } from './styles'

const Delegators = () => {
  const {
    state,
    handleTabChange,
    handleDelegationPageCallback,
    handleRedelegationPageCallback,
    handleUnbondingPageCallback
  } = useDelegators()

  const tabs = [
    { label: `Delegations ${state.delegations.count}` },
    { label: `Redelegations ${state.redelegations.count}` },
    { label: `Undelegated ${state.unbondings.count}` }
  ]

  let tableComponent
  switch (state.tab) {
    case 0:
      tableComponent = (
        <Delegations
          delegations={state.delegations}
          handlePageCallback={handleDelegationPageCallback}
        />
      )
      break
    case 1:
      tableComponent = (
        <Redelegations
          redelegations={state.redelegations}
          handlePageCallback={handleRedelegationPageCallback}
        />
      )
      break
    case 2:
      tableComponent = (
        <Unbondings
          unbondings={state.unbondings}
          handlePageCallback={handleUnbondingPageCallback}
        />
      )
      break
    default:
      break
  }

  return (
    <Box sx={styles.delegatorsContainer}>
      <Box display="flex" justifyContent="space-between">
        <Typography
          letterSpacing={1}
          fontWeight={700}
          color="text.secondary"
          textTransform="uppercase"
          fontSize="14px"
        >
          Delegators
        </Typography>
        <Tabs value={state.tab} onChange={handleTabChange} textColor="inherit">
          {tabs.map((tab, i) => (
            <Tab key={tab.label} label={tab.label} />
          ))}
        </Tabs>
      </Box>
      {tableComponent}
    </Box>
  )
}

export default Delegators
