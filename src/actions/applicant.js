import { createAsyncAction } from 'helpers/redux'

import { apiCall } from './api'

export const SELECT = 'applicant/SELECT'
export const selectApplicant = applicant => ({
  type: SELECT,
  payload: applicant
})

export const GET_APPLICANTS = createAsyncAction('applicant/GET_APPLICANTS')
export const getApplicants = companyId =>
  apiCall({
    endpoint: `/companies/${companyId}/relationships/applicants?include=profile`,
    types: GET_APPLICANTS
  })

export const SET_PENDING = createAsyncAction('applicant/SET_PENDING')
export const setApplicantPending = (data, id) =>
  apiCall({
    endpoint: `/applicants/${id}`,
    method: 'PATCH',
    query: data,
    types: SET_PENDING
  })

export const SET_INTERVIEW = createAsyncAction('applicant/SET_INTERVIEW')
export const setApplicantInterview = (data, id) =>
  apiCall({
    endpoint: `/applicants/${id}`,
    method: 'PATCH',
    query: data,
    types: SET_INTERVIEW
  })

export const DESTROY = createAsyncAction('applicant/DESTROY')
export const destroyApplicant = id => {
  return apiCall({
    endpoint: `/applicants/${id}`,
    method: 'DELETE',
    types: DESTROY
  })
}

export const SORT = createAsyncAction('applicant/SORT')
export const sortApplicants = data => {
  return apiCall({
    endpoint: `/applicants`,
    method: 'PATCH',
    types: SORT,
    query: data
  })
}
