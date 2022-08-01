import { Tabs, Tab } from '@mui/material'
import useTabs from './hooks'

const labels = ['Active', 'Inactive', 'My Delegations', 'All']

const TabsHeader: React.FC = () => {
  const { tab, handleTabChange } = useTabs()

  return (
    <Tabs value={tab} onChange={handleTabChange} textColor="inherit">
      {labels.map((label, i) => (
        <Tab key={label} label={label} />
      ))}
    </Tabs>
  )
}

export default TabsHeader
