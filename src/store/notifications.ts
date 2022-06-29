import { createSlice } from '@reduxjs/toolkit'

export interface NotificationsState {
  error: string
  warning: string
  info: string
}

export const initialNotificationsState: NotificationsState = {
  error: '',
  warning: '',
  info: ''
}

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: initialNotificationsState,
  reducers: {
    updateNotifications: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateNotifications } = notificationsSlice.actions

export default notificationsSlice.reducer
