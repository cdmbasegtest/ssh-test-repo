import { createSelector } from 'reselect'
import map from 'lodash/map'

import ReduxEntities from 'services/ReduxEntities'

import { getData } from './data'

export const getState = state => state.companies

export const getItems = createSelector(getData, getState, (data, companies) =>
  ReduxEntities.denormalize(data, 'companies', map(companies.items, 'id'))
)

export const getRawUserCompany = createSelector(getState, companies => {
  const id = Object.keys(companies.items)[0]
  return companies.items[id]
})

export const getUserCompany = createSelector(
  getData,
  getState,
  (data, companies) =>
    ReduxEntities.denormalize(
      data,
      'companies',
      map(companies.items, 'id')
    )[0] || {}
)

export const getUserCompanyId = createSelector(
  getUserCompany,
  company => company.id
)
