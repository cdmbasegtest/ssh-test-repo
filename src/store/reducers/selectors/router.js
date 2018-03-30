import { createSelector } from 'reselect'

import get from 'lodash/get'

export const getState = state => state.router

export const getLocation = createSelector(getState, router =>
  get(router, 'location')
)

export const getPrevLocation = createSelector(getState, router =>
  get(router, 'prevLocation')
)

export const getHash = location => get(location, 'hash')

export const getCurrentHash = createSelector(getLocation, getHash)
