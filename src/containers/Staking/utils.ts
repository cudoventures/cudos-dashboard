const columns = [
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
    colSpan: 2
  },
  {
    key: 'votingPower',
    label: 'Voting Power',
    sortKey: 'votingPower',
    colSpan: 2,
    sort: true
  },
  {
    key: 'commission',
    label: 'Commission',
    sortKey: 'commission',
    align: 'center',
    sort: true,
    color: 'primary.main'
  },
  {
    key: 'self',
    label: 'Self %',
    sortKey: 'selfPercent',
    align: 'right',
    sort: true
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
    align: 'center'
  },
  {
    key: 'action',
    label: 'Action',
    align: 'center'
  }
]

export default columns
