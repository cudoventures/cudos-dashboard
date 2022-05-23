import { Tabs, Tab } from '@mui/material'

const labels = [
  'All Activities',
  'Transfer',
  'Staking',
  'Withdraws',
  'Governance',
  'Slashing'
]

const ActivityTabs: React.FC = () => {
  return (
    <Tabs value={0} onChange={() => {}} textColor="inherit">
      {labels.map((label, i) => (
        <Tab key={label} label={label} />
      ))}
    </Tabs>
  )
}

export default ActivityTabs
