import { createAsyncAction } from 'helpers/redux'

import { apiCall } from './api'
import { getRawUserCompany } from '../store/reducers/selectors/companies'

export const CREATE_COMPANY = createAsyncAction('company/CREATE')
export const createCompany = attributes =>
  apiCall({
    alt: true,

    endpoint: '/companies',
    method: 'POST',
    query: {
      data: {
        attributes: {
          ...attributes,
          'onboarding-steps': [],
          'onboarding-completed': false,
          'opening-hours': null
        },
        type: 'companies'
      }
    },
    types: CREATE_COMPANY
  })

export const UPDATE_COMPANY = createAsyncAction('company/UPDATE')
export const updateCompany = attributes => (dispatch, getState) => {
  const { attributes: currentAttributes, id } = getRawUserCompany(getState())
  dispatch(
    apiCall({
      alt: true,

      endpoint: `/companies/${id}`,
      method: 'PATCH',
      query: {
        data: {
          attributes: {
            ...currentAttributes,
            ...attributes,
            'onboarding-steps': ['fields', 'hours']
          },
          type: 'companies'
        }
      },
      types: UPDATE_COMPANY
    })
  )
}
