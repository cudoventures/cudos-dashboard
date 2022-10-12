export type BalanceType = {
  holdings: TokenUnit
  selfDelegated: TokenUnit
  unbonding: TokenUnit
  rewards: TokenUnit
  commissions?: TokenUnit
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
