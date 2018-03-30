import { createSelector } from 'reselect'

import ReduxEntities from 'services/ReduxEntities'

import { getData } from './data'

export const getState = state => state.viewer

export const getId = createSelector(getState, state => state.id)
export const getJWTToken = createSelector(getState, state => state.JWTToken)
export const getRawViewer = createSelector(getState, state => state.viewer)

export const getJWTHeader = createSelector(
  getJWTToken,
  token => (token ? `Bearer ${token}` : null)
)

export const isAuthenticated = createSelector(
  getState,
  state => state.JWTToken !== null
)

export const getFields = createSelector(getData, getId, (data, id) =>
  ReduxEntities.denormalize(data, 'users', id)
)

export const isLoaded = createSelector(getState, state => state.isLoaded)

// NOTE: Will be replaced with real flag when onboarding will be finished
// export const isOnboarded = () => true

export const isOnboarded = createSelector(
  getFields,
  fields => (fields ? fields['onboarding-completed'] : false)
)
