import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export interface SettingsState {
  theme: Theme
}

const initialState: SettingsState = {
  theme: Theme.DARK
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<SettingsState>) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateSettings } = settingsSlice.actions

export default settingsSlice.reducer
