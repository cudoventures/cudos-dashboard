import { Column } from 'components/Table/types'

const columns: Column[] = [
  {
    key: 'idx',
    label: '#',
    width: 70,
    colSpan: 2
  },
  {
    key: 'txHash',
    label: 'Transaction Hash'
  },
  {
    key: 'activity',
    label: 'Activity',
    sort: true
  },
  {
    key: 'action',
    label: 'Action'
  },
  {
    key: 'date',
    label: 'Date'
  }
]

export default columns
