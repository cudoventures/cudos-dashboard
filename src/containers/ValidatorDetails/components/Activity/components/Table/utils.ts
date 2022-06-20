import { Column } from 'components/Table/types'

export const columns: Column[] = [
  {
    key: 'block',
    label: 'Block Height',
    width: 150
  },
  {
    key: 'txHash',
    label: 'Transaction Hash'
  },
  {
    key: 'action',
    label: 'Action'
  },
  {
    key: 'date',
    label: 'Date',
    width: 250
  }
]
