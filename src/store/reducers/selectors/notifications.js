import { createSelector } from 'reselect'

export const getState = state => state.notification
export const getNotification = createSelector(
  getState,
  notification => notification
)
