export type OverviewType = {
  validator: string
  operatorAddress: string
  selfDelegateAddress: string
  description: string
  website: string
  avatarUrl: string
  moniker: string
}

export type StatusType = {
  status: number
  jailed: boolean
  tombstoned: boolean
  condition: number
  commission: number
  signedBlockWindow: number
  missedBlockCounter: number
  maxRate: string
  lastSeen: string
}

export type VotingPowerType = {
  height: number
  overall: TokenUnit
  self: number
}

export type ValidatorDetailsState = {
  loading: boolean
  exists: boolean
  desmosProfile: DesmosProfile | null
  status: StatusType
  votingPower: VotingPowerType
}
