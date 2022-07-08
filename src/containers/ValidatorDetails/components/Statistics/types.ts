export type BalanceType = {
  available: TokenUnit
  delegate: TokenUnit
  unbonding: TokenUnit
  reward: TokenUnit
  commission?: TokenUnit
  total: TokenUnit
}

export type AccountDetailState = {
  loading: boolean
  exists: boolean
  balance: BalanceType
  votingPower: {
    self: number
    overall: {
      baseDenom: string
      displayDenom: string
      exponent: number
      value: string
    }
    height: number
  }
}
