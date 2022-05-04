export type TransactionType = {
  height: number
  hash: string
  success: boolean
  timestamp: string
  messages: number
}

export type TransactionsState = {
  map(
    arg0: (tr: {
      hash:
        | boolean
        | import('react').ReactChild
        | import('react').ReactFragment
        | import('react').ReactPortal
        | null
        | undefined
    }) => { index: number; txHash: JSX.Element }[]
  ): any[]
  items: TransactionType[]
}
