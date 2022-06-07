import { Column } from 'components/Table/types'

export const delegationsColumns: Column[] = [
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
    key: 'amount',
    label: 'Delegated',
    align: 'right'
  }
]

export const redelegationsColumns: Column[] = [
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
    key: 'to',
    label: 'To'
  },
  {
    key: 'amount',
    label: 'Amount'
  },
  {
    key: 'completionTime',
    label: 'Completion Time'
  }
]

export const unbondingsColumns: Column[] = [
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
    key: 'amount',
    label: 'Amount'
  },
  {
    key: 'completionTime',
    label: 'Completion Time'
  }
]
