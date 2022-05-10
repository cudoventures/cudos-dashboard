/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil'
import { AtomState } from './types'

const initialState: AtomState = {
  price: null,
  supply: {
    value: '0',
    displayDenom: '',
    baseDenom: '',
    exponent: 0
  },
  marketCap: null,
  inflation: 0,
  communityPool: {
    value: '0',
    displayDenom: '',
    baseDenom: '',
    exponent: 0
  },
  apr: 0,
  bondedTokens: null
}

export const atomState = atom<AtomState>({
  key: 'market',
  default: initialState
})
