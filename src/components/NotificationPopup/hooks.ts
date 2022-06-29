import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import {
  initialNotificationsState,
  updateNotifications
} from 'store/notifications'

export const useNotifications = () => {
  const notifications = useSelector((state: RootState) => state.notifications)
  const dispatch = useDispatch()

  const clearState = () => {
    dispatch(updateNotifications(initialNotificationsState))
  }

  const setError = (message: string) => {
    dispatch(updateNotifications({ error: message }))
  }

  const setWarning = (message: string) => {
    dispatch(updateNotifications({ warning: message }))
  }

  const setInfo = (message: string) => {
    dispatch(updateNotifications({ info: message }))
  }

  return {
    state: notifications,
    clearState,
    setError,
    setWarning,
    setInfo
  }
}
