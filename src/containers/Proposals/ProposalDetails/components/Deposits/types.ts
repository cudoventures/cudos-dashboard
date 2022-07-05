export type DepositType = {
  amount: TokenUnit
  user: string
  timestamp: string
  isValidator: boolean
  avatar: any
}

export type DepositState = {
  data: DepositType[]
}

export type ItemType = Override<DepositType, { user: AvatarName }>
