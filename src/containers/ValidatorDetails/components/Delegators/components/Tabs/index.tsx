import { Tabs, Tab } from '@mui/material'

const labels = ['Delegations', 'Redelegations', 'Undelegated']

const DelegatorsTabs: React.FC = () => {
  return (
    <Tabs value={0} onChange={() => {}} textColor="inherit">
      {labels.map((label, i) => (
        <Tab key={label} label={label} />
      ))}
    </Tabs>
  )
}

export default DelegatorsTabs
