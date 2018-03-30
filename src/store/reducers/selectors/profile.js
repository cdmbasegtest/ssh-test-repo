import { createSelector } from 'reselect'

export const getState = state => state.profile

export const profiles = createSelector(getState, profile => profile.profiles)

export const profile = createSelector(getState, profile => profile.profile)

export const error = createSelector(getState, profile => profile.error)

export const isLoading = createSelector(getState, profile => profile.isLoading)

export const isLoaded = createSelector(getState, profile => profile.isLoaded)
