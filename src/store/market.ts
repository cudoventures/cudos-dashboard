import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface MarketState {
  price: number | null
  supply: TokenUnit
  marketCap: number | null
  inflation: number
  communityPool: TokenUnit
  apr: number
  bondedTokens: number | null
}

const initialState: MarketState = {
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
  bondedTokens: 0
}

export const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    updateMarket: (state, action: PayloadAction<MarketState>) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateMarket } = marketSlice.actions

export default marketSlice.reducer
