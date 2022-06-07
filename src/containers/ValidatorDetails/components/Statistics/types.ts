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
}
