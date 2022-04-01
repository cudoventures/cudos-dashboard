/// <reference types="vite/client" />
import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    backgrounds: {
      light: string
      primary: string
      dark: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    backgrounds?: {
      light?: string
      primary?: string
      dark?: string
    }
  }
}

declare global {
  type ComponentDefault = {
    className?: string
  }

  interface AvatarName {
    className?: string
    imageUrl?: string | null
    address: string
    name: string
    href?: (address: string) => string
  }

  type Transactions = {
    height: number
    hash: string
    success: boolean
    timestamp: string
    messages: {
      count: number
      items: any[]
    }
  }

  type TokenUnit = {
    displayDenom: string
    baseDenom: string
    exponent: number
    value: string
  }

  type DesmosProfile = {
    dtag: string
    nickname: string
    imageUrl: string
    coverUrl: string
    bio: string
    connections: ProfileConnectionType[]
    validator?: ValidatorProfile
  }

  type ProfileConnectionType = {
    network: string
    identifier: string
    creationTime: string
  }

  type ValidatorProfile = {
    status: number
    jailed: boolean
    condition: number
    commission: number
    signedBlockWindow: number
    missedBlockCounter: number
    lastSeen: string
  }

  type TagTheme =
    | 'zero'
    | 'one'
    | 'two'
    | 'three'
    | 'four'
    | 'five'
    | 'six'
    | 'seven'
    | 'eight'
    | 'nine'
    | 'ten'
    | 'eleven'
    | 'twelve'
    | 'thirteen'
    | 'fourteen'
    | 'fifteen'
    | 'sixteen'
    | 'seventeen'
    | 'eighteen'
    | 'nineteen'
    | 'twenty'

  type MsgCoin = {
    denom: string
    amount: string
  }
}
