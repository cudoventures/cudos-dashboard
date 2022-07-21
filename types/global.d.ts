/// <reference types="vite/client" />
import '@mui/material/styles'
import { SxProps, Theme } from '@mui/material'

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      backgrounds: {
        light: string
        primary: string
        dark: string
      }
      conditions: {
        grey: string
        green: string
        yellow: string
        red: string
      }
      statuses: {
        active: string
        jailed: string
        tombstoned: string
        unbonding: string
        unbonded: string
      }
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    custom?: {
      backgrounds?: {
        light?: string
        primary?: string
        dark?: string
      }
      conditions?: {
        grey?: string
        green?: string
        yellow?: string
        red?: string
      }
      statuses?: {
        active?: string
        jailed?: string
        tombstoned?: string
        unbonding?: string
        unbonded?: string
      }
    }
  }
}

declare global {
  type Override<T1, T2> = Omit<T1, keyof T2> & T2

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

  interface ImportMetaEnv {
    VITE_APP_CHAIN_ID: string
    VITE_APP_RPC: string
    VITE_GRAPHQL_URL: string
    VITE_GRAPHQL_WS: string
    VITE_APP_GAS_PRICE: decimal
    VITE_APP_CHAIN_NAME: string
    VITE_APP_API: string
    VITE_APP_EXPLORER_V2: string
    VITE_APP_FEE_MULTIPLIER: number
    VITE_BRIDGE_URL: string
    VITE_FAUCET_ADDRESS: string
    VITE_CHAIN_STATUS: string
  }

  interface SxMap {
    [className: string]: SxProps<Theme>
  }
}
