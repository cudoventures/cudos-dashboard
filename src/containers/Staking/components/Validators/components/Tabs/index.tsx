import { Tabs, Tab } from '@mui/material'

type TabsProps = {
  tab: number
  handleTabChange: (event: any, newvalue: number) => void
}

const labels = ['Active', 'Inactive', 'Favourites']

const TabsHeader: React.FC<TabsProps> = ({ tab, handleTabChange }) => {
  return (
    <Tabs value={tab} onChange={handleTabChange} textColor="inherit">
      {labels.map((label, i) => (
        <Tab key={label} label={label} />
      ))}
    </Tabs>
  )
}

export default TabsHeader
