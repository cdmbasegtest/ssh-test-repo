import { createAsyncAction } from 'helpers/redux'

export const ADD_NOTIFICATION = createAsyncAction('ADD_NOTIFICATION.SUCCESS')
export const addNotification = noticationData => ({
  type: ADD_NOTIFICATION.SUCCESS,
  payload: noticationData
})

export const SET_NOTIFICATION = createAsyncAction('SET_NOTIFICATION.SUCCESS')
export const setNotification = data => ({
  type: SET_NOTIFICATION.SUCCESS,
  payload: data
})
