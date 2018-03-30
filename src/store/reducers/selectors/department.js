import { createSelector } from 'reselect'

export const getState = state => state.department

export const getDepartment = createSelector(getState, department => department)
