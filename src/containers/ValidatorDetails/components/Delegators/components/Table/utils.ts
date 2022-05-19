import { Column } from 'components/Table/types'

const columns: Column[] = [
  {
    key: 'idx',
    label: '#',
    width: 70,
    colSpan: 2
  },
  {
    key: 'delegator',
    label: 'Delegator'
  },
  {
    key: 'votingPower',
    label: 'Delegated',
    sort: true
  }
]

export default columns
