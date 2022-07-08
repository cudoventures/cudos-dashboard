import { Column } from 'components/Table/types'

export const depositsColumns: Column[] = [
  {
    key: 'depositor',
    label: 'Depositor',
    colSpan: 2
  },
  {
    key: 'amount',
    label: 'Amount'
  },
  {
    key: 'date',
    label: 'Date'
  }
]
