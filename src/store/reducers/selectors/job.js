import { createSelector } from 'reselect'

export const getState = state => state.job

export const getJob = createSelector(getState, job => job)
