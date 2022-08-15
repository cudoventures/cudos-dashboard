import { Column } from 'components/Table/types'

const columns: Column[] = [
  {
    key: 'idx',
    label: '#',
    width: 70,
    colSpan: 2
  },
  {
    key: 'validator',
    label: 'Validator',
    color: 'text.primary',
    colSpan: 2,
    width: 300
  },
  {
    key: 'votingPower',
    label: 'Voting Power',
    sortKey: 'votingPower',
    sort: true
  },
  {
    key: 'myDelegation',
    label: 'My Delegation',
    sortKey: 'myDelegation',
    sort: true
  },
  {
    key: 'commission',
    label: 'Commission',
    sortKey: 'commission',
    align: 'center',
    sort: true,
    color: 'primary.main',
    width: 70
  },
  {
    key: 'self',
    label: 'Self %',
    sortKey: 'selfPercent',
    align: 'right',
    sort: true,
    width: 120
  },
  {
    key: 'delegators',
    label: 'Delegators',
    sortKey: 'delegators',
    align: 'center',
    sort: true
  },
  {
    key: 'condition',
    label: 'Condition',
    sortKey: 'condition',
    align: 'center',
    sort: true,
    width: 120
  },
  {
    key: 'action',
    label: 'Action',
    align: 'center'
  }
]

export default columns
