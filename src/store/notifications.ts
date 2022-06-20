import { createSlice } from '@reduxjs/toolkit'

export interface NotificationsState {
  error: string
  warning: string
  info: string
}

const initialState: NotificationsState = {
  error: '',
  warning: '',
  info: ''
}

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    updateNotifications: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateNotifications } = notificationsSlice.actions

export default notificationsSlice.reducer
